import { trackYangMing } from './yangming.js';

const result = await trackYangMing('TGHU5319596');

console.log(JSON.stringify(result, null, 2));
