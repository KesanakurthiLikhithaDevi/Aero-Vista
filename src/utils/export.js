// src/utils/export.js
export function exportToCSV(objArray, filename = "data.csv") {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";
  if (array.length === 0) return;
  const keys = Object.keys(array[0]);
  str += keys.join(",") + "\n";
  array.forEach(item => {
    const row = keys.map(k => {
      const v = (item[k] === undefined || item[k] === null) ? "" : String(item[k]).replace(/"/g, '""');
      return `"${v}"`;
    }).join(",");
    str += row + "\n";
  });
  const blob = new Blob([str], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadJSON(obj, filename = "data.json") {
  const str = JSON.stringify(obj, null, 2);
  const blob = new Blob([str], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
