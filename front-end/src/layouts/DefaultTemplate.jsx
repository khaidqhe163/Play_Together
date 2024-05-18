import ListService from './ListService';
import NavBar from './NavBar';

export default function DefaultTemplate({ children }) {
    return (
        <div className='container-fluid d-flex flex-column vh-100 overflow-x-hidden' style={{ backgroundColor: "#13131a" }}>
            <div className='row sticky-top'>
                <div className='col-12'>
                    <NavBar />
                </div>
            </div>
            <div className='row flex-grow-1'>
                <div className='col-2 position-relative'>
                    <ListService />
                </div>
                <div className='col-10'>
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
