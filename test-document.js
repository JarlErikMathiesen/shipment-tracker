import { extractPdfText } from './document-parser.js';

const text = await extractPdfText('./Shipment SNOA0001487171.PDF');

console.log(text);
