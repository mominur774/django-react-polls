import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const PollsCreateModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props?.formData?.id ? "Update Polls" : "Create Polls"}

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={
            props?.formData?.id
              ? (e) => props.handleSubmit(e, props?.formData?.id)
              : (e) => props.handleSubmit(e, '')
          }
          className='mx-5' action=""
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label className='form-label' htmlFor="question">Polls</label>
                <input
                  placeholder='Enter your question here...'
                  type="text"
                  name="question"
                  className='form-control'
                  onChange={props.handleChange}
                  defaultValue={
                    props?.formData?.question
                      ? props?.formData?.question
                      : ''
                  }
                  id="question"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label className='form-label' htmlFor="option1">Choices 1</label>
                <input
                  type="text"
                  name="choices1"
                  className='form-control'
                  onChange={props.handleChange}
                  defaultValue={
                    props?.formData?.choices?.length > 0
                      ? props?.formData?.choices[0]?.choices
                      : ''
                  }
                  id="option1"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label className='form-label' htmlFor="option2">Choices 2</label>
                <input
                  type="text"
                  name="choices2"
                  className='form-control'
                  onChange={props.handleChange}
                  defaultValue={
                    props?.formData?.choices?.length > 0
                      ? props?.formData?.choices[1]?.choices
                      : ''
                  }
                  id="option2"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label className='form-label' htmlFor="expire_at">Expire Date</label>
                <input
                  placeholder='Enter your question here...'
                  type="date"
                  name="expire_at"
                  className='form-control'
                  onChange={props.handleChange}
                  defaultValue={
                    props?.formData?.expire_at
                      ? props?.formData?.expire_at
                      : ''
                  }
                  id="expire_at"
                />
              </div>
            </div>
          </div>

          <button type="submit" className='btn btn-primary my-3'>{props?.formData?.id ? 'Update' : 'Create'}</button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default PollsCreateModal