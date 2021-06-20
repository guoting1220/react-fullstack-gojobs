import React, { useEffect, useContext, useState } from 'react';
import UserContext from '../auth/UserContext';
import JobCardList from '../jobs/JobCardList';
import JoblyApi from './../api/api';
import LoadingSpinner from '../common/LoadingSpinner';


const AppliedJobs = () => {
  const { applications } = useContext(UserContext);
  const [appliedJobs, setAppliedJobs] = useState(null);

  useEffect(() => {
    const getAppliedJobs = async () => {
      const result = [];
      for (let id of applications) {
        const job = await JoblyApi.getJobById(id);
        result.push(job);
      }
      setAppliedJobs(result);
      // setAppliedJobs(applications.map(id => await JoblyApi.getJobById(id));
    }

    getAppliedJobs();
  }, [applications]);

  if (!appliedJobs) return <LoadingSpinner />;

  return (
    <div className="AppliedJobs">
      <h2>My applied jobs: </h2>
      <JobCardList jobs={appliedJobs} />
    </div>
  )
}


export default AppliedJobs;