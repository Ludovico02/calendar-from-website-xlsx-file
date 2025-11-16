import { useEffect, useState } from "react";
import { scrape } from "../../api/scrape";
import WeekView from "./WeekView";

export default function Calendar() {
    const [view, setView] = useState("week");
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchTimetable() {
            const response = await fetch();
            const data = await response.json();
            setData(data);
        }

        fetchTimetable();
    }, [])

    return (
        <div>
            <div>
                <button onClick={() => setView("week")}>Settimana</button>
                <button onClick={() => setView("month")}>Mese</button>
            </div>
            
            {view === "week" ? (
                <WeekView data={data} />
            ) : (
                <MonthView />
            )}
        </div>
    )
}