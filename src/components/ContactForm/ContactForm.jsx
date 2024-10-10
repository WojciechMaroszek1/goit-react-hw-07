import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './ContactForm.module.css';
import * as Yup from 'yup';
import uuid4 from 'uuid4';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/operations';
import { useId } from 'react';

const userSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, 'Name is too short')
		.max(50, 'Name is too long')
		.required('Required')
		.matches(/^[A-Za-z\s]+$/, 'Imię może zawierać tylko litery i spacje'),
	number: Yup.string()
		.min(9, 'Number is too short')
		.max(12, 'Number is too long')
		.required('Required')
		.matches(/^\d+(-\d+){0,2}$/, 'Numer może zawierać tylko cyfry i myślniki'),
});

const ContactForm = () => {
	const dispatch = useDispatch();
	const nameId = useId();
	const phoneId = useId();

	const handleAddContact = (values, { resetForm }) => {
		try {
			dispatch(
				addContact({
					id: uuid4(),
					name: values.name,
					number: values.number,
				})
			);
			resetForm();
		} catch (error) {
			console.error('Error adding contact:', error);
		}
	};

	return (
		<Formik initialValues={{ name: '', number: '' }} onSubmit={handleAddContact} validationSchema={userSchema}>
			<Form className={css.form}>
				<div className={css.field_box}>
					<label htmlFor={nameId}>Name</label>
					<Field className={css.form_field} type="text" name="name" id={nameId} autoComplete="name"></Field>
					<ErrorMessage className={css.error} name="name" component="div" as="span" />
				</div>
				<div className={css.field_box}>
					<label htmlFor={phoneId}>Number</label>
					<Field
						className={css.form_field}
						type="text"
						name="number"
						id={phoneId}
						autoComplete="phone"
					></Field>
					<ErrorMessage className={css.error} name="number" component="div" as="span" />
				</div>
				<button type="submit" className={css.button}>
					Add contact
				</button>
			</Form>
		</Formik>
	);
};

export default ContactForm;
