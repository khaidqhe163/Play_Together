import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/axiosConfig';
import { format, startOfWeek, addDays } from 'date-fns';

export default function PlayerSchedule() {
    const today = new Date();

    const [schedule, setSchedule] = useState({
        date: format(today, 'yyyy-MM-dd'),
        startTime: '',
        endTime: ''
    });
    const [scheduleUpdate, setScheduleUpdate] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            date: format(date, 'yyyy-MM-dd')
        }));
    };

    const fetchData = async (selectedDate) => {
        try {
            const s = await api.get(`/api/schedule?date=${selectedDate}`);
            setScheduleUpdate(s.data);
        } catch (error) {
            console.log(error);
            toast('Có lỗi trong việc lấy lịch!');
        }
    };

    useEffect(() => {
        fetchData(schedule.date); 
    }, [schedule.date]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const s = await api.post("/api/schedule", schedule);
            if (s.status === 201) {
                toast(s.data.message);
                fetchData(schedule.date);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                toast(error.response.data.error);
            } else {
                toast('Có lỗi trong việc thiết lập thời gian Duo!');
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/api/schedule/${id}`);
            if (response.status === 200) {
                toast('Xoá lịch thành công!');
                fetchData(schedule.date);
            }
        } catch (error) {
            console.log(error);
            toast('Có lỗi trong việc xoá lịch!');
        }
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
        const formattedMinutes = minutes === 0 ? `0${minutes}` : minutes;
        return `${hours}:${formattedMinutes}`;
    };

    const renderWeekButtons = () => {
        const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Week starts on Monday
        const buttons = [];

        for (let i = 0; i < 7; i++) {
            const currentDay = addDays(startOfWeekDate, i);
            const dayCurrent = currentDay.getDate();
            const dayToday = today.getDate();
            const isDisabled = dayCurrent < dayToday;
            buttons.push(
                <button
                    key={i}
                    type="button"
                    className={`btn btn-outline-light mx-1 my-1 ${schedule.date === format(currentDay, 'yyyy-MM-dd') ? 'active-message text-white' : ''}`}
                    onClick={() => handleDateChange(currentDay)}
                    disabled={isDisabled}
                >
                    {format(currentDay, 'dd-MM')}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="row mt-4">
            <div className='col-12'>
                <h1 className="text-white">Thiết lập lịch Duo</h1>
            </div>
            <div className='col-10 mx-auto'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Ngày duo</label>
                        <div className="d-flex">
                            {renderWeekButtons()}
                        </div>
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
                                required
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
                                required
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
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleUpdate.map((s, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                                <td className="px-6 py-4">{format(new Date(s.date), 'dd-MM-yyyy')}</td>
                                <td className="px-6 py-4">{formatTime(s.start)} </td>
                                <td className="px-6 py-4">{formatTime(s.end)} </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(s._id)}
                                    >
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
