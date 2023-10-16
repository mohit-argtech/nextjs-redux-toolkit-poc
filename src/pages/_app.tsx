import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '~/store';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#58ba54',
            contrastText: '#f5f5f5',
        },
        secondary: {
            main: '#46a1d9',
            contrastText: '#f5f5f5',
        },
        error: {
            main: '#D02C2F',
        },
    },
});

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>Brompton Energy - Admin UI</title>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </LocalizationProvider>
                </>
            </ThemeProvider>
        </Provider>
    );
}
