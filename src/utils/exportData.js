export function exportCSV(data, filename="data.csv"){
  if(!data || !data.length) return;
  const keys = Object.keys(data[0]);
  const header = keys.join(",");
  const rows = data.map(r => keys.map(k => `"${String(r[k] ?? "")}"`).join(","));
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export function exportJSON(data, filename="data.json"){
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
