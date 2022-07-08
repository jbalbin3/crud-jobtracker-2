import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Forms from './Forms.jsx';

const Modals = (props) => {

  const [viewModal, setViewModal] = useState(false);

  const handleCloseModal = () => setViewModal(false);
  const handleShowModal = () => setViewModal(true);

  let button = '';
  let title = '';
  let viewBody = false;

  switch(props.buttonLabel) {
    case 'edit':
      button = <a href="#" className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons" style={{color:"black"}} onClick={handleShowModal}>&#xE254;</i></a>
      title = 'Update Job';
      break;
    case 'add':
      button = <Button className="btn btn-dark" onClick={handleShowModal}>Add Job</Button>
      title = 'Add Job';
      break;
    case 'view':
      viewBody = true;
      button = <a href="#" className="view" title="View" data-toggle="tooltip" style={{color:"black"}} onClick={handleShowModal}><i className="material-icons">&#xE417;</i></a>
      title = 'Job Details';
      break;
  }

  const jobDetails = (job) => {
    return (
      <div>
        <h6>Job Title</h6>
        <div>{job.job_title}</div>
        <h6 className="mt-3">Job Description</h6>
        {job.job_description}
        <h6 className="mt-3">Company</h6>
        {job.company}
        <h6 className="mt-3">Date Applied</h6>
        {job.date_applied.substring(0,10)}
        <h6 className="mt-3">Status</h6>
        {job.status}
      </div>
    )
  }

  return (
    <div className="model_box" style={{ display: 'inline' }}>
      {button}
      <Modal
        show={viewModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                {viewBody ? jobDetails(props.job) : <Forms addJob={props.addJob} updateJob={props.updateJob} job={props.job}/>}
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default Modals;