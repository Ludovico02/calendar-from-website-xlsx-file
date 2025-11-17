import { useEffect } from "react";
import "../../css/WeekView.css"

export default function WeekView({ data }) {
    const days = ["Lun", "Mar", "Mer", "Gio", "Ven"];

    console.log("Data from Calendar: ", data);

    const getMonday = (date) => {
        date = new Date(date);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    return (
        <div className="week-grid">
            {days.map(day => (
                <div key={day} className="day-column">
                    <h3>{day}</h3>
                    <p>{data[1]?.teacher}</p>
                </div>
            ))}
        </div>
    )
}