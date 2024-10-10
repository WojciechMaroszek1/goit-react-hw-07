import '../components/App.module.css';

import ContactForm from './ContactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList.jsx';
import SearchBox from './SearchBox/SearchBox.jsx';
import { SnackbarProvider } from 'notistack';

import css from './App.module.css';

function App() {
	return (
		<div className={css.webstyle}>
			<h1>Phonebook</h1>
			<ContactForm />
			<SearchBox />
			<SnackbarProvider maxSnack={5}>
				<ContactList />
			</SnackbarProvider>
		</div>
	);
}

export default App;
