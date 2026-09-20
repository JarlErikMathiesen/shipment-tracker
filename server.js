import http from 'http';
import { readFile } from 'fs/promises';
import { trackMSC } from './msc.js';

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    const html = await readFile('./index.html', 'utf8');

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    res.end(html);
    return;
  }

  if (req.url.startsWith('/track')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const containerNumber = url.searchParams.get('container');

    const result = await trackMSC(containerNumber);

    const billOfLading = result.Data.BillOfLadings[0];
    const container = billOfLading.ContainersInfo[0];

    const shipment = {
      containerNumber: container.ContainerNumber,
      containerType: container.ContainerType,
      delivered: container.Delivered,
      latestLocation: container.LatestMove,
      latestEvent: container.Events[0],
      vessel: container.Events[3].Vessel.IMO,
    };

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify(shipment));

    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

const port = process.env.PORT || 3000;

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
