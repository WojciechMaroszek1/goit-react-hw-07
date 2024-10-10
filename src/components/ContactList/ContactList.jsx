import Contact from '../Contact/Contact.jsx';
import css from '../ContactList/ContactList.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations.js';
import { selectFilteredContacts } from '../../redux/selectors.js';
import { fetchContacts } from '../../redux/contactsSlice.js';
import { useSnackbar } from 'notistack';

const ContactList = () => {
	const contacts = useSelector(selectFilteredContacts);
	const loading = useSelector(state => state.contacts.loading);
	const error = useSelector(state => state.contacts.error);
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar(); // Hook do obsługi powiadomień

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
		}
	}, [error, enqueueSnackbar]);

	useEffect(() => {
		if (!loading && contacts.length === 0) {
			enqueueSnackbar('No contacts available.', { variant: 'info' });
		}
	}, [loading, contacts, enqueueSnackbar]);

	const handleDelete = id => {
		dispatch(deleteContact(id));
	};

	if (loading) return <h2>LOADING...</h2>;

	return (
		<ul className={css.contactList}>
			{contacts.map(contact => (
				<li key={contact.id}>
					<Contact data={contact} onDelete={handleDelete} />
				</li>
			))}
		</ul>
	);
};

export default ContactList;
