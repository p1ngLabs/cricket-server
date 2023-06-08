import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

(() => {
  crypto.generateKey(
    'hmac',
    {
      length: 128,
    },
    (err, key) => {
      if (err) throw err;
      fs.writeFileSync(
        path.join(__dirname, '/secret.key'),
        key.export().toString('hex')
      );
    }
  );
})();
