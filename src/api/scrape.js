import puppeteer from "puppeteer";
import fs from "fs";

// Sito che ci è stato dato con la tabella degli orari, è la pagina per il primo anno
const url = "https://cal-stud-itsaa.surge.sh/?year=1";

export async function scrape() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // apro la pagina e aspetto che ci siano al massimo ancora 2 richieste in elaborazione, così sono sicuro che la pagina abbia caricato tutto
    await page.goto(url, { waitUntil: "networkidle2" });

    /*
    * Aspetto che venga generato un bottone con la proprietà data-course="fust" e lo clicco
    * Sono costretto a fare così visto che la pagina viene cancellata e rigenerata quando il bottone viene cliccato, sarebbe stato meglio avere direttamente il link, ma il sito non funziona così
    */
    await page.waitForSelector("[data-course='fust']");
    await page.click("[data-course='fust']");

    await page.waitForSelector("table");

    const getData = await page.evaluate(() => {
        const rows = document.querySelectorAll("table tr");
        const data = [];

        rows.forEach((row) => {
            const cols = row.querySelectorAll("td");
            if (cols.length < 7) return;

            const date = cols[0]?.innerText.trim();
            const fromTime = cols[1]?.innerText.trim();
            const toTime = cols[2]?.innerText.trim();
            const teacher = cols[3]?.innerText.trim();
            const module = cols[4]?.innerText.trim();
            const subject = cols[5]?.innerText.trim();
            const place = cols[6]?.innerText.trim();

            data.push({day: date, start: fromTime, end: toTime, teacher, module, subject, class: place});
        });

        return data;
    });

    // console.log("Dati estratti:", getData);

    await browser.close();

    return getData;
}

/*
* Salvo i dati su un file JSON
* Farò il fetch di questo file su calendar
* Questo è uno screenshot della pagina attuale in futuro posso creare un server locale che ogni tot tempo va a fare lo scraping di nuovo per vedere eventuali aggiornamenti
*/
scrape().then((data) => {
    fs.writeFileSync("../data/timetable.json", JSON.stringify(data, null, 2));
    console.log("Dati salvati su file json");
});

// scrape();