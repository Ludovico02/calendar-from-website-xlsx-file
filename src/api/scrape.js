import puppeteer from "puppeteer";

const url = "https://cal-stud-itsaa.surge.sh/?year=1";

export async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector("[data-course='fust']");
    await page.click("[data-course='fust']");

    await page.waitForSelector("table");

    const getData = await page.evaluate(() => {
        const rows = document.querySelectorAll("table tr");
        const data = [];

        rows.forEach((row) => {
            const cols = row.querySelectorAll("td");
            if (cols.length < 7) return;

            const date = cols[0].innerText.trim();
            const fromTime = cols[1].innerText.trim();
            const toTime = cols[2].innerText.trim();
            const teacher = cols[3].innerText.trim();
            const module = cols[4].innerText.trim();
            const subject = cols[5].innerText.trim();
            const place = cols[6].innerText.trim();

            data.push({day: date, start: fromTime, end: toTime, teacher, module, subject, class: place});
        });

        return data;
    });

    console.log("Dati estratti:", getData);

    await browser.close();
}