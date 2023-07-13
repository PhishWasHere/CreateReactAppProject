const router = require('express').Router();

const { login, signup, logout } = require('./user');

router.route('/signup').post(signup);
router.route('/login').post(login);


router.get('/', (req, res) => {
    res.send('Hello api!');

    console.log(process.env.ENCRYPT);
    console.log('Hello api!');
    }
    
);


module.exports = router;
