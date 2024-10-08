import '../components/App.module.css';

import ContactForm from './ContactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList.jsx';
import SearchBox from './SearchBox/SearchBox.jsx';

import css from './App.module.css';

function App() {
	return (
		<div className={css.webstyle}>
			<h1>Phonebook</h1>
			<ContactForm />
			<SearchBox />
			<ContactList />
		</div>
	);
}

export default App;
