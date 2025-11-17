const express = require('express');
const app = express();
app.get('/auth/health', (req, res) => res.json({ service: 'auth', status: 'ok' }));
const port = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(port, () => console.log('auth-service listening on', port));
}
module.exports = app;
