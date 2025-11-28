import { useState } from "react"

export default function DayView({ data }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const changeDay = (days) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + days);
        setCurrentDate(newDate);
    }

    const goToToday = () => {
        setCurrentDate(new Date());
    }

    // Format date for the title
    // I should implement this for other components as well
    const dateTitle = currentDate.toLocaleDateString('it-IT', {
        weekday: 'short', day: 'numeric', month: 'short'
    });

    

    return (
        <div></div>
    )
}
