import React, { ReactNode, useEffect, useState } from 'react';
import { Box, CircularProgress, CssBaseline, Paper } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import Chart from '~/components/Chart';
import { trendGraphLayout } from './index1';
import { useGetMeasurementSeriesQuery } from '~/slices/timeseriesApi';
import {TimeSeriesData} from "~/types/timeseries";

function transformDataForPlotly(data: TimeSeriesData): Plotly.Data[] {
  return data.map((series) => {
    const { 'ts,val': values } = series;
    const x = values.map(([timestamp]) => timestamp);
    const y = values.map(([, value]) => value);
    return {
      type: 'scatter',
      x,
      y,
    };
  });
}

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [chartData, setChartData] = useState<Plotly.Data[] | undefined>(undefined);
  const x = useGetMeasurementSeriesQuery(
    {
      customerId: 9,
      measId: '22420',
      start: 1696530345985,
    },
  );
  const { data, isUninitialized, isLoading, error } = x;

  useEffect(() => {
    console.log('useEffect called', { data, isUninitialized, error });
    if (isUninitialized) {
      setChartData(undefined);
    }
    if (data) {
      const plotlyData = transformDataForPlotly(data);
      setChartData(plotlyData);
    }
  }, [data, isUninitialized, error]);

  return (
    <Box display="flex" p={3} gap={3}>
      <CssBaseline />
      <Paper elevation={2}>
        <Box
          p={3}
          sx={{ flexGrow: 1, transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1)' }}
        >
          <DateTimePicker />
          {isLoading && <CircularProgress />}
          {chartData && <Chart data={chartData} layout={trendGraphLayout} />}
        </Box>
      </Paper>
    </Box>
  );
};

export default Layout;
