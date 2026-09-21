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

  if (!response.ok) {
    throw new Error(`MSC returned HTTP ${response.status}`);
  }

  const data = await response.json();

  console.log('MSC data:', JSON.stringify(data, null, 2));

  return data;
}

/* MSDU6702323 */
