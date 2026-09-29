const url = 'https://api.maersk.com/synergy/tracking/CAAU7061218?operator=MAEU';

const response = await fetch(url);

console.log('Maersk status:', response.status);
console.log('Maersk content type:', response.headers.get('content-type'));

const text = await response.text();

console.log('Maersk response:');
console.log(text);
