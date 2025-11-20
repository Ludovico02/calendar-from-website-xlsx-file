import { useEffect, useState } from "react";
import { fetchTimetable } from "../api/api";

export default function ListView() {
    const [data, setData] = useState([]);
    const currentDate = new Date();

    useEffect(() => {
        async function getData() {
            const data = await fetchTimetable();
            setData(data);
        }

        getData();
    }, []);

    const removePastData = (currentDate) => {
        // how to compare different dates???
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear() % 100;
        console.log("typeof: ", typeof(currentYear));
        console.log("year: ", currentYear);
        console.log("current day: " + currentDay + " current month: " + currentMonth + " current year: " + currentYear);
        return [...data].filter((el) => {
            return el;
        });
    }

    useEffect(() => {
        removePastData(currentDate);
    }, []);

    return (
        <div className="full-list-table">
        </div>
    )
}