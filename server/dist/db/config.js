"use strict";
const mongoose = require('mongoose');
const connectionURL = process.env.DB_CONNECTION_SERVER;
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
