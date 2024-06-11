import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/axiosConfig';
import { format } from 'date-fns';
export default function PlayerSchedule() {

    const today = new Date();

    const [schedule, setSchedule] = useState({
        date: '',
        startTime: '',
        endTime: ''
    });
    const [scheduleUpdate, SetScheduleUpdate] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [name]: value
        }));
    };
    const fetchData = async () => {
        try {
            const s = await api.get("/api/schedule");
            setSchedules(s.data);
        } catch (error) {
            console.log(error);
            toast('Có lỗi trong việc lấy lịch!');
        }
    };
    useEffect(() => {
        fetchData();
    }, [scheduleUpdate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const s = await api.post("/api/schedule", schedule);
            if (s.status === 201) {
                toast(s.data.message);
                SetScheduleUpdate(s.data.schedules);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                toast(error.response.data.error);
            } else {
                toast('Có lỗi trong việc thiết lập thời gian Duo!');
            }
        }
        console.log("Hello");

    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            options.push({ value: hour, label: `${hour}:00` });
            options.push({ value: hour + 0.5, label: `${hour}:30` });
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    const formatTime = (time) => {
        const hours = Math.floor(time);
        const minutes = (time - hours) * 60;
        const formattedMinutes = minutes == 0 ? `0${minutes}` : minutes;
        return `${hours}:${formattedMinutes}`;
    };

    return (
        <div className="row mt-4">
            <div className='col-12'>
                <h1 className="text-white">Thiết lập lịch Duo</h1>
            </div>
            <div className='col-10 mx-auto'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Ngày duo</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={schedule.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="startTime" className="form-label">Giờ bắt đầu</label>
                            <select
                                className="form-select"
                                id="startTime"
                                name="startTime"
                                value={schedule.startTime}
                                onChange={handleChange}
                            >
                                <option value="">Chọn giờ bắt đầu</option>
                                {timeOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="endTime" className="form-label">Giờ kết thúc</label>
                            <select
                                className="form-select"
                                id="endTime"
                                name="endTime"
                                value={schedule.endTime}
                                onChange={handleChange}
                            >
                                <option value="">Chọn giờ kết thúc</option>
                                {timeOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-20">Lưu lịch</button>
                </form>
            </div>
            <div className='col-10 mx-auto'>
                <h5 className="text-white mt-16">Lịch Duo của tôi</h5>
            </div>
            <div className="mt-4 col-10 mx-auto">
                <table className="min-w-full bg-gray-800 text-white text-center">
                    <thead>
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Giờ bắt đầu</th>
                            <th className="px-6 py-3">Giờ kết thúc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((s, index) => (
                            new Date(s.date) > today && <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                                <td className="px-6 py-4">{format(new Date(s.date), 'dd-MM-yyyy')}</td>
                                <td className="px-6 py-4">{formatTime(s.start)} </td>
                                <td className="px-6 py-4">{formatTime(s.end)} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
