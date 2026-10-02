export function parseShipment(text) {
  const shipment = {
    shipmentNumber: null,
    carrier: null,
    vessel: null,
    voyage: null,
    loadPort: null,
    dischargePort: null,
    containers: [],
  };

  const carrierMatch = text.match(
    /CARRIER\s+GOODS TO BE CLEARED BY\s*\n([^\n]+)/i,
  );

  if (carrierMatch) {
    shipment.carrier = carrierMatch[1].trim();
  }

  const vesselMatch = text.match(/Vessel Name & No\s*\n([^\n]+)/i);

  if (vesselMatch) {
    const parts = vesselMatch[1].trim().split(/\s+/);

    shipment.voyage = parts.pop();
    shipment.vessel = parts.join(' ');
  }

  const loadPortMatch = text.match(/Port of Loading\s*\n([^\n]+)/i);

  if (loadPortMatch) {
    shipment.loadPort = loadPortMatch[1].trim();
  }

  const dischargePortMatch = text.match(/Port of Destination\s*\n([^\n]+)/i);

  if (dischargePortMatch) {
    shipment.dischargePort = dischargePortMatch[1].trim();
  }

  const containerMatches = text.matchAll(/Container No\.:\s*([A-Z]{4}\d{7})/gi);

  for (const match of containerMatches) {
    shipment.containers.push(match[1].toUpperCase());
  }

  return shipment;
}
