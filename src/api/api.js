export async function fetchTimetable() {
    try {
        const response = await fetch("../../data/timetable.json");
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Unable to get data from timetable.json file.", error);
        return [];
    }
}