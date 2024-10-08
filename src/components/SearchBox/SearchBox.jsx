import css from './SearchBox.module.css';
import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
	const searchFieldId = useId();
	const dispatch = useDispatch();
	const filter = useSelector(state => state.filters.filter);

	const handleSearch = value => {
		dispatch(setFilter(value));
	};
	return (
		<Formik>
			<Form>
				<div className={css.form}>
					<label htmlFor={searchFieldId}>Find contacts by name</label>
					<div>
						<FaSearch className={css.icon} />
						<Field
							className={css.field}
							type="text"
							id={searchFieldId}
							onChange={e => handleSearch(e.target.value)}
							value={filter}
						/>
					</div>
				</div>
			</Form>
		</Formik>
	);
};

export default SearchBox;
