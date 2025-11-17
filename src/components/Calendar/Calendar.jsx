import { useEffect, useState } from "react";
import { fetchTimetable } from "../../api/api";
import WeekView from "./WeekView";

export default function Calendar() {
    const [view, setView] = useState("week");
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const data = await fetchTimetable();
            setData(data);
        }

        getData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

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