const https = require('https');
const { EventEmitter } = require('events');
const { createWriteStream } = require('fs');

const monitor = new EventEmitter();
const streamMode = [...process.argv].splice(2).pop() || 'normal';

let request;

switch (streamMode) {
  case 'async':
    request = https.get(`https://jsonplaceholder.typicode.com/comments`, async res => {
      let data = "";
      for await (const chunk of res) {
        data += chunk;
      }
      monitor.emit('results', JSON.parse(data));
    });
    break;
  case 'normal':
  default:
    request = https
      // Normal Stream Usage
      .get(`https://jsonplaceholder.typicode.com/comments`, res => {
        let data = "";
        res.on('data', chunk => data += chunk);
        res.on('end', () => monitor.emit('results', JSON.parse(data)));
      });
    break;
}
// async stream iteration
request.on('error', err => {
  console.error(err);
  process.exit(1);
});

monitor.on('results', results => {
  // open a write stream on the local directory
  const writer = createWriteStream('file.csv', { flags: 'w+' });
  // write the headers first
  writer.write(`${Object.keys(results[0]).join(',')}\n`);

  for (const record of results) {
    let str = Object.values(record).map(v => typeof v === 'string' ? v.replace(/\n/g, "\\n") : v).join(',');
    str += '\n';
    writer.write(str);
  }
  writer.end();
});