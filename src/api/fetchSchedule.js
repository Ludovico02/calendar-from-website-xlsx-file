export async function fetchSchedule(url) {
   const response = await fetch(url);
   if(!response.ok) throw new Error("Can't download XLSX file");

   const blob = await response.blob();
   return blob;
}