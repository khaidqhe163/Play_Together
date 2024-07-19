import ListService from './ListService';
import NavBar from './NavBar';
import { Bounce, ToastContainer } from 'react-toastify';

export default function DefaultTemplate({ children }) {
    return (
        <div className='container-fluid d-flex flex-column vh-100 overflow-x-hidden bg-bgMain'>
            <div className='row sticky-top'>
                <div className='col-12'>
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
            <div className='row flex-grow-1' style={{ height: "100vh", overflow: "auto" }}>
                <div className='col-2 position-relative'>
                    <ListService />
                </div>
                <div className='col-10' >
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
