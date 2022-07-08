import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import JobList from './JobList.jsx';

const App = () => {
   // state that holds data of jobs viewable by user
   const [jobs, setJobs] = useState([]);
   //state that holds reset data of jobs viewable after search reset
   const [originalJobs, setOriginal] = useState([]);

   // initialize jobs state from database data
   useEffect(() => {
      axios.get('/api/jobs')
         .then((res) => {
         setJobs(res.data);
         setOriginal(res.data);
         })
         .catch((err) => console.error('axios error getting jobs', err));
   }, []);

   // add job to database and update the jobs state
   function addJob(job) {
      axios.post('/api/jobs', job)
      .then((res) => {
         setJobs(prevState => {
         const jobData = [...prevState, res.data];
         return jobData;
         });
         setOriginal(prevState => {
         const jobData = [...prevState, res.data];
         return jobData;
         })
      })
      .catch((err)=>{
         console.error('axios error adding job', err);
      })
   }

   // update job in database and update the jobs state
   function updateJob(job, oldJob) {
      job._id = oldJob._id;
      axios.put(`/api/jobs/${oldJob._id}`, job)
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
      })
      .catch((err)=>{
         console.error('axios error updating job', err);
      })
   }

   // delete job from database and update the jobs state
   function deleteJob(job) {
      axios.delete(`/api/jobs/${job._id}`, {params: {id: job._id}})
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
      })
      .catch((err)=>{
         console.error('axios error deleting job', err);
      })
   }

   // delete all jobs from database and update the jobs state
   function deleteAllJobs() {
      axios.delete(`/api/deletejobs/`)
      .then(()=>{
        setJobs([]);
        setOriginal([]);
      })
      .catch((err)=>{
        console.error('axios error deleting jobs', err);
      })
   }

   return (
      <div>
        <JobList jobs={ jobs } updateJob={ updateJob } deleteJob={ deleteJob } addJob={ addJob } deleteAllJobs={ deleteAllJobs } setJobs={setJobs} originalJobs={originalJobs}/>
      </div>
   );
}

export default App;