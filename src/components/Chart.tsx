import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export interface IChartProps {
  data: Plotly.Data[];
  layout: Partial<Plotly.Layout>;
}

const Chart: React.FC<IChartProps> = ({ data, layout }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState<Plotly.Data[]>(data);
  const [chartLayout, setChartLayout] = useState<Partial<Plotly.Layout>>(layout);

  useEffect(() => {
    setChartData(data);
    setChartLayout(layout);
  }, [data, layout]);

  const exportDataToCSV = (): void => {
    const data = chartData as Plotly.Data[];
    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'data.csv');
    tempLink.click();
  };

  const exportToPDF = async () => {
    const chart = chartRef.current;
    if (!chart) return;
    const canvas = await html2canvas(chart);

    // Calculate the aspect ratio of the chart
    const aspectRatio = canvas.width / canvas.height;

    // Set the width of the PDF to match the page width (you can adjust as needed)
    const pdfWidth = 510; // A4 width in mm

    // Calculate the corresponding height to maintain the aspect ratio
    const pdfHeight = pdfWidth / aspectRatio;

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('chart.pdf');
  };

  return (
    <>
      <div ref={chartRef}>
        <Plot data={chartData} layout={chartLayout} config={{ responsive: true }} />
      </div>
      <button onClick={exportDataToCSV}>Export to CSV</button>
      <button onClick={exportToPDF}>Export to PDF</button>
    </>
  );
};

export default Chart;
