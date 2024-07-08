import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PiRight from './PiRight';
import { formatDate } from '../../utils/service';
function Achivement({ player, setOpenHire }) {
    const renderTooltip = (props, content) => (
        <Tooltip id="button-tooltip" {...props}>
            {content}
        </Tooltip>
    );
    return (
        <div className='player-infor-container'>
            <div className='pi-left pi'>
                <h5 style={{ color: "white", fontWeight: "bold", textAlign: "left", marginLeft: "10px" }}>Thành tựu</h5>
                {
                    player?.player?.achivements?.map((a) => {
                        return (
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={(props) => renderTooltip(props, formatDate(a?.date))}
                            >
                                <div className='text-white mt-20'
                                    style={{
                                        width: "90%",
                                        margin: "auto",
                                        padding: "10px",
                                        border: "2px solid",
                                        borderImage: "linear-gradient(90deg, #c78945, #edc98b) 1",
                                        borderRadius: "15px"
                                    }}>
                                    <p style={{ fontWeight: "500", margin: "0", color: "#edc98b" }}>{a?.text}</p>
                                </div>
                            </OverlayTrigger>
                        )
                    })
                }
            </div >
            <div className='pi-middle pi'>
                <h5>Chi tiết</h5>
                <div className='d-flex profile-amount justify-content-around'>
                    <div>
                        <p>Người đăng ký</p>
                        <p className='amounts'>298</p>
                    </div>
                    <div>
                        <p>Số giờ thuê</p>
                        <p className='amounts'>{player?.player?.totalHiredHour}</p>
                    </div>
                    <div>
                        <p>Tỉ lệ hoàn thành</p>
                        <p className='amounts'>298</p>
                    </div>
                </div>
                <h5 className='mt-20'>Giới thiệu</h5>
                <p style={{ color: "#adadbf", whiteSpace: "pre-line" }}>{player?.player?.info}</p>
                <h5 className='mt-20'>Mạng xã hội</h5>
                <div className='social-media'>
                    {
                        player.player?.facebookUrl !== "" && (
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={(props) => renderTooltip(props, player?.player?.facebookUrl)}
                            >
                                <Link to={player?.player?.facebookUrl} target="_blank" rel="noopener noreferrer"> <button><FaFacebook style={{ margin: 'auto' }} /></button></Link>
                            </OverlayTrigger>
                        )
                    }
                    {
                        player.player?.youtubeUrl !== "" && (

                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={(props) => renderTooltip(props, player?.player?.youtubeUrl)}
                            >
                                <Link to={player?.player?.youtubeUrl} target="_blank" rel="noopener noreferrer"> <button><FaYoutube style={{ margin: 'auto' }} /></button></Link>
                            </OverlayTrigger>
                        )
                    }


                </div>
            </div>
            <PiRight id={player?._id} setOpenHire={setOpenHire} player={player} />
        </div >
    )
}

export default Achivement
