import React, { useEffect, useState } from 'react';
import SearchForm from '../common/SearchForm';
import JobCardList from '../jobs/JobCardList';
import NoResultsFound from '../common/NoResultsFound';
import JoblyApi from './../api/api';
import LoadingSpinner from '../common/LoadingSpinner';

const JobList = () => {
	const [jobs, setJobs] = useState(null); //should be initialized with null instead of []

	const searchJobs = async (title) => {
		const searchedJobs = await JoblyApi.getJobs(title);
		setJobs(searchedJobs);
	};

	useEffect(() => {searchJobs()}, []);
  
  if (!jobs) return <LoadingSpinner />;
  
	return (
		<div className="JobList">
			<SearchForm search={searchJobs}/>
			{jobs.length === 0 ?
					<NoResultsFound />
				: <JobCardList jobs={jobs}/>
			}			
		</div>
	)

}


export default JobList;