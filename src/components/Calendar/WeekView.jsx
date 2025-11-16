import "../../css/WeekView.css"

export default function WeekView({ data }) {
    const days = ["Lun", "Mar", "Mer", "Gio", "Ven"];

    return (
        <div className="week-grid">
            {days.map(day => (
                <div key={day} className="day-column">
                    <h3>{day}</h3>
                    {}
                </div>
            ))}
        </div>
    )
}