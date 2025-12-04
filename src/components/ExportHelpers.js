// src/components/ExportHelpers.js
export function downloadJSON(obj, filename = "predictions.json") {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export function downloadCSV(rows, filename = "predictions.csv") {
  if (!rows || !rows.length) return;
  const keys = Object.keys(rows[0]);
  const lines = [keys.join(",")].concat(rows.map(r => keys.map(k => JSON.stringify(r[k] ?? "")).join(",")));
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
