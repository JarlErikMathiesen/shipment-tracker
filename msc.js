/* const url = "https://www.msc.com/api/feature/tools/TrackingInfo";

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  body: JSON.stringify({
    trackingNumber: "MSDU6702323",
    trackingMode: "0"
  })
});

console.log("Status:", response.status);
console.log("Content-Type:", response.headers.get("content-type"));

const text = await response.text();

console.log(text);

const shipment = await trackMSC("MSDU6702323");

console.log(shipment); */

const url = "https://www.msc.com/api/feature/tools/TrackingInfo";

async function trackMSC(containerNumber) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({
            trackingNumber: containerNumber,
            trackingMode: "0"
        })
    });

    console.log("Status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));

    const data = await response.json();

    return data;
}

const result = await trackMSC("MSDU6702323");

const billOfLading = result.Data.BillOfLadings[0];
const container = billOfLading.ContainersInfo[0];

const events = container.Events;
const transshipments = billOfLading.GeneralTrackingInfo.Transshipments;

console.log("Events:");
console.log(events);

console.log("Planned transshipments:");
console.log(transshipments);

const eventLocations = events.map(event => event.Location);

const expectedNextTransshipment = transshipments.find(
    port => !eventLocations.includes(port)
);

if (expectedNextTransshipment) {
    console.log("Expected next transshipment:");
    console.log(expectedNextTransshipment);
} else {
    console.log("No remaining planned transshipments.");
}