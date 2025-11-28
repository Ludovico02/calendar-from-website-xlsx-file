/* 
* Come prima bozza faccio web scraping dal sito,
* mi viene dato il formato data:
* data[i].day = "mar 18/11/25"
* Voglio trasformarla in una data dell'oggetto Date
*/
export const parseDateString = (dateString) => {
    const datePart = dateString.trim().slice(-8);
    const parts = datePart.split("/");
    const [day, month, year] = parts;
    
    return `${month}/${day}/20${year}`;
}

export default parseDateString;

// Finds first day of the week (monday) and shifts it according to the week we want to see
export const getMonday = (date, shift) => {
    date = new Date(date);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) + shift;

    return new Date(date.setDate(diff));
}

// Compare dates without resetting hours to 0, 0, 0, 0
export const isSameDate = (firstDate, secondDate) => {
    const d1 = new Date(firstDate);
    const d2 = new Date(secondDate);

    return  d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
}