import React, { useState, useContext } from 'react';
import './JobCard.css';
import UserContext from '../auth/UserContext';


const JobCard = ({ id, title, salary, equity, companyName }) => {
  const { applyToJob, unApplyToJob, applications, setApplications } = useContext(UserContext);

  const hasAppliedToJob = () => {
    return applications.includes(id);
  }

  const [isApplied, setIsApplied] = useState(hasAppliedToJob());

  const toggleApply = async () => {
    // debugger;
    if (!isApplied) {
      await applyToJob(id);
      setApplications(applications => [...applications, id]);
    }
    else {
      await unApplyToJob(id);
      setApplications(applications => [...applications.filter(a => a !== id)]);
    }
    setIsApplied(!isApplied);
  }

  // useEffect()

  return (
    <div className="JobCard">
      <h3>{title}</h3>
      <h5>{companyName}</h5>
      {salary ? <p>Salary: {salary}</p> : null}
      {equity ? <p>Equaity: {equity}</p> : null}
      <button
        className="JobCard-applyBtn"
        onClick={toggleApply}
      >
        {isApplied ?
          <b className="applied">Applied</b>
          : <b className="unapplied">Apply</b>}
      </button>
    </div>
  )
}

export default JobCard;