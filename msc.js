const url = 'https://www.msc.com/api/feature/tools/TrackingInfo';

export async function trackMSC(containerNumber) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      trackingNumber: containerNumber,
      trackingMode: '0',
    }),
  });

  console.log('MSC status:', response.status);

  console.log('MSC headers:');
  for (const [name, value] of response.headers) {
    console.log(`${name}: ${value}`);
  }

  const text = await response.text();

  console.log('MSC response:');
  console.log(text);

  return text;
}
