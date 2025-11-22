import { useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import ListView from "../components/ListView";

export default function Home() {
    const [view, setView] = useState("");

    const resetView = () => {
        setView("");
    }

    // Temporary I will implement re-routing
    return (
        <div>
            { view === "" && (
                    <div>
                        <button onClick={() => setView("calendar")}>Calendar</button>
                        <button onClick={() => setView("list")}>List</button>
                    </div>
                )
            }
            <div>
                { view === "calendar" && <Calendar onReturnHome={resetView} /> }
                { view === "list" && <ListView onReturnHome={resetView} /> }
            </div>
        </div>
    )
}