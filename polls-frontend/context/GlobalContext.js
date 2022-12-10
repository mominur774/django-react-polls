import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import useApiHelper from "../api";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState({});

    const api = useApiHelper();

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

    useEffect(() => {
        getUserDetails();
    }, [Cookies.get('accessToken')])

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            getUserDetails,
            user,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;
export { GlobalProvider }