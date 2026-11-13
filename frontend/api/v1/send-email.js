import tls from 'node:tls';

const RELAY_SECRET = process.env.RELAY_SECRET;
const SMTP_USER = process.env.MAIL_USERNAME;
const SMTP_PASS = process.env.MAIL_PASSWORD;

function sendGmailSmtp({ to, subject, replyTo, html }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        host: 'smtp.gmail.com',
        port: 465,
        servername: 'smtp.gmail.com',
        timeout: 10000,
      },
      () => {}
    );

    let buffer = '';
    let step = 0;

    const commands = [
      `EHLO expertresearchreadyservices.com`,
      `AUTH LOGIN`,
      Buffer.from(SMTP_USER).toString('base64'),
      Buffer.from(SMTP_PASS).toString('base64'),
      `MAIL FROM:<${SMTP_USER}>`,
      `RCPT TO:<${to}>`,
      `DATA`,
      [
        `From: "Expert Research Ready Services" <${SMTP_USER}>`,
        `To: <${to}>`,
        replyTo ? `Reply-To: ${replyTo}` : null,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        ``,
        html,
        `.`,
      ]
        .filter((line) => line !== null)
        .join('\r\n'),
      `QUIT`,
    ];

    socket.setEncoding('utf8');

    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\r\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.length < 4) continue;
        // Wait for final line of multi-line SMTP response (4th char is space)
        if (line[3] !== ' ') continue;

        const code = parseInt(line.slice(0, 3), 10);
        if (code >= 400) {
          socket.destroy();
          return reject(new Error(`SMTP Error ${code}: ${line}`));
        }

        if (step < commands.length) {
          const cmd = commands[step++];
          socket.write(cmd + '\r\n');
        } else {
          socket.end();
          return resolve(true);
        }
      }
    });

    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('SMTP connection timed out'));
    });

    socket.on('error', (err) => {
      reject(err);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!RELAY_SECRET || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ success: false, message: 'Mail relay environment variables are not configured' });
  }

  const secret = req.headers['x-relay-secret'];
  if (secret !== RELAY_SECRET) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { to, subject, replyTo, html } = req.body || {};
  if (!to || !subject || !html) {
    return res.status(422).json({ success: false, message: 'Missing email fields' });
  }

  try {
    await sendGmailSmtp({ to, subject, replyTo, html });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'SMTP relay error',
    });
  }
}

