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
    setShow(false);
    setFormData({});
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

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (!id) {
      api.createPolls(formData).then(res => {
        pollsList();
        handleModalClose();
      }).catch(error => {
        console.log(error)
      })
    } else {
      if (!formData.choices1) {
        formData['choices1'] = formData?.choices[0]?.choices
      }
      if (!formData.choices2) {
        formData['choices2'] = formData?.choices[1]?.choices
      }
      api.updatePolls(id, formData).then(res => {
        pollsList();
        handleModalClose();
      }).catch(error => {
        console.log(error)
      })
    }
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
        <PollsList
          polls={polls}
          pollsList={pollsList}
          formData={formData}
          setFormData={setFormData}
          handleModalShow={handleModalShow}
        />
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