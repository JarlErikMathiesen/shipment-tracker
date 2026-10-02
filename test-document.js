import { extractPdfText } from './document-parser.js';
import { parseShipment } from './shipment-parser.js';

const text = await extractPdfText(
  './Varemottak - Lien Kuo Pakkseddel + Sertifikater - 1924240 + 1932225, martin.bendiksen@astrup.no, 1,.pdf',
);

const shipment = parseShipment(text);

console.log(JSON.stringify(shipment, null, 2));
