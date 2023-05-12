const { expApp } = require('./serv.js');

expApp.listen(3001, () => {
    console.log('Server running on port 3001');
});
