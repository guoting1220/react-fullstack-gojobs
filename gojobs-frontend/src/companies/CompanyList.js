import React, { useEffect, useState } from 'react';
import SearchForm from '../common/SearchForm';
import CompanyCard from './CompanyCard';
import NoResultsFound from '../common/NoResultsFound';
import JoblyApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';


const CompanyList = () => {
  const [companies, setCompanies] = useState(null);

  const searchCompanies = async (name) => {
    let searchedResult = await JoblyApi.getCompanies(name);
    setCompanies(searchedResult);
  }

  useEffect(() => { searchCompanies() }, []);

  if (!companies) return <LoadingSpinner />;

  return (
    <div className="CompanyList">
      <SearchForm search={searchCompanies} />
      {companies.length === 0 ?
        <NoResultsFound />
        :
        <div>
          {companies.map(c =>
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          )}
        </div>
      }
    </div>
  )

}


export default CompanyList;