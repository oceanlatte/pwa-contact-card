const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

require('./routes/htmlRoutes.js')(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../client/'));

app.listen(PORT, function() {
  console.log(`🌎 Now listening on port ${PORT}...`);
})