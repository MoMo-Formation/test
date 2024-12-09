import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'];

const data = {
  labels,
  datasets: [
    {
      label: 'Taux de complétion',
      data: [65, 68, 72, 75, 76, 78],
      borderColor: 'rgb(37, 99, 235)',
      backgroundColor: 'rgba(37, 99, 235, 0.5)',
    },
  ],
};

export function ProgressChart() {
  return <Line options={options} data={data} />;
}