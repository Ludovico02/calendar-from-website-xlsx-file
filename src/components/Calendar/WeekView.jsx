import { useEffect, useState } from "react";
import "../../css/WeekView.css"

export default function WeekView({ data, counter }) {
    const days = ["Lun", "Mar", "Mer", "Gio", "Ven"];
    const currentDate = new Date();
    const [currentWeekView, setCurrentWeekView] = useState(Array(5).fill(0));

    // Finds first day of the week (monday) and shifts it according to the week we want to see
    const getMonday = (date, shift) => {
        date = new Date(date);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1) + shift;
        return new Date(date.setDate(diff));
    }

    const getCurrentViewWeek = (shift) => {
        const firstDay = getMonday(currentDate, shift);

        setCurrentWeekView(prev => prev.map((_, i) => {
            // const dayInMilliseconds = 24 * 60 * 60 * 1000;
            // const currentDayDate = new Date(firstDay.getTime() + (i * dayInMilliseconds));

            const currentDayDate = new Date(firstDay);
            currentDayDate.setDate(firstDay.getDate() + i);
            return `${currentDayDate.getDate()}/${currentDayDate.getMonth() + 1}`;
        }));
    }

    useEffect(() => {
        getCurrentViewWeek(counter * 7);
    }, [counter])

    useEffect(() => {
        getCurrentViewWeek(0);
    }, []);

    return (
        <div className="week-grid">
            {days.map((day, i) => (
                <div key={day} className="day-column">
                    <h3>{`${day} ${currentWeekView[i]}`}</h3>
                    <p>{data[1]?.teacher}</p>
                </div>
            ))}
        </div>
    )
}