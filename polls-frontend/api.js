import React from 'react';
import useInterceptor from './interceptors'

const useApiHelper = () => {
    const axios = useInterceptor();

    const api = {
        //auth
        signUp: (data, params = {}) => axios.post(`rest-auth/registration/`, data, { params: params }),
        signIn: (data, params = {}) => axios.post(`rest-auth/login/`, data, { params: params }),
        signOut: (data, params = {}) => axios.post(`rest-auth/logout/`, data, { params: params }),
        getUser: (params = {}) => axios.get(`rest-auth/user/`, { params: params }),
        updateUser: (data, params = {}) => axios.put(`rest-auth/user/`, data, { params: params }),

        //polls
        createPolls: (data, params = {}) => axios.post(`api/v1/polls/create-polls/`, data, { params: params }),
        pollsList: (params = {}) => axios.get(`api/v1/polls/polls-list/`, { params: params }),
        pollsDetails: (id, params = {}) => axios.get(`api/v1/polls/polls-details/${id}/`, { params: params }),
        updatePolls: (id, data, params = {}) => axios.put(`api/v1/polls/update-polls/${id}/`, data, { params: params }),
        deletePolls: (id, params = {}) => axios.delete(`api/v1/polls/delete-polls/${id}/`, { params: params }),

        //vote
        makeVote: (data, params = {}) => axios.post(`api/v1/polls/make-vote/`, data, { params: params }),

        //social login
        googleLogin: (data, params = {}) => axios.post(`rest-auth/google/`, data, { params: params }),
    }
    return api;
}

export default useApiHelper