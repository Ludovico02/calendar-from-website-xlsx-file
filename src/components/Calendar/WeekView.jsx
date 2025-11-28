import { useEffect, useMemo, useState } from "react";
import "../../css/WeekView.css"
import parseDateString, { getMonday } from "../../utils/datesUtilities";
import LectureCard from "../LectureCard";
import LectureModal from "../LectureModal";

export default function WeekView({ data, counter }) {
    const days = ["Lun", "Mar", "Mer", "Gio", "Ven"];
    const currentDate = new Date();
    const [currentWeekView, setCurrentWeekView] = useState(Array(5).fill(new Date()));
    const [selectedLecture, setSelectedLecture] = useState(null);

    const getCurrentViewWeek = (shift) => {
        const firstDay = getMonday(currentDate, shift);

        setCurrentWeekView(prev => prev.map((_, i) => {
            // const dayInMilliseconds = 24 * 60 * 60 * 1000;
            // const currentDayDate = new Date(firstDay.getTime() + (i * dayInMilliseconds));

            const currentDayDate = new Date(firstDay);
            currentDayDate.setDate(firstDay.getDate() + i);
            currentDayDate.setHours(0, 0, 0, 0);
            // return `${currentDayDate.getDate()}/${currentDayDate.getMonth() + 1}`;
            return currentDayDate;
        }));
    }

    const filteredData = useMemo(() => {
        return currentWeekView.map((currentDayOfTheWeek) => (
            data.filter((el) => {
                const parsedDate = new Date(parseDateString(el.day));
                parsedDate.setHours(0, 0, 0, 0);
                
                return parsedDate.getTime() === currentDayOfTheWeek.getTime();
            })
        ));
    }, [data, currentWeekView]);

    useEffect(() => {
        getCurrentViewWeek(counter * 7);
    }, [counter]);

    return (
        <div>
            <div className="week-grid">
                <div className="hours-from-9-to-18">
                    <h3>Time</h3>
                    {[...Array(10)].map((_, i) => (
                        <p key={i + 9} className="hour-number">{i + 9}</p>
                    ))}
                </div>
                {days.map((day, i) => (
                    <div key={day + i} className="day-column">
                        <h3>{`${day} ${currentWeekView[i].getDate()}/${currentWeekView[i].getMonth()}`}</h3>
                        <div className="display-lecture">
                            {filteredData[i].map((el, i) => (
                                <LectureCard key={i + el.day} data={el} onClick={() => setSelectedLecture(el)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {selectedLecture && <LectureModal data={selectedLecture} onClose={() => setSelectedLecture(null)}/>}
        </div>
    )
}