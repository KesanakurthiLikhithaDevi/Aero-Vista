// src/components/TimeSeriesChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Filler, Legend);

export default function TimeSeriesChart({ labels = [], series = [], uncertainty = [] }) {
  const main = series[0] || { data: [], color: "#29a6ff", name: "NO₂" };
  const baseline = series[1];

  const lower = uncertainty[0] || [];
  const upper = uncertainty[1] || [];

  const data = {
    labels,
    datasets: [
      {
        label: "Upper",
        data: upper,
        borderWidth: 0,
        pointRadius: 0,
        fill: "-1",
        backgroundColor: "rgba(60,120,160,0.15)",
        tension: 0.3,
      },
      {
        label: "Lower",
        data: lower,
        borderWidth: 0,
        pointRadius: 0,
        fill: false,
        tension: 0.3,
      },
      {
        label: main.name,
        data: main.data,
        borderColor: main.color || "#2b9bff",
        backgroundColor: main.color || "#2b9bff",
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      ...(baseline ? [{
        label: baseline.name,
        data: baseline.data,
        borderColor: baseline.color || "#13e3b5",
        backgroundColor: baseline.color || "#13e3b5",
        borderDash: [6, 4],
        fill: false,
        tension: 0.3,
        pointRadius: 3
      }] : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top", labels: { color: "#dfe9ef" } },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const v = ctx.raw;
            return `${ctx.dataset.label}: ${v}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#dfe9ef" },
        grid: { color: "rgba(255,255,255,0.02)" },
      },
      y: {
        ticks: { color: "#dfe9ef" },
        grid: { color: "rgba(255,255,255,0.02)" },
      },
    },
  };

  return (
    <div style={{ height: "320px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
}
