import express from 'express';
import { join } from 'path';
import morgan from 'morgan';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static('public'));
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

let port = 80

try {
    app.listen(port, () => {
      console.log(`Server Starts Up on port ${port}!`);
    });
}
catch (e) {
    console.warn(`${e}`)
}

