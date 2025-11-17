import { useEffect, useState } from "react";
import { fetchTimetable } from "../../api/api";
import WeekView from "./WeekView";

export default function Calendar() {
    const [view, setView] = useState("week");
    const [data, setData] = useState([]);
    const [viewCounter, setViewCounter] = useState(0); // 0 is the current week

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

    useEffect(() => {
        console.log(viewCounter);
    }, [viewCounter]);

    return (
        <div>
            <div>
                <button onClick={() => setViewCounter(viewCounter - 1)} disabled={viewCounter <= 0}>decrease</button>
                <button onClick={() => setViewCounter(viewCounter + 1)} disabled={viewCounter >= 52}>increase</button>
                <button onClick={() => setViewCounter(0)}>go to zero</button>
            </div>
            <div>
                <button onClick={() => setView("week")}>Settimana</button>
                {/* <button onClick={() => setView("month")}>Mese</button> */}
            </div>
            
            {view === "week" ? (
                <WeekView data={data} counter={viewCounter} />
            ) : (
                <MonthView />
            )}
        </div>
    )
}