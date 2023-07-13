const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    res.send('Hello World!');
    console.log('Hello World!');
    }
);

module.exports = router;
