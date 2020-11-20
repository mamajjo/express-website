const express = require('express');
const path = require('path');
const morgan = require('morgan')

const app = express();

app.use('/', express.static(path.join(__dirname, '/')));
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.sendFile('./app/index.html', { root: __dirname });
});

app.get('/hello', (req, res) => {
    res.send("Hello!")
})

port = 80

try {
    app.listen(port, () => {
      console.log(`Server Starts Up on port ${port}!`);
    });
}
catch (e) {
    console.warn(`${e}`)
}

