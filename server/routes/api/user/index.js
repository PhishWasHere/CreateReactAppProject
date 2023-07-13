
const { User } = require('../../../models');

const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res) => {        
        try {

            if (req.session.logged_in) {
                res.redirect('/');
                return;
            }
            
            const userData = await User.findOne({ email: req.body.email.trim() });
            if (!userData) {
                res.status(400).json({
                  message: 'Incorrect email or password, please try again',
                });
                return;
            }

            console.log(userData, userData.password, req.body.password.trim());

            const validPass = await bcrypt.compare(req.body.password.trim(), userData.password);   
            console.log(validPass);

            if (!userData || !validPass) {
                res.status(400).json({ message: 'Incorrect email or password, please try again' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
            });
            
            res.status(200).json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    signup: async (req, res) => { //add nodemailer email vali if i have time
        try {
            if (req.session.logged_in) {
                res.redirect('/');
                return;
            }
            console.log(req.body);

            const userData = await User.create({
                username: req.body.username.trim(),
                email: req.body.email.trim(),
                password: req.body.password.trim(),
            });

            res.status(200).json('success');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    logout: async (req, res) => {
        try {
            req.session.destroy(() => { // destroys the session
                res.status(204).json('destroyed');
            });
    
    
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
}