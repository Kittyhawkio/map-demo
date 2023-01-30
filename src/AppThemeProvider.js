import { lazy, Suspense } from 'react';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import GraphikRegFont from 'assets/fonts/Graphik-Regular-Web.woff2';
import { blue, grey } from '@mui/material/colors';

const CssBaseline = lazy(() => import('@mui/material/CssBaseline'));

const AppThemeProvider = ({ children }) => {
	const theme = createTheme({
		palette: {
			primary: blue,
			secondary: grey
		},
		typography: {
			useNextVariants: true,
			suppressDeprecationWarnings: true,
			fontFamily: [
				'Graphik',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"'
			].join(',')
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: `
					@font-face {
						font-family: 'Graphik';
						font-size: 0.875rem;
						font-style: normal;
						font-display: swap;
						src: local('Graphik'), local('Graphik-Regular-Web'), url(${GraphikRegFont}) format('woff2');
						unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;

					}
				`
			},
			MuiSlider: {
				styleOverrides: {
					track: { backgroundColor: '#fff' },
					thumb: { backgroundColor: '#fff' }
				}
			},
			MuiLink: {
				defaultProps: {
					underline: 'hover'
				}
			}
		}
	});

	return (
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Suspense fallback={null}>
						<CssBaseline />
					</Suspense>
					{children}
				</ThemeProvider>
			</StyledEngineProvider>
	);
};
export default AppThemeProvider;
