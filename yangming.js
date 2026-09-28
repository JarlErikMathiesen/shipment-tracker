const url = 'https://www.yangming.com/api/CargoTracking/GetTracking';

export async function trackYangMing(containerNumber) {
  const requestUrl = new URL(url);

  requestUrl.searchParams.set('paramTrackNo', containerNumber);
  requestUrl.searchParams.set('paramTrackPosition', 'SEARCH');
  requestUrl.searchParams.set('paramRefNo', '');

  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error(`Yang Ming returned HTTP ${response.status}`);
  }

  const data = await response.json();

  return data;
}
