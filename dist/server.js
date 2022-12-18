import { createServer } from 'http';
import { mainContent } from './content.js';
const port = 5000;
createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text-plain' });
    res.write(mainContent);
    res.end();
}).listen(port);
console.log(`listening on http://localhost:${port} `);
//# sourceMappingURL=server.js.map