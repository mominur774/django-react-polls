import React, { useEffect, useState } from 'react';
import PollsCreateModal from '../Modals/PollsCreateModal';
import useApiHelper from '../../api';

import PollsList from '../Polls/PollsList';

const HeroSection = () => {
  const [show, setShow] = useState(false);
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
        <PollsList polls={polls} pollsList={pollsList} />
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