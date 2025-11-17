import { useEffect } from "react";
import "../../css/WeekView.css"

export default function WeekView({ data }) {
    const days = ["Lun", "Mar", "Mer", "Gio", "Ven"];

    console.log("Data from Calendar: ", data);

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