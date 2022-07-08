import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Modals from './Modals.jsx';

// functional component to show jobs data on table
const JobList = ({ jobs, addJob, updateJob, deleteJob, deleteAllJobs, setJobs, originalJobs}) => {

  const handleDelete = targetJob => {
    confirm('Are you sure you want to delete this job?') ? deleteJob(targetJob) : null
  }

  const handleDeleteAll = () => {
    confirm('Are you sure you want to delete all jobs?') ? deleteAllJobs() : null
  }

  // sorting table
  const [sortConfig, setSortConfig] = useState(null);
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    let sortableJobs = [...jobs];
    if (sortConfig !== null) {
      sortableJobs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      const jobsNoIds = sortableJobs.map(({type,index,...rest}) => ({...rest}));
      setJobs(jobsNoIds);
    }
  }

  // searching table
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value) {
      let filtered = jobs.filter(item => {
        return (
          item.job_title.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.job_description.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.company.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.date_applied.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.status.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });
      setSearch(e.target.value);
      setJobs(filtered);
    } else {
      setJobs(originalJobs);
      setSearch('');
    }
  }

  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">

          {/* search input */}
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search Job" aria-label="Search" onChange={handleSearch}/>
              </form>
            </div>
          </div>

          <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-grid" style={{color:"black"}}><h2><b>Job Tracker</b></h2></div>

          {/* add job input */}
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-grid float-end">
            <Modals buttonLabel="add" addJob={addJob} />
            {' '}
            <Button className="btn btn-dark" onClick={handleDeleteAll}>Delete All</Button>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive" >
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
                <tr>
                    {/* table headings and column sorting */}
                    <th role="button" onClick={() => requestSort('job_title')}>
                      Job Title
                    </th>
                    <th role="button" onClick={() => requestSort('job_description')}>
                      Job Description
                    </th>
                    <th role="button" onClick={() => requestSort('company')}>
                      Company
                    </th>
                    <th role="button" onClick={() => requestSort('date_applied')}>
                      Date applied
                    </th>
                    <th role="button" onClick={() => requestSort('status')}>
                      Status
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            {/* job data displayed */}
            <tbody>
              {jobs.map((job) => {
                return (
                  <tr key={job._id}>
                    <td>{job.job_title}</td>
                    <td>{job.job_description}</td>
                    <td>{job.company}</td>
                    <td>{job.date_applied ? job.date_applied.slice(0,10) : "" }</td>
                    <td>{job.status}</td>
                    <td>
                      <Modals buttonLabel="view" job={job}/>
                      <Modals buttonLabel="edit" job={job} updateJob={updateJob} />
                      <a href="#" className="delete" title="Delete" data-toggle="tooltip" style={{color:"black"}} onClick={()=>handleDelete(job)}><i className="material-icons" >&#xE872;</i></a>
                    </td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default JobList;