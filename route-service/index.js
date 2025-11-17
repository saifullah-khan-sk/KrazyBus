const express = require('express');
const axios = require('axios');
const app = express();
app.get('/route/health', (req, res) => res.json({ service: 'route', status: 'ok' }));
// small endpoint that queries auth-service when AUTH_URL env var set
app.get('/route/check-auth', async (req, res) => {
  const authUrl = process.env.AUTH_URL || 'http://localhost:3001/auth/health';
  try {
    const r = await axios.get(authUrl);
    res.json({ auth: r.data, route: 'ok' });
  } catch (err) {
    res.status(500).json({ error: 'cannot reach auth', details: err.message });
  }
});
const port = process.env.PORT || 3002;
if (require.main === module) {
  app.listen(port, () => console.log('route-service listening on', port));
}
module.exports = app;
