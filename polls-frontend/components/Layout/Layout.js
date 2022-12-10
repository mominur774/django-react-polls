import React from 'react';
import Helment from 'next/head';
import Header from '../Header/Header';

const Layout = ({ children }) => {
    return (<>
        <Helment>
            <title>Polls App</title>
        </Helment>
        <div className='container my-3'>
            <Header />
            {children}
        </div>
    </>
    )
}

export default Layout