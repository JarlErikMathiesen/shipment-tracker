import { trackYangMing } from './yangming.js';

const result = await trackYangMing('SEGU1386540');

console.log(JSON.stringify(result, null, 2));
