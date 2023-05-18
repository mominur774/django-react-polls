import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import useApiHelper from '../api';
import GlobalContext from '../context/GlobalContext';
import { useRouter } from 'next/router';

const Login = () => {
  const [formData, setFormData] = useState({});

  const api = useApiHelper();
  const gContext = useContext(GlobalContext);
  const router = useRouter();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    api.signIn(formData).then(res => {
      gContext.loginSuccess(res)
    }).catch(error => {
      console.log(error)
    })
  }

  return (<>
    <div className="row mt-5">
      <div className="col-lg-8 mx-auto">
        <form onSubmit={handleSubmit} action="">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label className='form-label' htmlFor="email">Email</label>
                <input onChange={handleChange} type="text" id="email" name="email" className='form-control' />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label className='form-label' htmlFor="password">Password</label>
                <input onChange={handleChange} type="password" id="password" name="password" className='form-control' />
              </div>
            </div>
          </div>
          <button className='btn btn-primary w-100 mt-3' type="submit">Login</button>
          <div className="d-flex align-items-center my-3 gap-3">
            <div className="separator"></div>
            <span>or</span>
            <div className="separator"></div>
          </div>
          <button onClick={gContext.googleLogin} className='btn btn-outline-success w-100 mt-3' type="button">Login with Google</button>
        </form>
      </div>
    </div>
  </>)
}

export default Login