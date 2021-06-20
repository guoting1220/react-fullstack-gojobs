import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobCardList from '../jobs/JobCardList';
import JoblyApi from './../api/api';

const CompanyDetail = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const getCompany = async () => {
      setCompany(await JoblyApi.getCompany(handle));
    }
    getCompany();
  }, [handle]);

  return (
    <div className="CompanyDetail">
      { company ?
        <div>
          <h2>{company.name}</h2>
          <p>{company.description}</p>
          <JobCardList jobs={company.jobs} />
        </div>
        : <p>wait...</p>
      }
    </div>
  )
}


export default CompanyDetail;