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

  const text = await response.text();

  console.log('MSC status:', response.status);
  console.log('MSC content type:', response.headers.get('content-type'));
  console.log('MSC response:', text);

  return text;
}
