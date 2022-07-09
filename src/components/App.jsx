import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import JobList from './JobList.jsx';
import apiJobs from '../../api/index.js';
import { ErrorBoundary } from 'react-error-boundary';

const App = () => {

   // hander for Error Boundary
   const ErrorHandler = ({error}) => {
      return (
         <div role="alert">
         <p>Site Error:</p>
         <pre>{error.message}</pre>
      </div>
      )
   }

   // state that holds data of jobs viewable by user
   const [jobs, setJobs] = useState([]);
   //state that holds reset data of jobs viewable after search reset
   const [originalJobs, setOriginal] = useState([]);

   // initialize jobs state from database data
   useEffect(() => {
      _getJobs();
   }, []);

   // read from database to update jobs state
   function _getJobs() {
      apiJobs.getAll()
      .then((res) => {
         setJobs(res);
         setOriginal(res);
      });
   }

   // add job to database and update the jobs state
   function _addJob(job) {
      apiJobs.post(job)
      .then((res) => {
         setJobs(prevState => {
         const jobData = [...prevState, res];
         return jobData;
         });
         setOriginal(prevState => {
         const jobData = [...prevState, res];
         return jobData;
         })
      });
   }

   // update job in database and update the jobs state
   function _updateJob(job, oldJob) {
      job._id = oldJob._id;
      apiJobs.put(oldJob._id, job)
      .then(() => {
         setJobs(prevState => {
         const jobData = [...prevState];
         jobData[jobData.indexOf(oldJob)] = job;
         return jobData;
         });
         setOriginal(prevState => {
         const jobData = [...prevState];
         jobData[jobData.indexOf(oldJob)] = job;
         return jobData;
         });
      });
   }

   // delete job from database and update the jobs state
   function _deleteJob(job) {
      apiJobs.remove(job._id)
      .then((res) => {
         setJobs(prevState => {
         const jobData = [...prevState];
         jobData.splice(jobData.indexOf(job), 1);
         return jobData;
         });
         setOriginal(prevState => {
         const jobData = [...prevState];
         jobData.splice(jobData.indexOf(job), 1);
         return jobData;
         });
      });
   }

   // delete all jobs from database and update the jobs state
   function _deleteAllJobs() {
      apiJobs.removeAll()
      .then(()=>{
        setJobs([]);
        setOriginal([]);
      })
   }

   return (
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <JobList jobs={ jobs } updateJob={ _updateJob } deleteJob={ _deleteJob } addJob={ _addJob } deleteAllJobs={ _deleteAllJobs } setJobs={setJobs} originalJobs={originalJobs}/>
      </ErrorBoundary>
   );
}

export default App;