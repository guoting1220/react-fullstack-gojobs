import React from 'react';
import './CompanyCard.css'
import { Link } from 'react-router-dom';


const CompanyCard = ({ handle, name, description, logoUrl }) => {
	return (
		<Link className="CompanyCard" exact to={`/companies/${handle}`} style={{textDecoration: 'none'}}>
			<div className="CompanyCard-body">
				<h3>{name}</h3>
				<p>{description}</p>
				{/* <img src={logoUrl} alt={name}></img> */}
			</div>
		</Link>		
	)
}

export default CompanyCard;