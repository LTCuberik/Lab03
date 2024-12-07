
const path = require('path');

const showHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

module.exports = {
    showHomePage,
};
