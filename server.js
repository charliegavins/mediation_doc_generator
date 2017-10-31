const express    = require ('express');
const app        = express();
const bodyParser = require ('body-parser');
const morgan     = require ('morgan');
const routes     = require ('./api/config/routes');
// const dest       = require (`/public`);
const config     = require ('./api/config/config');
const cors       = require ('cors');
const path       = require ('path');


if (app.get('env') !== 'production') app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
app.listen(config.port, () => console.log(`Express has started on port: ${config.port}`));
