import React from 'react'
import NavBar from './NavBar'

function DefaultNavbar({children}) {
  return (
    <div className='container-fluid d-flex flex-column vh-100 overflow-x-hidden bg-bgMain'>
            <div className='row sticky-top'>
                <div className='col-12'>
                    <NavBar />
                </div>
            </div>
            <div className='row flex-grow-1' style={{ height: "100vh", overflow: "auto" }}>
                <div className='col-10 mx-auto ' >
                    <div className='row d-flex justify-content-center'>
                        <div className='col-10 py-3 bg-bgSecondary'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default DefaultNavbar