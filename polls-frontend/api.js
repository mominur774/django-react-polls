import React from 'react';
import useInterceptor from './interceptors'

const useApiHelper = () => {
    const axios = useInterceptor();

    const api = {
        //auth
        signUp: (data, params = {}) => axios.post(`rest-auth/registration/`, data, params),
        signIn: (data, params = {}) => axios.post(`rest-auth/login/`, data, params),
        signOut: (data, params = {}) => axios.post(`rest-auth/logout/`, data, params),
        getUser: (params = {}) => axios.get(`rest-auth/user/`, { params: params }),
        updateUser: (data, params = {}) => axios.put(`rest-auth/user/`, data, params),

        //polls
        createPolls: (data, params = {}) => axios.post(`api/v1/polls/create-polls/`, data, params),
        pollsList: (params = {}) => axios.get(`api/v1/polls/polls-list/`, params),
        deletePolls: (id, params = {}) => axios.delete(`api/v1/polls/delete-polls/${id}`, params),

        //vote
        makeVote: (data, params = {}) => axios.post(`api/v1/polls/make-vote/`, data, params),
    }
    return api;
}

export default useApiHelper