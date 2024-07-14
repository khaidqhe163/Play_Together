import { Button, Divider, Radio, Tabs } from "antd";
import { RankingComponent } from "./styled";
import { useEffect, useState } from "react";
import TabPane from "antd/es/tabs/TabPane";
import CustomModal from "../CustomModal"
import './style.css'
import axios from 'axios'
import { baseUrl } from "../../../utils/service";

const RankingModal = ({open, onCancel}) => {
    const [title, setTitle] = useState('Bảng xếp hạng đại gia')
    const [activeTab, setActiveTab] = useState('week')
    const [topDonates, setTopDonates] = useState([])
    const [topBooking, setTopBooking] = useState([])


    const handleModeChange = (e) => {
        setTitle(e.target.value);
    };
    
    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const getTopDonate = async () => {
        try {
            if(title === 'Bảng xếp hạng Donate') {
                const res = await axios.get(`http://localhost:3008/api/donate/top-donors/` + activeTab );
                setTopDonates(res?.data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getTopBooking = async () => {
        try {
            if(title === 'Bảng xếp hạng đại gia') {
                const res = await axios.get(`http://localhost:3008/api/booking/top-bookers/` + activeTab );
                setTopBooking(res?.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    console.log(topDonates);

    useEffect(() => {
        getTopDonate()
        getTopBooking()
    }, [activeTab, title])

    return (  
       <div style={{zIndex: '1000'}}>
            <CustomModal
                // title="Story"
                open={!!open}
                onCancel={onCancel}
                width={600}
                footer={null}
            >
            <RankingComponent>
                <div className="title">
                    {title}
                </div>
                <Divider style={{marginBottom: '10px', marginTop: '10px'}}/>

                <div>
                    <Tabs tabPosition="top" activeKey={activeTab} onChange={handleTabChange} className="customer-tabs" centered>
                        <TabPane tab={<span className="fs-15" style={activeTab==="week" ? {color: '#000'} : {color: '#a3a3a3'}}>7 ngày qua</span>} key="week"> </TabPane>
                        <TabPane tab={<span className="fs-15" style={activeTab==="month" ? {color: '#000'} : {color: '#a3a3a3'}}>30 ngày qua</span>} key="month"> </TabPane>
                    </Tabs>
                </div>

                {
                   title === 'Bảng xếp hạng đại gia' 
                   ? topBooking.length === 0 
                        ? <div className="text-center mt-30 mb-50" style={{fontSize: '20px', fontWeight: '700'}}> Không có dữ liệu </div> 
                        : (<>
                                <div className="top1 d-flex flex-column align-items-center">
                                    <div className="image-container"> 
                                        <img className="foreground-img" src={baseUrl + topBooking[0]?.user?.avatar} alt="avt"/>
                                        <img className="background-img" src="https://files.playerduo.net/production/static-files/no1_top_list.png" alt="bg"/>
                                    </div>
                                    <div style={{color: '#f0564a'}} className="fw-600"> {topBooking[0]?.user?.username} </div>
                                    <div style={{color: 'orange'}} className="fw-600"> {topBooking[0]?.totalBookings} </div>
                                </div>
                                <Divider style={{fontWeight: '700'}}/>

                                <div className="other mb-40">
                                    {
                                        topBooking.slice(1).map((booking, index) => (
                                            <div className="d-flex justify-content-around align-content-center">
                                                <div style={{fontSize: '25px', fontWeight: '700', color: 'red', alignItems: 'center'}} className="ml-10 mt-20">
                                                    Top {index+2}
                                                </div>
                                                <div key={index} className="d-flex flex-column align-items-center">
                                                    <div className="image-container"> 
                                                        <img className="foreground-img" src={baseUrl + booking?.user?.avatar} alt="avt"/>
                                                        <img className="background-img" src="https://files.playerduo.net/production/static-files/no1_top_list.png" alt="bg"/>
                                                    </div>
                                                    <div style={{color: '#f0564a'}} className="fw-600"> {booking?.user?.username} </div>
                                                    <div style={{color: 'orange'}} className="fw-600"> {booking?.totalBookings} </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>) 
                   : topDonates.length === 0 
                        ? <div className="text-center mt-30 mb-50" style={{fontSize: '20px', fontWeight: '700'}}> Không có dữ liệu </div> 
                        : (<>
                            <div className="top1 d-flex flex-column align-items-center">
                                <div className="image-container"> 
                                    <img className="foreground-img" src={baseUrl + topDonates[0]?.user?.avatar} alt="avt"/>
                                    <img className="background-img" src="https://files.playerduo.net/production/static-files/no1_top_list.png" alt="bg"/>
                                </div>
                                <div style={{color: '#f0564a'}} className="fw-600"> {topDonates[0]?.user?.username} </div>
                                <div style={{color: 'orange'}} className="fw-600"> {topDonates[0]?.totalMoney} </div>
                            </div>
                            <Divider style={{fontWeight: '700'}}/>

                            <div className="other mb-40">
                                {
                                    topDonates.slice(1).map((donate, index) => (
                                        <div className="d-flex justify-content-around align-content-center">
                                            <div style={{fontSize: '25px', fontWeight: '700', color: 'red', alignItems: 'center'}} className="ml-10 mt-20">
                                                Top {index+2}
                                            </div>
                                            <div key={index} className="d-flex flex-column align-items-center">
                                                <div className="image-container"> 
                                                    <img className="foreground-img" src={baseUrl + donate?.user?.avatar} alt="avt"/>
                                                    <img className="background-img" src="https://files.playerduo.net/production/static-files/no1_top_list.png" alt="bg"/>
                                                </div>
                                                <div style={{color: '#f0564a'}} className="fw-600"> {donate?.user?.username} </div>
                                                <div style={{color: 'orange'}} className="fw-600"> {donate?.totalMoney} </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>)
                   
                }
                

                <Radio.Group
                    onChange={handleModeChange}
                    value={title}
                    style={{
                        marginBottom: 8,
                    }}
                    className="d-flex justify-content-space-evenly"
                >
                    <Radio.Button style={title==='daigia' ? {width: '280px', backgroundColor: '#f0564a'} : {width: '280px'}} value="Bảng xếp hạng đại gia">Bảng xếp hạng đại gia</Radio.Button>
                    <Radio.Button style={{width: '280px'}} value="Bảng xếp hạng Donate">Bảng xếp hạng Donate</Radio.Button>
                </Radio.Group>
            </RankingComponent>
            </CustomModal>
        </div>
    );
}
 
export default RankingModal;