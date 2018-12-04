const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config.js');
const app = express();
const port = process.env.PORT || 3050;

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test'){
  //console.log(config.database)
  mongoose.connect(config.database)
  mongoose.connection.once('open',()=>console.log('Good to go!'))
    .on('error',(error)=>{
      console.warn('Warrning',error);
    });
}

console.log(routes.test)

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/api', routes)
app.get('/', (req, res) => {
  res.send({
    text: 'welcome'
  })
})
//routes(app);
app.listen(port, () => console.log(`Listening on: ${port}`));