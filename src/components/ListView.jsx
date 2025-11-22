import { useEffect, useState } from "react";
import { fetchTimetable } from "../api/api";
import "../css/ListView.css";

const parseDateString = (dateString) => {
    const datePart = dateString.trim().slice(-8);
    const parts = datePart.split("/");
    const [day, month, year] = parts;
    
    return `${month}/${day}/20${year}`;
}

export default function ListView({ onReturnHome }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        async function getData() {
            const data = await fetchTimetable();
            
            const nowDate = new Date();
            nowDate.setHours(0, 0, 0, 0);

            const removePastData = data.filter((el) => {
                const pastDate = new Date(parseDateString(el.day));
                return pastDate.getTime() >= nowDate.getTime();
            });

            setData(data);
            setFilteredData(removePastData);
        }

        getData();
    }, []);

    return (
        <div className="full-list-table">
            <button onClick={onReturnHome}>Home</button>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Ora</th>
                        <th>Docente</th>
                        <th>Materia</th>
                        <th>Aula</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(el => (
                        <tr key={el.day + el.teacher + el.start}>
                            <td>{el.day}</td>
                            <td>{el.start + "-" + el.end}</td>
                            <td>{el.teacher}</td>
                            <td>{el.subject}</td>
                            <td>{el.class}</td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    )
}