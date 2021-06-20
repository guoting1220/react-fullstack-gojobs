import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({search}) => {
	const [formData, setFormData] = useState("");

	const handleChange = (e) => {
		setFormData(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		search(formData.trim() || undefined);
		setFormData(formData.trim());
	}

	return (
		<form className="SearchForm" onSubmit={handleSubmit}>
			<input 
				type="text"
				name="searchTerm" 
				value={formData} 
				onChange={handleChange}
				placeholder=" Enter search term .."
			>				
			</input>
			<button>Submit</button>
		</form>
	)
}

export default SearchForm;