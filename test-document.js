import { extractPdfText } from './document-parser.js';

const text = await extractPdfText(
  './Varemottak - Lien Kuo Pakkseddel + Sertifikater - 1924240 + 1932225, martin.bendiksen@astrup.no, 1,.pdf',
);

console.log(text);
