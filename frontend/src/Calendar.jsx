import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import './Calendar.css';

const Avatar = ({ src, alt }) => (
    <div className="avatar">
        <img src={src} alt={alt} />
    </div>
);

const MeetingDetails = () => (
    <div className="meeting-details">
        <div className="detail-item">
            <span className="icon">⏱️</span>
            <span>30m</span>
        </div>
        <div className="detail-item">
            <span className="icon">🎥</span>
            <span>Zoom Video</span>
        </div>
        <div className="detail-item">
            <span className="icon">🌏</span>
            <span>Asia/Kathmandu</span>
        </div>
    </div>
);

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [bookingMessage, setBookingMessage] = useState("");
    const [bookingMessageType, setBookingMessageType] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        email: "",
    });
    const [emailError, setEmailError] = useState("");

    const today = moment().format('YYYY-MM-DD');
    const now = moment();

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/available-slots/');
                if (Array.isArray(response.data)) {
                    setAvailableSlots(response.data);
                } else {
                    setAvailableSlots([]);
                }
            } catch (error) {
                setAvailableSlots([]);
            }
        };
        fetchSlots();
    }, []);

    const handleTimeSlotClick = (time) => {
        if (selectedDate && availableSlots.some(slot => slot.date === selectedDate && slot.time === time && !slot.is_booked)) {
            setSelectedTimeSlot(time);
            setBookingMessage("");
        } else {
            setBookingMessage("Please select an available date to book a time slot.");
            setBookingMessageType("error");
        }
    };

    const handleConfirmBooking = async () => {
        if (emailError || !formData.email) {
            setBookingMessage("Please enter a valid email to confirm booking.");
            setBookingMessageType("error");
            return;
        }

        if (selectedDate && selectedTimeSlot) {
            const slot = availableSlots.find(slot => slot.date === selectedDate && slot.time === selectedTimeSlot);
            if (slot) {
                try {
                    const response = await axios.post('http://localhost:8000/api/bookings/create_booking/', {
                        slot: slot.id,
                        name: formData.name,
                        country: formData.country,
                        email: formData.email,
                    });
                    setBookingMessage(`You have successfully booked a meeting on ${moment(selectedDate).format('MMMM D, YYYY')} at ${selectedTimeSlot}.`);
                    setBookingMessageType("success");
                    setAvailableSlots(availableSlots.map(s => s.id === slot.id ? { ...s, is_booked: true } : s));
                } catch (error) {
                    if (error.response) {
                        setBookingMessage(`Error: ${error.response.data.error}`);
                    } else if (error.request) {
                        setBookingMessage('Error: No response from server. Please try again later.');
                    } else {
                        setBookingMessage(`Error: ${error.message}`);
                    }
                    setBookingMessageType("unsuccessful");
                }
            }
        } else {
            setBookingMessage("Please select a date and time slot to confirm booking.");
            setBookingMessageType("error");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "email") {
            checkEmail(value);
        }
    };

    const checkEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format.");
            return;
        }
        setEmailError("");
    };

    const renderCalendarDays = () => {
        const daysInMonth = moment(currentDate).daysInMonth();
        const firstDayOfMonth = moment(currentDate).startOf('month').day();
        const calendarDays = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty-space"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = moment(currentDate).date(day).format('YYYY-MM-DD');
            const isToday = date === today;
            const isPast = moment(date).isBefore(today);
            const isAvailable = availableSlots.some(slot => slot.date === date && !slot.is_booked);
            calendarDays.push(
                <div
                    key={day}
                    className={`calendar-day ${selectedDate === date ? 'selected' : ''} ${isToday ? 'today' : ''} ${isPast ? 'past' : ''} ${isAvailable ? 'available' : 'unavailable'}`}
                    onClick={() => !isPast && isAvailable && setSelectedDate(date)}
                >
                    {day}
                    {isToday && <div className="dot"></div>}
                </div>
            );
        }

        return calendarDays;
    };

    const handleNavigate = (direction) => {
        setCurrentDate(moment(currentDate).add(direction, 'months').toDate());
    };

    const selectedDateString = selectedDate ? moment(selectedDate).format('MMMM D, YYYY') : '';

    return (
        <div className="calendar-container">
            <aside className="left-panel">
                <div className="meeting-info">
                    <Avatar src="/images/suraj.jpg" alt="Saksham Gaur's profile picture" />
                    <h2>Suraj Karki</h2>
                    <h3>30 Min Meeting</h3>
                    <MeetingDetails />
                </div>
            </aside>

            <main className="center-panel">
                <header className="calendar-header">
                    <h2>{moment(currentDate).format('MMMM YYYY')}</h2>
                    <div className="calendar-nav">
                        <button className="nav-btn" onClick={() => handleNavigate(-1)}>←</button>
                        <button className="nav-btn" onClick={() => handleNavigate(1)}>→</button>
                    </div>
                </header>

                <section className="calendar-weekdays">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                        <div key={day} className="weekday">
                            {day}
                        </div>
                    ))}
                </section>

                <section className="calendar-grid">
                    {renderCalendarDays()}
                </section>
            </main>

            <aside className="right-panel">
                <div className="time-header">
                    <div className="current-date">{selectedDateString}</div>
                </div>

                <section className="time-slots">
                    {selectedDate && availableSlots.filter(slot => slot.date === selectedDate).map((slot, index) => {
                        const slotTime = moment(`${slot.date} ${slot.time}`, 'YYYY-MM-DD HH:mm');
                        const isPastTime = slotTime.isBefore(now);
                        return (
                            <button
                                key={index}
                                className={`time-slot ${!slot.is_booked && !isPastTime ? (selectedTimeSlot === slot.time ? 'selected' : 'available') : 'unavailable'}`}
                                onClick={() => handleTimeSlotClick(slot.time)}
                                disabled={slot.is_booked || isPastTime}
                            >
                                {slot.time}
                            </button>
                        );
                    }) || <div>Please select a date</div>}
                </section>

                <form className="booking-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        id="country-select"
                    >
                        <option value="">Select Country</option>
                        {["USA", "Canada", "UK", "Australia", "India"].map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </form>
                <button className="confirm-booking-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
                {bookingMessage && (
                    <div className={bookingMessageType === "success" ? "booking-message" : "unsuccessful-message"}>
                        {bookingMessage}
                    </div>
                )}
            </aside>
        </div>
    );
};

export default Calendar;