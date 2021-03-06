import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

// component used for add and update
const Forms = (props) => {

  // initial state of form
  const[form, setForm] = useState({
    job_title: '',
    job_description: '',
    company: '',
    date_applied: '',
    status: ''
  })

  // used for updating a job to set form state with current job data
  useEffect(() => {
    if(props.job) {
      // transform isodate date type to year-month-day format
      props.job.date_applied = props.job.date_applied.substring(0, 10);
      const { job_title, job_description, company, date_applied, status } = props.job;
      setForm({ job_title, job_description, company, date_applied, status });
    }
  },[])

  // add form
  const submitFormAdd = e => {
    e.preventDefault();
    const newData = {
      job_title: form.job_title,
      job_description: form.job_description,
      company: form.company,
      date_applied: form.date_applied,
      status: form.status
    };
    props.addJob(newData);
  }

  // update form
  const submitFormUpdate = e => {
    e.preventDefault();
    const newData = {
      job_title: form.job_title,
      job_description: form.job_description,
      company: form.company,
      date_applied: form.date_applied,
      status: form.status
    };
    e.preventDefault();
    props.updateJob(newData, props.job);
  }

  // handler for form
  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value});
  }

  return (
    <Form onSubmit={props.job ? submitFormUpdate : submitFormAdd}>
      <Form.Group>
        <Form.Label>Job Title</Form.Label>
        <Form.Control required type="text" name="job_title" id="job_title" onChange={onChange} value={form.job_title === null ? '' : form.job_title} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Job Description</Form.Label>
        <Form.Control required type="text" name="job_description" id="job_description" onChange={onChange} value={form.job_description === null ? '' : form.job_description}  />
      </Form.Group>
      <Form.Group>
        <Form.Label>Company</Form.Label>
        <Form.Control required type="text" name="company" id="company" onChange={onChange} value={form.company === null ? '' : form.company}  />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date applied</Form.Label>
        <Form.Control required type="date" name="date_applied" id="date_applied" onChange={onChange} value={form.date_applied === null ? '' : form.date_applied}  />
      </Form.Group>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control required type="text" name="status" id="status" onChange={onChange} value={form.status === null ? '' : form.status}  placeholder="ex: applied, interviewed, offer extended" />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default Forms;