import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export default function Search() {
  const [showPopUpRange, setShowPopUpRange] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    category: '',
    playerName: '',
    gameName: '',
    priceRange: [10000, 1000000]
  });

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  console.log(formData);

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
    console.log('Form Data:', formData);

    fetch('https://your-backend-api.com/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-md-12'>
          <div className='row'>
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
                style={{ backgroundColor: "#20202b", color:"#ADADAD" }}
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
                style={{ backgroundColor: "#20202b", color:"#ADADAD" }}
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
                  <div className='p-4 rounded-lg text-white-50 absolute top-12 w-64 bg-bgSecondary z-10' style={{left: "-4rem"}}>
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
  );
}
