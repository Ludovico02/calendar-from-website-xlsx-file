/* 
* Come prima bozza faccio web scraping dal sito,
* mi viene dato il formato data:
* data[i].day = "mar 18/11/25"
* Voglio trasformarla in una data dell'oggetto Date
*/
const parseDateString = (dateString) => {
    const datePart = dateString.trim().slice(-8);
    const parts = datePart.split("/");
    const [day, month, year] = parts;
    
    return `${month}/${day}/20${year}`;
}

export default parseDateString;