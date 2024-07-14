import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Link } from 'react-router-dom';
import { baseUrl } from '../utils/service.js';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { TfiMoreAlt } from "react-icons/tfi";
import ListPlayer from './ListPlayer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getService } from '../features/serviceSlice.js';
export default function Search() {
  const dispatch = useDispatch();
  const service = useSelector(getService);
  const serviceId = service?._id;
  const [showPopUpRange, setShowPopUpRange] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    category: '',
    playerName: '',
    gameName: '',
    priceRange: [10000, 1000000]
  });

  const [listSearch, setListSearch] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const rangeSelector = (event, newValue) => {
    setFormData(prevState => ({
      ...prevState,
      priceRange: newValue
    }));
  };

  const handleClickRange = () => {
    setShowPopUpRange(!showPopUpRange);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3008/api/user/search-player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        setListSearch(data);
        setHasSearched(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='mt-0'>
        <div className='row '>
          <div className='col-md-12'>
            <div className='row my-3'>
              <div className='col-md-2'>
                <select
                  name="gender"
                  className="rounded-4 form-select border-0 text-white-50 mr-2"
                  style={{ backgroundColor: "#20202b" }}
                  aria-label="Default select example"
                  value={formData.gender}
                  onChange={onChangeData}
                >
                  <option value="">Giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div className='col-md-2'>
                <select
                  name="category"
                  className="rounded-4 form-select border-0 text-white-50 mr-2"
                  style={{ backgroundColor: "#20202b" }}
                  aria-label="Default select example"
                  value={formData.category}
                  onChange={onChangeData}
                >
                  <option value="">Thể loại</option>
                  <option value="1">Người mới</option>
                  <option value="2">Hot player</option>
                  <option value="3">Vip player</option>
                </select>
              </div>
              <div className='col-md-2'>
                <input
                  type="text"
                  name="playerName"
                  className="rounded-4 player form-control border-0 mr-2"
                  style={{ backgroundColor: "#20202b", color: "#ADADAD" }}
                  placeholder="Tên player"
                  value={formData.playerName}
                  onChange={onChangeData}
                />
              </div>
              <div className='col-md-2'>
                <input
                  type="text"
                  name="gameName"
                  className="rounded-4 player form-control border-0 mr-2"
                  style={{ backgroundColor: "#20202b", color: "#ADADAD" }}
                  placeholder="Tên game"
                  value={formData.gameName}
                  onChange={onChangeData}
                />
              </div>
              <div className='col-md-2'>
                <div className='relative h-full w-40'>
                  {formData.priceRange[0] !== 10000 || formData.priceRange[1] !== 1000000 ? (
                    <button type="button" className="rounded-4 text-white bg-bgButton h-full w-full" onClick={handleClickRange}>
                      {formData.priceRange[0].toLocaleString()} - {formData.priceRange[1].toLocaleString()}
                    </button>
                  ) : (
                    <button type="button" className="rounded-4 text-white-50 bg-bgSecondary h-full w-full" onClick={handleClickRange}>
                      Khoảng giá
                    </button>
                  )}
                  {showPopUpRange && (
                    <div className='p-4 rounded-lg text-white-50 absolute top-12 w-64 bg-bgSecondary z-10' style={{ left: "-4rem" }}>
                      <Typography id="range-slider" gutterBottom>
                        Khoảng giá:
                      </Typography>
                      <Slider
                        value={formData.priceRange}
                        min={10000}
                        max={1000000}
                        step={10000}
                        onChange={rangeSelector}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value.toLocaleString()}`}
                      />
                      {formData.priceRange[0].toLocaleString()} đến {formData.priceRange[1].toLocaleString()} VND
                    </div>
                  )}
                </div>
              </div>
              <div className='col-md-2 text-end'>
                <button className='text-white bg-bgButton h-full w-36 rounded-4 fw-medium' type='submit'>Tìm kiếm</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {hasSearched && (
        <>
          <h5 className='text-white my-4'>Kết quả tìm kiếm</h5>
          {listSearch.length > 0 ?
            <div className='row'>
              {listSearch.map(p => (
                <div className='col-md-3 mb-4'>
                  <Link className='text-decoration-none' to={`/player-profile/${p._id}`}>
                    <div className="card rounded-4 relative" style={{ boxShadow: "0px 0px 0px 0px #0000", backgroundColor: "#20202b" }}>
                      <img className="card-img-top rounded-top-4 object-cover object-center" style={{ height: "20em", aspectRatio: 1 / 1 }} src={baseUrl + p.avatar} alt="Card image cap" />
                      <div className='absolute bg-bgButton rounded-4 px-2 py-1 right-2 bottom-36'>
                        <p className='text-white m-0'>{p.player.rentCost.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 3,
                        })} đ/h</p>
                      </div>
                      <div className="card-body">
                        <h3 className="card-title text-lg text-white d-flex align-items-center">
                          {/* <Link className='text-decoration-none text-white'>{p.username}</Link> */}
                          <p className='text-decoration-none text-white mb-0'>{p.username}</p>
                          <IoIosCheckmarkCircle size={20} className='ml-1 text-bgButton' />
                          <div className="player-status ready"> </div>
                        </h3>
                        {p.player.contentStatus ? <p className="card-text text-sm mb-0" style={{ color: "#ADADAD" }}>{p.player.contentStatus}</p> : <br />}
                        <div className='d-flex align-items-center mt-3'>
                          <div className='w-50 d-flex'>
                            {p.player.serviceType.slice(0, 4).map((i, index) => (
                              <>
                                {index < 3 ? (
                                  <img src={baseUrl + i.image} className='w-6 h-6 rounded-circle mr-1' alt={`Image ${index}`} />
                                ) : (
                                  <div className='rounded-full w-7 h-7 bg-slate-700 flex justify-center items-center opacity-50'><TfiMoreAlt className='text-center' color='white' size={20} /></div>
                                )}
                              </>
                            ))}

                          </div>
                          <div className='w-50 d-flex align-items-center justify-content-end'>
                            <FaStar size={20} color='#8d68f2' /><p className='font-medium m-0' style={{ color: "#ADADAD" }}>4.8 <span>(355)</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

            </div> : <div className='row'><h5 className='text-textSecondary my-3'>Không tìm thấy kết quả phù hợp!</h5></div>}
        </>
      )}
      {service && <>
        <div className='row my-2'>
          <div className='col-md-6 d-flex items-center'>
            <div>
              <img className='rounded w-10 h-10' src={baseUrl + service.image} alt='none' />
            </div>
            <div>
              <h5 className="text-white ml-5">{service.name}</h5>
            </div>
          </div>
        </div>
        <ListPlayer url={`api/user/players-by-service/${serviceId}`} />
      </>}
      {!service && <>
      <h5 className="text-white my-4">LIST PLAYERS</h5>
      <ListPlayer />
      </>}

    </>

  );
}
