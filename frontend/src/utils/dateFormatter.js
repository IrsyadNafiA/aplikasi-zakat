// src/utils/dateFormatter.js
import { DateTime } from "luxon";

/**
 * Format date now.
 *
 * @returns {string} Contoh output: '2025-04-29T21:33:00.874+07:00'
 */
export function dateNow() {
  return DateTime.now().setZone("Asia/Jakarta").toString();
}

/**
 * Format tanggal ke format tertentu dalam zona waktu yang diinginkan.
 *
 * @param {string | Date | number} date - Tanggal yang ingin diformat (ISO string, Date object, atau timestamp).
 * @param {string} format - Format Luxon (contoh: 'dd/MM/yyyy HH:mm').
 * @param {string} zone - Zona waktu (contoh: 'Asia/Jakarta').
 * @returns {string} Tanggal terformat
 */
export function formatDate(
  date,
  format = "dd/MM/yyyy HH:mm",
  zone = "Asia/Jakarta"
) {
  return DateTime.fromJSDate(new Date(date), { zone }).toFormat(format);
}

/**
 * Format ISO string ke format default lokal dengan nama hari dan bulan (Bahasa Indonesia).
 *
 * @param {string} isoString - ISO string date (contoh: '2025-04-29T10:25:00')
 * @returns {string} Contoh output: 'Selasa, 29 April 2025 10:25'
 */
export function formatIndonesianDate(isoString) {
  return DateTime.fromISO(isoString, { zone: "Asia/Jakarta" })
    .setLocale("id")
    .toFormat("cccc, dd LLLL yyyy HH:mm");
}
