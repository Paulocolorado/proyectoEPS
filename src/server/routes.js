module.exports = (app, passport) => {

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
            user: req.user
        });
    });
    
    app.post('/newClinicalHist', passport.authenticate('local-newClinicalHist', {
        successRedirect: '/newClinicalHist',
        failureRedirect: '/profile',
        failureFlash: true
    }));

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

    //profile view
    app.get('/profile', isLoggedIn, (req, res) => {
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
