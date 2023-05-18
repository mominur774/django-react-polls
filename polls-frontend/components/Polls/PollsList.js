import React, { useContext, useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import GlobalContext from '../../context/GlobalContext';
import useApiHelper from '../../api';
import RadionInput from '../Core/RadionInput';
import ConfirmDelete from '../Modals/ConfirmDeleteModal';

let moment = require('moment');

const PollsList = (props) => {
  const [show, setShow] = useState();
  const [deleteId, setDeleteId] = useState(null);

  const gContext = useContext(GlobalContext);
  const api = useApiHelper();

  const handleModalClose = () => {
    setShow(false)
  }

  const handleEdit = (id) => {
    props.handleModalShow()
    api.pollsDetails(id).then(res => {
      props.setFormData(res)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleModalShow = (id) => {
    setShow(true);
    setDeleteId(id);
  }

  return (<>
    <div className="polls">
      {props?.polls?.length ? (
        <>
          {props?.polls?.map(poll => (
            <div className='mb-3' key={poll.id}>
              <div className='d-flex justify-content-between w-75'>
                <p><b>{poll.question}</b></p>
                {gContext?.user?.pk === poll.user &&
                  <div>
                    <span className='me-2'>
                      <FaRegEdit
                        style={{ 'color': 'blue', 'cursor': 'pointer' }}
                        onClick={() => handleEdit(poll.id)}
                      />
                    </span>
                    <span className=''>
                      <FaTrashAlt
                        style={{ 'color': 'red', 'cursor': 'pointer' }}
                        onClick={() => handleModalShow(poll.id)}
                      />
                    </span>
                  </div>
                }
              </div>
              <RadionInput poll={poll} pollsList={props?.pollsList} />
              <div className='my-3'>
                <div className='d-flex'>
                  <p>Total votes: {poll.total_vote}</p>
                  <span className='mx-2 separator-dot'>.</span>
                  <p>Expire {moment(poll.expire_at).fromNow()}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h4>No polls</h4>
      )}
    </div>
    <ConfirmDelete
      show={show}
      handleClose={handleModalClose}
      id={deleteId}
      pollsList={props?.pollsList}
      setShow={setShow}
    />
  </>)
}

export default PollsList