import { useEffect, useState } from "react";
import "../../css/WeekView.css"

export default function WeekView({ data, counter }) {
    const days = ["Lun", "Mar", "Mer", "Gio", "Ven"];
    const currentDate = new Date();
    const [currentViewWeek, setCurrentViewWeek] = useState(Array(5).fill(0));

    // Finds first day of the week (monday) and shifts it according to the week we want to see
    const getMonday = (date, shift) => {
        date = new Date(date);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1) + shift;
        return new Date(date.setDate(diff));
    }

    const getCurrentViewWeek = (shift) => {
        const firstDay = getMonday(currentDate, shift).getDate();
        
        setCurrentViewWeek(prev => (
            prev.map((_, i) => firstDay + i)
        ));

        console.log(currentViewWeek);
    }

    useEffect(() => {
        getCurrentViewWeek(counter * 7);
    }, [counter])

    return (
        <div className="week-grid">
            {days.map((day, i) => (
                <div key={day} className="day-column">
                    <h3>{`${day} ${currentViewWeek[i]}`}</h3>
                    <p>{data[1]?.teacher}</p>
                </div>
            ))}
        </div>
    )
}