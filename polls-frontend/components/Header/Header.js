import React, { useContext, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import Link from 'next/link';
import useApiHelper from '../../api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Header = () => {
    const gContext = useContext(GlobalContext);
    const api = useApiHelper();
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('accessToken');
        gContext.setIsLoggedIn(false);
        api.signOut().then(res => {
            router.push('/login')
        }).catch(error => {
            Cookies.remove('accessToken');
        })
    }

    return (

        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link href="/">
                                <a className="nav-link">Home</a>
                            </Link>
                        </li>
                        {gContext.isLoggedIn ? (
                            <li className="nav-item">
                                <Link href="#">
                                    <a onClick={handleLogout} className="nav-link">Logout</a>
                                </Link>
                            </li>
                        ) : (<>
                            <li className="nav-item">
                                <Link href="/login">
                                    <a className="nav-link">Login</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/sign-up">
                                    <a className="nav-link">Sing Up</a>
                                </Link>
                            </li>
                        </>)}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header