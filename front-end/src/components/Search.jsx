import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
export default function Search() {
  const [showPopUpRange, setShowPopUpRange] = useState(false);
  const [value, setValue] = useState([10000, 1000000]);

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const handleClickRange = () => {
    setShowPopUpRange(!showPopUpRange);
  };

  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='row'>
          <div className='col-md-2'>
            <select className="rounded-4 form-select border-0 text-white-50 mr-2" style={{ backgroundColor: "#20202b" }} aria-label="Default select example">
              <option selected>Giới tính</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className='col-md-2'>
            <select className="rounded-4 form-select border-0 text-white-50 mr-2" style={{ backgroundColor: "#20202b" }} aria-label="Default select example">
              <option selected>Thể loại</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className='col-md-2'>
            <input type="text" className="rounded-4 player form-control border-0 mr-2" style={{ backgroundColor: "#20202b", color:"#ADADAD" }} placeholder="Tên player"></input>
          </div>
          <div className='col-md-2'>
            <input type="text" className="rounded-4 player form-control border-0 mr-2" style={{ backgroundColor: "#20202b", color:"#ADADAD" }} placeholder="Tên game"></input>
          </div>
          <div className='col-md-2'>
            <div className='relative h-full w-40'>
            {value[0]!==10000 || value[1]!==1000000 ? <button type="button" className="rounded-4 text-white bg-bgButton h-full w-full" onClick={handleClickRange}>{value[0]} - {value[1]}</button>: <button type="button" className="rounded-4 text-white-50 bg-bgSecondary h-full w-full" onClick={handleClickRange}>Khoảng giá</button>}
              {showPopUpRange && (
                <div className='p-4 rounded-lg text-white-50 absolute top-12 w-64 bg-bgSecondary z-10' style={{left: "-4rem"}}>
                  <Typography id="range-slider" gutterBottom>
                    Khoảng giá:
                  </Typography>
                  <Slider
                    value={value}
                    min={10000}
                    max={1000000}
                    step={10000}
                    onChange={rangeSelector}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value.toLocaleString()}`}
                  />
                  {value[0].toLocaleString()} đến {value[1].toLocaleString()} VND
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
  );
}
