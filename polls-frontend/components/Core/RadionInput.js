import React from 'react';
import useApiHelper from '../../api';

const RadionInput = ({ poll, pollsList }) => {
  const api = useApiHelper();

  const makeVote = (polls, choices) => {
    api.makeVote({ polls, choices }).then(res => {
      pollsList()
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <>
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
            <div className="progress mb-3 mt-1 w-75" style={{ 'height': '20px' }}>
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
    </>
  )
}

export default RadionInput