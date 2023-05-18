import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import useApiHelper from "../api";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});

  const api = useApiHelper();
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const getUserDetails = () => {
    if (Cookies.get('accessToken')) {
      api.getUser().then(res => {
        setUser(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const loginSuccess = (response) => {
    Cookies.set('accessToken', response.token)
    setIsLoggedIn(true);
    router.push('/')
  }

  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => api.googleLogin({ 'access_token': tokenResponse.access_token }).then(res => {
      loginSuccess(res)
    }).catch(error => {
      console.log(error)
    }),
    onError: error => console.log(error)
  })

  useEffect(() => {
    getUserDetails();
  }, [Cookies.get('accessToken')])

  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      getUserDetails,
      user,
      googleLogin,
      loginSuccess
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext;
export { GlobalProvider }