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
                    Create Polls
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={props.handleSubmit} className='mx-5' action="">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-3">
                                <label className='form-label' htmlFor="option1">Polls</label>
                                <input
                                    placeholder='Enter your question here...'
                                    type="text"
                                    name="question"
                                    className='form-control'
                                    onChange={props.handleChange}
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
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-3">
                                <label className='form-label' htmlFor="option1">Choices 2</label>
                                <input
                                    type="text"
                                    name="choices2"
                                    className='form-control'
                                    onChange={props.handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className='btn btn-primary my-3'>Create</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default PollsCreateModal