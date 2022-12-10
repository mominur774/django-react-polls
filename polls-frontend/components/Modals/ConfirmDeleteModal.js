import React from "react";
import Modal from 'react-bootstrap/Modal';
import useApiHelper from "../../api";

const ConfirmDelete = (props) => {
  const api = useApiHelper();

  const handleDelete = (id) => {
    api.deletePolls(id).then(res => {
      props.pollsList();
      props.setShow(false);
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>You can't restore the data anymore!</span>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <button onClick={props.handleClose} className="btn btn-secondary me-2">Cancel</button>
          <button onClick={() => handleDelete(props.id)} className="btn btn-danger">Confirm Delete</button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmDelete;