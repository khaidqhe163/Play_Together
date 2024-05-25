import React from 'react';
import ListIdol from './ListIdol';
import NavBar from './NavBar';

export default function DefaultTemplate({ children }) {
    return (
        <div className="container-fluid d-flex flex-column vh-100 overflow-x-hidden bg-bgMain">
            <div className="row sticky-top bg-white shadow-sm">
                <div className="col-12">
                    <NavBar />
                </div>
            </div>
            <div className="row flex-grow-1">
                <div className="col-2 p-0">
                    <div className="sticky-top" style={{ top: '4rem' }}>
                        <ListIdol />
                    </div>
                </div>
                <div className="col-10" style={{ backgroundColor: '#20202b' }}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-10 py-3">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
