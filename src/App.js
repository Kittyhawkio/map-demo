import './App.scss';
import AppThemeProvider from './AppThemeProvider';
import MainContainer from 'components/MainContainer';

const App = () => {
	return (
			<AppThemeProvider>
					<MainContainer />
			</AppThemeProvider>
	);
};

export default App;

//TODO update the link to Aloft API token instructions