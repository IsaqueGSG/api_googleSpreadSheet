const express = require('express')
const app = express()
const cors = require('cors')

const Api_controller = require('./src/controllers/Api_controller.js')

const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.post('/', Api_controller.add )

const port = 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})