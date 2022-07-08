import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Modals from './Modals.jsx';

const JobList = ({ jobs, addJob, updateJob, deleteJob, deleteAllJobs}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = e => {
    e.preventDefault();
    addJob({
      job_title: e.target.job_title.value,
      job_description: e.target.job_description.value,
      company: e.target.company.value,
      date_applied: e.target.date_applied.value,
      status: e.target.status.value
    });
    handleClose();
  }

  const handleDelete = targetJob => {
    confirm('Are you sure you want to delete this job?') ? deleteJob(targetJob) : null
  }

  const handleDeleteAll = () => {
    confirm('Are you sure you want to delete all jobs?') ? deleteAllJobs() : null
  }

  return (

    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">

          {/* search not working yet */}
          {/* <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search Job" aria-label="Search"/>
              </form>
            </div>
          </div> */}

          <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-grid" style={{color:"black"}}><h2><b>Job Tracker</b></h2></div>

          {/* add job */}
          <div className="col-sm-3 offset-sm-3  mt-5 mb-4 text-grid float-end">
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
                    <th>Job Title</th>
                    <th>Job Description</th>
                    <th>Company</th>
                    <th>Date applied</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
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