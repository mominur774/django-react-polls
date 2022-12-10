import React, { useEffect, useState } from 'react';
import PollsCreateModal from '../Modals/PollsCreateModal';
import useApiHelper from '../../api';

let moment = require('moment');

const HeroSection = () => {
  const [show, setShow] = useState()
  const [formData, setFormData] = useState({});
  const [polls, setPolls] = useState([]);

  const api = useApiHelper();

  const handleModalClose = () => {
    setShow(false)
  }

  const handleModalShow = () => {
    setShow(true)
  }

  const pollsList = () => {
    api.pollsList().then(res => {
      setPolls(res.results)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const makeVote = (polls, choices) => {
    api.makeVote({ polls, choices }).then(res => {
      pollsList()
    }).catch(error => {
      console.log(error)
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    api.createPolls(formData).then(res => {
      pollsList();
      handleModalClose();
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    pollsList();
  }, [])

  return (<>
    <div className='row my-3'>
      <div className="col-lg-10 mx-auto">
        <button
          onClick={handleModalShow}
          className='btn btn-primary'
        >
          Create a polls
        </button>

        <hr />
        <div className="polls">
          {polls.length ? (
            <>
              {polls.map(poll => (
                <div className='mb-3' key={poll.id}>
                  <p><b>{poll.question}</b></p>
                  {poll.choices.map(choice => (
                    <React.Fragment key={choice.id}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`choices${poll.id}`}
                          id={choice.id}
                          onChange={() => makeVote(poll.id, choice.id)}
                          checked={choice.is_voted && true}
                        />
                        <label className="form-check-label" htmlFor={`${choice.choices}`}>
                          {choice.choices}
                        </label>
                      </div>
                      {poll.total_vote > 0 &&
                        <div className="progress mb-3 mt-1 w-50" style={{ 'height': '20px' }}>
                          <div
                            className="progress-bar progress-bar-striped"
                            style={{ 'width': `${choice.avg_vote}%` }}
                            role="progressbar"
                            aria-valuenow={choice.avg_vote}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >{choice.avg_vote}%</div>
                        </div>}
                    </React.Fragment>))}
                  <div className='my-3'>
                    <div className='d-flex'>
                      <p>Total votes: {poll.total_vote}</p>
                      <span className='mx-2 separator'>.</span>
                      <p>{moment(poll.created_at).fromNow()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h4>No polls</h4>
          )}
        </div>
      </div>
    </div>
    <PollsCreateModal
      show={show}
      handleClose={handleModalClose}
      handleChange={handleChange}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  </>)
}

export default HeroSection