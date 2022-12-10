import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import useApiHelper from '../api';
import GlobalContext from '../context/GlobalContext';
import { useRouter } from 'next/router';

const SignUp = () => {
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
        if (formData.password === formData.password2) {
            api.signUp(formData).then(res => {
                Cookies.set('accessToken', res.token)
                gContext.setIsLoggedIn(true);
                router.push('/')
            }).catch(error => {
                console.log(error)
            })
        }
        else {
            console.log("Password doesn't match!")
        }
    }

    return (<>
        <div className="row mt-5">
            <div className="col-lg-8 mx-auto">
                <form onSubmit={handleSubmit} action="">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group mb-3">
                                <label className='form-label' htmlFor="first_name">First Name</label>
                                <input onChange={handleChange} type="text" name="first_name" className='form-control' />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-3">
                                <label className='form-label' htmlFor="last_name">Last Name</label>
                                <input onChange={handleChange} type="text" name="last_name" className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-3">
                                <label className='form-label' htmlFor="email">Email</label>
                                <input onChange={handleChange} type="text" name="email" className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group mb-3">
                                <label className='form-label' htmlFor="password">Password</label>
                                <input onChange={handleChange} type="password" name="password" className='form-control' />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-3">
                                <label className='form-label' htmlFor="password2">Confirm Password</label>
                                <input onChange={handleChange} type="password" name="password2" className='form-control' />
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 mt-3' type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    </>)
}

export default SignUp