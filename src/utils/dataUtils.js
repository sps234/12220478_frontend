import * as fs from 'fs';
import { parse } from 'csv';


const csvFilePath = '../../public/hotel_bookings_1000.csv'; 
const jsFilePath = 'data.js';

const convertCsvToJs = () => {
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading CSV file:', err);
            return;
        }

        parse(data, { columns: true, skip_empty_lines: true }, (err, records) => {
            if (err) {
                console.error('Error parsing CSV:', err);
                return;
            }

            const output = `export const data = ${JSON.stringify(records, null, 2)};`;

            fs.writeFile(jsFilePath, output, (err) => {
                if (err) {
                    console.error('Error writing JavaScript file:', err);
                } else {
                    console.log('CSV has been converted to JavaScript and saved as data.js');
                }
            });
        });
    });
};

convertCsvToJs();
