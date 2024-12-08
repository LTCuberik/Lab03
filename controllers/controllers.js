const { testHtml } = require('../models/models');

const path = require('path');

const showHomePage = (req, res) => {
    const html = testHtml();
    res.send(html);
};


module.exports = {
    showHomePage,
};
