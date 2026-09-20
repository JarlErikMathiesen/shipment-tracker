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

  const data = await response.json();

  return data;
}
