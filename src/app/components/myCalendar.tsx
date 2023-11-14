import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // 여기에 달력 값 변경 시 처리할 로직을 추가할 수 있음
  };

  return (
    <div>
      <h1>달력 예제</h1> <Calendar
        onChange={() => {handleDateChange}}
        value={selectedDate}
      />
      <div>
        선택된 날짜: {selectedDate.toDateString()}
      </div>
    </div>
  );
}

export default MyCalendar;
