import fs from "fs";
import csv from "csv-parser";

// Clean Strings to remove unwanted characters
export function cleanString(str)
{
    if (!str) return '';
    return str
        .replace(/[^a-zA-Z0-9|,.:()!? ]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

// Convert Epoch to Date
export function epochToDate(epoch)
{
    if (!epoch) return null;
    const date = new Date(epoch * 1000);
    return date.toISOString();
};

// Parse CSV File
export async function parseCSV(filePath) 
{
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}