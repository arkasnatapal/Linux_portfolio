let tourState = { completed: false, deviceId: 'cloud-workstation' };

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { completed } = req.body || {};
    tourState = {
      completed: Boolean(completed),
      updatedAt: new Date().toISOString(),
      deviceId: req.headers['user-agent'] || 'workstation',
    };
    return res.status(200).json({ success: true, state: tourState });
  }

  return res.status(200).json(tourState);
}
