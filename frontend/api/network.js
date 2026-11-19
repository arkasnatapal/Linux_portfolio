export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: 'connected',
    interface: 'eth0',
    type: 'Wi-Fi (Host Network)',
    ssid: 'Host-Network-5G',
    ip: '192.168.1.104',
    speed: '10000 Mbps',
  });
}
