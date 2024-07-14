import { Button, Divider, Radio, Tabs } from "antd";
import { RankingComponent } from "./styled";
import { useState } from "react";
import TabPane from "antd/es/tabs/TabPane";
import CustomModal from "../CustomModal"
import './style.css'

const RankingModal = ({open, onCancel}) => {
    const [title, setTitle] = useState('Bảng xếp hạng đại gia')
    const [activeTab, setActiveTab] = useState('homnay')


    const handleModeChange = (e) => {
        setTitle(e.target.value);
    };
    
    const handleTabChange = (key) => {
        setActiveTab(key);
    };

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
                        <TabPane tab={<span className="fs-15" style={activeTab==="homnay" ? {color: '#000'} : {color: '#a3a3a3'}}>Hôm nay</span>} key="homnay"> </TabPane>
                        <TabPane tab={<span className="fs-15" style={activeTab==="7ngay" ? {color: '#000'} : {color: '#a3a3a3'}}>7 ngày qua</span>} key="7ngay"> </TabPane>
                        <TabPane tab={<span className="fs-15" style={activeTab==="30ngay" ? {color: '#000'} : {color: '#a3a3a3'}}>30 ngày qua</span>} key="30ngay"> </TabPane>
                    </Tabs>
                </div>

                <div className="top1 d-flex flex-column align-items-center">
                    <div className="image-container"> 
                        <img className="foreground-img" src="https://playerduo.net/api/upload-service/images/1e9934a2-2581-4f09-b24e-9f790b38127a__86ae6290-bfd8-11ed-a19f-23a3b10d190e__page_avatar.jpg" alt="avt"/>
                        <img className="background-img" src="https://files.playerduo.net/production/static-files/no1_top_list.png" alt="bg"/>
                    </div>
                    <div style={{color: '#f0564a'}} className="fw-600"> Linh </div>
                    <div style={{color: 'orange'}} className="fw-600"> 10,000,000đ </div>
                </div>
                <Divider style={{fontWeight: '700'}}/>

                <div className="other">
                    {
                            
                    }
                </div>

                <Radio.Group
                    onChange={handleModeChange}
                    value={title}
                    style={{
                        marginBottom: 8,
                    }}
                    className="d-flex justify-content-space-evenly"
                >
                    <Radio.Button style={title==='daigia' ? {width: '280px', backgroundColor: '#f0564a'} : {width: '280px'}} value="Bảng xếp hạng đại gia">Bảng xếp hạng đại gia</Radio.Button>
                    <Radio.Button style={{width: '280px'}} value="Bảng xếp hạng thu nhập">Bảng xếp hạng thu nhập</Radio.Button>
                </Radio.Group>
            </RankingComponent>
            </CustomModal>
        </div>
    );
}
 
export default RankingModal;