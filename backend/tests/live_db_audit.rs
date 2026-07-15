#![allow(dead_code)]

#[path = "../src/domain/entry_changes.rs"]
pub(crate) mod entry_changes_impl;
#[path = "../src/domain/model.rs"]
pub(crate) mod model;
#[path = "../src/storage/mod.rs"]
pub(crate) mod store;
#[allow(dead_code, unused_imports)]
#[path = "../src/sync/mod.rs"]
pub(crate) mod sync;

pub(crate) mod domain {
    pub(crate) use crate::entry_changes_impl as entry_changes;
}

use std::{collections::BTreeMap, path::PathBuf};

use calamine::{open_workbook_auto, Reader};
use model::CalibrationRequirement;
use store::InventoryDb;

#[test]
fn inspect_legacy_headers_only() {
    let path = PathBuf::from(
        std::env::var("TE_LEGACY_AUDIT_XLSX").expect("TE_LEGACY_AUDIT_XLSX must be set"),
    );
    let header_rows = [8usize, 2, 7, 0, 5, 6];
    let mut workbook = open_workbook_auto(path).unwrap();
    let sheet_names = workbook.sheet_names().to_vec();
    assert_eq!(sheet_names.len(), header_rows.len());

    for (sheet_name, header_row) in sheet_names.iter().zip(header_rows) {
        let range = workbook.worksheet_range(sheet_name).unwrap();
        let headers = range
            .rows()
            .nth(header_row)
            .unwrap()
            .iter()
            .map(ToString::to_string)
            .filter(|value| !value.trim().is_empty())
            .collect::<Vec<_>>();
        println!(
            "legacy_header: sheet={sheet_name:?} row={} headers={headers:?}",
            header_row + 1
        );
    }
}

#[test]
fn audit_live_database_snapshot_aggregates_only() {
    let path = PathBuf::from(
        std::env::var("TE_INVENTORY_AUDIT_DB").expect("TE_INVENTORY_AUDIT_DB must be set"),
    );
    let file_size = std::fs::metadata(&path).unwrap().len();
    let db = InventoryDb::open_at_with_size(path, file_size).unwrap();
    let entries = db.load_entries().unwrap();

    let mut lifecycle = BTreeMap::<String, usize>::new();
    let mut requirement = [0usize; 4];
    let mut assets = BTreeMap::<String, usize>::new();
    let mut serials = BTreeMap::<String, usize>::new();
    let mut archived = 0usize;
    let mut manual = 0usize;
    let mut imported = 0usize;
    let mut blank_asset = 0usize;
    let mut blank_serial = 0usize;
    let mut blank_both = 0usize;

    for entry in &entries {
        *lifecycle.entry(entry.lifecycle_status.clone()).or_default() += 1;
        requirement[match entry.calibration_requirement {
            CalibrationRequirement::Required => 0,
            CalibrationRequirement::ReferenceOnly => 1,
            CalibrationRequirement::NotRequired => 2,
            CalibrationRequirement::Unknown => 3,
        }] += 1;
        archived += usize::from(entry.archived);
        manual += usize::from(entry.manual_entry);
        imported += usize::from(entry.import_provenance.is_some());
        let asset = entry.asset_number.trim().to_ascii_lowercase();
        let serial = entry.serial_number.trim().to_ascii_lowercase();
        blank_asset += usize::from(asset.is_empty());
        blank_serial += usize::from(serial.is_empty());
        blank_both += usize::from(asset.is_empty() && serial.is_empty());
        if !asset.is_empty() {
            *assets.entry(asset).or_default() += 1;
        }
        if !serial.is_empty() {
            *serials.entry(serial).or_default() += 1;
        }
    }

    let duplicate_asset_keys = assets.values().filter(|count| **count > 1).count();
    let duplicate_asset_rows = assets.values().filter(|count| **count > 1).sum::<usize>();
    let duplicate_serial_keys = serials.values().filter(|count| **count > 1).count();
    let duplicate_serial_rows = serials.values().filter(|count| **count > 1).sum::<usize>();

    println!(
        "live_db: total={} active={} archived={} imported={} manual={} blank_asset={} blank_serial={} blank_both={}",
        entries.len(),
        entries.len() - archived,
        archived,
        imported,
        manual,
        blank_asset,
        blank_serial,
        blank_both
    );
    println!(
        "requirements: required={} reference_only={} not_required={} unknown={}",
        requirement[0], requirement[1], requirement[2], requirement[3]
    );
    println!("lifecycle: {lifecycle:?}");
    println!(
        "duplicate_identity: asset_keys={} asset_rows={} serial_keys={} serial_rows={}",
        duplicate_asset_keys,
        duplicate_asset_rows,
        duplicate_serial_keys,
        duplicate_serial_rows
    );
    assert!(!entries.is_empty());
}
