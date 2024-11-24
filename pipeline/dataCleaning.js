import fs from "fs";
import path from "path";
import { promisify } from 'util';
import { stringify } from 'csv-stringify';
import { parseCSV, cleanString, epochToDate } from "./Utilities.js";

const stringifyAsync = promisify(stringify);

// Clean Dataset Function
export async function cleanDataset(folderPath) {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (!file.endsWith('.csv')) continue;

        const rawData = await parseCSV(filePath);

        const cleanedData = rawData.map((row) => {
            const cleanedRow = {};
            for (const key in row) {
                let value = row[key];
                if (key.toLowerCase().includes('timestamp')) {
                    value = epochToDate(parseInt(value, 10));
                } else {
                    value = cleanString(value);
                }
                cleanedRow[key] = value;
            }
            return cleanedRow;
        });
        
        const output = await stringifyAsync(cleanedData, { header: true });
        fs.writeFileSync(filePath, output, 'utf-8');
    }
}
