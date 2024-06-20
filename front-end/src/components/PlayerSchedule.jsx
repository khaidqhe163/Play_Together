import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/axiosConfig';
import { format, startOfWeek, addDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInformation, userInfor } from '../features/userSlice';
import axios from '../utils/axiosConfig';


export default function PlayerSchedule() {
    const dispatch = useDispatch();
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


    const [isOnlySchedule, setOnlySchedule] = useState(false);
    const userInfo = useSelector(userInfor);

    useEffect(() => {
        if (userInfo && userInfo.player && userInfo.player.onlySchedule) {
            setOnlySchedule(userInfo.player.onlySchedule);
        }
    }, [userInfo]);

    const toggleDuo = async () => {
        const newIsOnlySchedule = !isOnlySchedule;
        setOnlySchedule(newIsOnlySchedule);
        await handleUpdate(newIsOnlySchedule);
    };

    const handleUpdate = async (newIsOnlySchedule) => {
        try {
            const response = await axios.put('/api/user/update-only-schedule', { isOnlySchedule: newIsOnlySchedule });
            console.log('Duo setting updated:', response.data);
            dispatch(setUserInformation(response.data));
        } catch (error) {
            console.error('Error updating Duo setting:', error);
        }
    };


    return (
        <div className="row mt-4">
            <div className='col-12'>
                <h1 className="text-white">Thiết lập lịch Duo</h1>
            </div>
            <div className='col-10 mx-auto'>
                <div className="my-4 flex items-center">
                    <h4 className="text-white mr-4">Bạn muốn thiết lập lịch Duo: </h4>
                    <label className="inline-flex items-center cursor-pointer ml-5">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isOnlySchedule}
                            onChange={toggleDuo}
                            value={isOnlySchedule}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {isOnlySchedule ? "Bật" : "Tắt"}
                        </span>
                    </label>
                </div>
            </div>
            {isOnlySchedule&&(<><div className='col-10 mx-auto'>
                <form onSubmit={handleSubmit} className='mt-14'>
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
            </div></>)}
        </div>
    );
}
