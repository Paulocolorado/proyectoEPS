module.exports = (app, passport) => {

    const User = require('../server/models/user');

        // historia clinica
    app.get('/clinicalHist', (req, res) => {
        res.render('clinicalHist', {
            user: req.user
        });
    });

    app.post('/clinicalHist', passport.authenticate('local-clinicalHist', {
        successRedirect: '/clinicalHist',
        failureRedirect: '/profile',
        failureFlash: true
    }));

            // Nueva historia clinica
    app.get('/newClinicalHist', (req, res) => { 
        res.render('newClinicalHist', {
            message: req.flash('loginMessage'),
            user: new User(req.user)
        });
    });
  
    app.post('/newClinicalHist', passport.authenticate('local-newClinicalHist', {
        successRedirect: '/newClinicalHist',
        failureRedirect: '/profile/',
        failureFlash: true
    }));

    app.get('/listUser',  (req, res) => {
        User.find().exec(function(err, usuarios) {
            if (err) throw err;
            myvariable = JSON.parse(JSON.stringify(usuarios));
        });
        res.render('listUser')
    });

    app.get('/delete/:id', async (req, res, next) => {
        let { id } = req.params;
        await User.deleteOne({_id: id});
        res.redirect('/profile');
      });

    // app.get('/edit/:id', (req, res, next) => {
    //     res.render('edit', {
    //         output: JSON.parse(JSON.stringify(req.params))
    //     });
    // });

    // app.get('/edit/:id', async (req, res, next) => {
    //     let { id } = req.params;
    //     const usuario = await User.find();
    //     console.log(usuario);
    //     console.log(req.params);
    //     res.render('edit', { usuario });
    // });

    app.get('/edit/:id', async(req, res) => {
        const note = await User.findById(req.params.id);
        res.render('edit', {note});
        console.log(note);
    });

    // app.

    app.get('/', (req, res) => {
        res.render('index')
    });

    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

    app.get('/profile', isLoggedIn, (req, res) => {
        User.find().exec(function(err, usuarios) {
            if (err) throw err;
            myvariable = JSON.parse(JSON.stringify(usuarios));
        });
        res.render('profile', {
            user: req.user
        });
    });

    // logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/');
}
