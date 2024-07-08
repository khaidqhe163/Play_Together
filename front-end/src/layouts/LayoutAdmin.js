import LeftSide from "../pages/Admin/LeftSide";

const LayoutAdmin = ({ children }) => {
    return (  
        <div style={{background: '#e5e5e5'}}>
            <div style={{ background: '#e5e5e5', minHeight: '100vh', display: 'flex' }}>
                <div style={{ width: '20%', position: 'fixed', height: '100vh' }}>
                    <LeftSide/>
                </div>
                <div style={{ marginLeft: '20%', width: '80%', overflow: 'auto' }}>
                    { children }
                </div>
            </div>
        </div>
    );
}
 
export default LayoutAdmin;