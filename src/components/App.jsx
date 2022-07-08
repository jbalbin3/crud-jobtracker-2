import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import JobList from './JobList.jsx';

const App = () => {
   const [jobs, setJobs] = useState([]);

   useEffect(() => {
      axios.get('/api/jobs')
         .then((res) => {
         setJobs(res.data);
         })
         .catch((err) => console.error('axios error getting jobs', err));
   }, []);

   function addJob(job) {
      axios.post('/api/jobs', job)
      .then((res) => {
         setJobs(prevState => {
         const jobData = [...prevState, res.data];
         return jobData;
         });
      })
      .catch((err)=>{
         console.error('axios error adding job', err);
      })
   }

   function updateJob(job, oldJob) {
      job._id = oldJob._id;
      axios.put(`/api/jobs/${oldJob._id}`, job)
      .then(() => {
         setJobs(prevState => {
         const jobData = [...prevState];
         jobData[jobData.indexOf(oldJob)] = job;
         return jobData;
         });
      })
      .catch((err)=>{
         console.error('axios error updating job', err);
      })
   }

   function deleteJob(job) {
      axios.delete(`/api/jobs/${job._id}`, {params: {id: job._id}})
      .then((res) => {
         setJobs(prevState => {
         const jobData = [...prevState];
         jobData.splice(jobData.indexOf(job), 1);
         return jobData;
         });
      })
      .catch((err)=>{
         console.error('axios error deleting job', err);
      })
   }

   function deleteAllJobs() {
      axios.delete(`/api/deletejobs/`)
      .then(()=>{
        setJobs([]);
      })
      .catch((err)=>{
        console.error('axios error deleting jobs', err);
      })
   }

   return (
      <div>
        <JobList jobs={ jobs } updateJob={ updateJob } deleteJob={ deleteJob } addJob={ addJob } deleteAllJobs={ deleteAllJobs }/>
      </div>
   );
}

export default App;