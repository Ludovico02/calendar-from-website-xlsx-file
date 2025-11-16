import { useState } from "react";
import WeekView from "./WeekView";

export default function Calendar() {
    const [view, setView] = useState("week");

    return (
        <div>
            <div>
                <button onClick={() => setView("week")}>Settimana</button>
                <button onClick={() => setView("month")}>Mese</button>
            </div>
            
            {view === "week" ? (
                <WeekView />
            ) : (
                <MonthView />
            )}
        </div>
    )
}