import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { baseUrl } from '../utils/service.js'
import { getService, setService } from '../features/serviceSlice.js';
export default function ListService() {
    const dispatch = useDispatch();
    const service = useSelector(getService);
    const stickySidebar = {
        backgroundColor: "#20202b",
        width: "100%",
        position: "sticky",
        top: "0px",
        height: "calc(100vh - 70px)",

    };
    const headingStyle = {
        color: "#bcbcbc",
        margin: "0",
        padding: "10px 0",
    };
    const listStyle = {
        listStyleType: "none",
        padding: "0",
        margin: "0",
        color: "#cccbcc",
    };

    const [listService, setListService] = useState([]);
    const fetchApiService = async () => {
        try {
            const response = await fetch(baseUrl + 'api/service');
            const data = await response.json();
            setListService(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchApiService();
    }, []);
    // console.log(`serviceId: ${service._id}`);
    const handleClickService = (s) => {
        if (service) {
            const checked = service._id === s._id;
            if (checked) {
                dispatch(setService(null));
            } else {
                dispatch(setService(s));
            }
        } else {
            dispatch(setService(s));
        }
        // dispatch(setService(s));
    };



    return (
        <div className='row d-flex flex-column py-2' style={stickySidebar}>
            <div style={{ height: "6%" }}>
                <p style={headingStyle}>Danh mục game</p>
            </div>

            <div className='p-0 overflow-x-hidden scrollbar' style={{ height: "94%" }}>
                <ul className="w-100 d-flex flex-column" style={listStyle}>
                    {listService.map(s => (
                        <li className={service && service._id === s._id ? "list-item bg-bgButton text-white cursor-default" : "list-item cursor-pointer active:scale-90 transition-all"} key={s._id} onClick={() => handleClickService(s)}>
                            <div className="media d-flex align-items-center">
                                <div className="mediaL text-left" style={{ marginRight: "10px" }}>
                                    <img className='rounded' src={baseUrl + s.image} width={"35px"} alt='none' />
                                </div>
                                <div className='mediaM'>
                                    <p className='text-center my-auto'>{s.name}</p>
                                </div>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>


        </div>
    );
};
