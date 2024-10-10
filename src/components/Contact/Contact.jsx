import PropTypes from 'prop-types';
import css from './Contact.module.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';

const Contact = ({ data: { id, name, phone } }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteContact(id));
	};
	return (
		<div key={id} id={id} className={css.contact}>
			<div className={css.text_box}>
				<p className={css.text}>
					<IoPersonSharp className={css.icon} />
					{name}
				</p>
				<p className={css.text}>
					<FaPhoneAlt className={css.icon} />
					{phone}
				</p>
			</div>
			<button onClick={handleDelete} className={css.button}>
				Delete
			</button>
		</div>
	);
};

Contact.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	phone: PropTypes.string,
	data: PropTypes.object,
};

export default Contact;
