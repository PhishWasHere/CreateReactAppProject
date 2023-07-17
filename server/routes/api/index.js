const router = require('express').Router();

const { login, signup, logout } = require('./user');

router.route('/signup').post(signup);
router.route('/login').post(login);

const chat = require('./chat');
router.use('/chat', chat);

router.get('/', (req, res) => {
    res.send('Hello api!');
    console.log('Hello api!');
    }
);

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hello api!');
    console.log('Hello api!');
    }
);



module.exports = router;
