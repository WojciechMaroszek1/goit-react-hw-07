import Contact from './Contact/Contact.jsx';
import css from '../ContactList/ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from '../../redux/contactsSlice.js';
import { selectFilteredContacts } from '../../redux/selectors.js';

const ContactList = () => {
	const filteredContacts = useSelector(selectFilteredContacts);
	const dispatch = useDispatch();

	const handleDelete = id => {
		dispatch(removeContact(id));
	};
	return (
		<ul className={css.contactList}>
			{filteredContacts.map(contact => (
				<li key={contact.id}>
					<Contact data={contact} onDelete={handleDelete} />
				</li>
			))}
		</ul>
	);
};

export default ContactList;
