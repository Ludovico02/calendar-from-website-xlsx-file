import { useMemo, useState } from "react"
import parseDateString, { isSameDate } from "../../utils/datesUtilities";
import LectureCard from "../LectureCard";
import "../../css/DayView.css";
import LectureModal from "../LectureModal";

const START_HOUR = 8;
const END_HOUR = 18;
const PIXELS_PER_HOUR = 60;

export default function DayView({ data }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedLecture, setSelectedLecture] = useState(null);

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

    const filteredData = useMemo(() => {
        // Right now I'm assuming that the data is already in order of starting time, it should be anyways
        const todayEvents = data.filter(el => isSameDate(currentDate, parseDateString(el.day)));
        console.log(todayEvents);

        return todayEvents.map(el => {
            const start = Number(el.start);
            const end = Number(el.end);
            const duration = end - start;
            const topPosition = (start - START_HOUR) * PIXELS_PER_HOUR;
            const height = duration * PIXELS_PER_HOUR;

            return {
                ...el,
                style: { top: `${topPosition}px`, height: `${height}px` }
            }
        });

    }, [data, currentDate]);

    const hoursGrid = Array(END_HOUR - START_HOUR + 1).fill(0).map((_, i) => (START_HOUR + i));

    return (
        <div>
            <div className="day-view">
                <header>
                    <div className="icon">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 32 32"
                            width={32} height={32}
                        >
                            <path 
                                d="M22.5 3H21V2a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1h-4V2a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1H7V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v1H2.5A1.5 1.5 0 0 0 1 4.5v18A1.5 1.5 0 0 0 2.5 24h20a1.5 1.5 0 0 0 1.5-1.5v-18A1.5 1.5 0 0 0 22.5 3zM19 2h1v3h-1zm-7 0h1v3h-1zM5 2h1v3H5zM2.5 4H4v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4h4v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4h4v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4h1.5a.5.5 0 0 1 .5.5V8H2V4.5a.5.5 0 0 1 .5-.5zm20 19h-20a.5.5 0 0 1-.5-.5V9h21v13.5a.5.5 0 0 1-.5.5z" 
                                style={{ fill:"#1b16b5ff" }}
                            />
                        </svg>
                    </div>
                    <h2 onClick={goToToday}>{dateTitle}</h2>

                    {/* Show the number of lectures that day */}
                    <p>{`${filteredData.length} Lezioni`}</p>

                    <div className="nav-buttons">
                        <button onClick={() => changeDay(-1)}>&lt;</button>
                        <button onClick={() => changeDay(1)}>&gt;</button>
                    </div>
                </header>
                <div 
                    className="calendar"
                    style={{"--start-hour": 8, "--end-hour": 18, " --resolution": 2}}
                >
                    <div className="calendar-hours-grid">
                        {hoursGrid.map((hour, i) => (
                            <div key={hour + i} className="calendar-hour">
                                <p className="label">{hour.toString().length === 2 ? hour : "0" + hour.toString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="calendar-events-grid">
                        {filteredData.map((el, i) => (
                            <div key={el.day + i} className="calendar-event">
                                <LectureCard data={el} onClick={() => setSelectedLecture(el)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedLecture && <LectureModal data={selectedLecture} onClose={() => setSelectedLecture(null)} />}
        </div>
    )
}
