import fs from "fs";
import path from "path";
import { parseCSV } from "./Utilities.js";
import { transformData } from "./transform.js";

export async function processDataset(folderPath) {
    const files = fs.readdirSync(folderPath);
    const fileMappings = {};
    for (const file of files) {
        if (!file.endsWith(".csv")) continue;
        const filePath = path.join(folderPath, file);
        const key = path.basename(file, ".csv").toLowerCase();
    
            const parsedData = await parseCSV(filePath);
            fileMappings[key] = parsedData;
    }

    var transformedData = transformData({
        links: fileMappings.links,
        movies: fileMappings.movies,
        tags: fileMappings.tags,
        ratings: fileMappings.ratings,
    });

    return transformedData;
}