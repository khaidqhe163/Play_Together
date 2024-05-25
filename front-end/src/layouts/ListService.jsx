import '../App.css';
import pubg from '../assets/pubg.jpg'
import gtav from '../assets/gtav.jpg'
export default function ListService() {
    const stickySidebar = {
        backgroundColor: "#20202b",
        width: "100%",
        position: "sticky",
        top: "56px",
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
    const listService = [
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: gtav,
            name: "GTA V"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
        {
            image: pubg,
            name: "PUBG Mobile"
        },
    ]
    return (
        <div className='row d-flex flex-column py-2' style={stickySidebar}>
            <div style={{ height: "6%" }}>
                <p style={headingStyle}>Danh mục game</p>
            </div>

            <div className='p-0 overflow-x-hidden scrollbar' style={{ height: "94%" }}>
                <ul className="w-100 d-flex flex-column" style={listStyle}>
                    {listService.map(s => (
                        <li className="list-item">
                            <div className="media d-flex align-items-center">
                                <div className="mediaL text-left" style={{ marginRight: "10px" }}>
                                    <img className='rounded' src={s.image} width={"35px"} />
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
