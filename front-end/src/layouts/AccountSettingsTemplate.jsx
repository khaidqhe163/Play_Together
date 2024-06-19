import React from 'react';
import NavBar from './NavBar';
import AccountSettings from '../components/AccountSettings';
import { Bounce, ToastContainer } from 'react-toastify';

export default function AccountSettingsTemplate({ children }) {
    return (
        <div className="container-fluid d-flex flex-column vh-100 overflow-x-hidden bg-bgMain">
            <div className="row sticky-top bg-white shadow-sm">
                <div className="col-12">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition={Bounce} />
                    <NavBar />
                </div>
            </div>
            <div className='row flex-grow-1'>
                <div className='col-3 position-relative p-0'>
                    <AccountSettings />
                </div>
                <div className='col-9' style={{ height: "830px", overflow: "auto" }}>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-10 py-3'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
