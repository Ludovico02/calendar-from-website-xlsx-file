import { useEffect, useState } from "react";
import { fetchTimetable } from "../../api/api";
import WeekView from "./WeekView";
import DayView from "./DayView";

export default function Calendar({ onReturnHome }) {
    const [view, setView] = useState("day");
    const [data, setData] = useState([]);
    const [viewCounter, setViewCounter] = useState(0); // 0 is the current week

    useEffect(() => {
        async function getData() {
            const data = await fetchTimetable();
            setData(data);
        }

        getData();
    }, []);

    return (
        <div>
            {/* <div>
                <button onClick={() => setViewCounter(viewCounter - 1)} disabled={viewCounter <= 0}>decrease</button>
                <button onClick={() => setViewCounter(viewCounter + 1)} disabled={viewCounter >= 52}>increase</button>
                <button onClick={() => setViewCounter(0)}>go to zero</button>
                <button onClick={onReturnHome}>Home</button>
            </div>
            <div>
                <button onClick={() => setView("week")}>Settimana</button>
                <button onClick={() => setView("day")}>Giorno</button>
                {/* <button onClick={() => setView("month")}>Mese</button> }
            </div> /*}
            
            {/* {view === "week" ? (
                <WeekView data={data} counter={viewCounter} />
            ) : (
                view === "month" ? (<MonthView />) : (<DayView data={data} />)
            )} */}

            <DayView data={data} />
        </div>
    )
}