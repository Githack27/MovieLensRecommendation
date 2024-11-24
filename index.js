import { cleanDataset } from "./pipeline/datacleaning.js";
import { processDataset } from "./pipeline/processDataset.js";
import { DataStorageService } from "./pipeline/dataStorage.js";
import dotenv from "dotenv";

dotenv.config();
const folderPath = process.env.DATASET_FOLDER_PATH;
cleanDataset(folderPath)
    .then(() => console.log('Dataset cleaning complete.'))
    .catch((err) => console.error('Error cleaning dataset:', err));

var transformedData = await processDataset(folderPath);
await DataStorageService(transformedData);