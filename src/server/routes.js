module.exports = (app, passport) => {

    const User = require('../server/models/user');

        // historia clinica
    app.get('/clinicalHist',isLoggedIn,  (req, res) => {
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
    app.get('/newClinicalHist', isLoggedIn, (req, res) => { 
        res.render('newClinicalHist', {
            message: req.flash('newClinicalMessage'),
            user: new User(req.user)
        });
    });
  
    app.post('/newClinicalHist', passport.authenticate('local-newClinicalHist', {
        successRedirect: '/profile',
        failureRedirect: '/newClinicalHist/',
        failureFlash: true
    }));

             // Contactenos
    app.get('/contactenos', (req, res) => {
        res.render('contactenos', {
            message: req.flash('signupMessage'),
            user: new User(req.user)
        });
    });

    app.post('/contactenos',  passport.authenticate('local-newClinicalHist',{
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));
    
         // listar usuario
    app.get('/listUser',  isLoggedIn, (req, res) => {
        User.find().exec(function(err, usuarios) {
            if (err) throw err;
            myvariable = JSON.parse(JSON.stringify(usuarios));
        });
        res.render('listUser')
    });

             // Listar Paciente
    app.get('/listPatiente',  isLoggedIn, (req, res) => {
        User.find().exec(function(err, usuarios) {
            if (err) throw err;
            myvariable = JSON.parse(JSON.stringify(usuarios));
        });
        res.render('listPatiente')
    });

            // Eliminar
    app.get('/delete/:id', isLoggedIn, async (req, res, next) => {
        let { id } = req.params;
        await User.deleteOne({_id: id});
        res.redirect('/profile');
      });

            // Editar usuario
    app.get('/edit/:id',isLoggedIn,  async(req, res) => {
        const note = await User.findById(req.params.id);
        res.render('editUser', {note});
        console.log(note);
    });

    app.put('/editUser/:id',isLoggedIn,  async(req, res) =>{
        const { name, idNumber, userDoctor , userPatiente, email, password, lastName, numContact, birthDate, address, sex, consulMotivation, status, vitalSign, pulse, presion, generalExam, humanHeight, laboratoryResults, god }=req.body;
        await User.findByIdAndUpdate(req.params.id,{local:{name, idNumber, userDoctor , userPatiente, email, password, lastName, numContact, birthDate, address, sex, consulMotivation, status, vitalSign, pulse, presion, generalExam, humanHeight, laboratoryResults, god }});
        res.redirect('/listUser');
    })

            // Editar paciente
    app.get('/editPatiente/:id', isLoggedIn,  async(req, res) => {
        const note = await User.findById(req.params.id);
        res.render('editPatiente', {note});
        console.log(note);
    });

    app.put('/editPatiente/:id', async(req, res) =>{
        const { name, idNumber, userDoctor , userPatiente, email, password, lastName, numContact, birthDate, address, sex, consulMotivation, status, vitalSign, pulse, presion, generalExam, humanHeight, laboratoryResults }=req.body;
        await User.findByIdAndUpdate(req.params.id,{local:{name, idNumber, userDoctor , userPatiente, email, password, lastName, numContact, birthDate, address, sex, consulMotivation, status, vitalSign, pulse, presion, generalExam, humanHeight, laboratoryResults }});
        res.redirect('/listPatiente');
    })

            // Página inicio
    app.get('/', (req, res) => {
        res.render('index')
    });

            // login
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

            // Crear usuario Admin
    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/newClinicalHist',
		failureFlash: true // allow flash messages
	}));

    app.get('/profile', isLoggedIn, (req, res) => {
        User.find().exec(function(err, usuarios) {
            if (err) throw err;
            myvariable = JSON.parse(JSON.stringify(usuarios));
        });
        res.render('profile', {
            message: req.flash('newClinicalMessage'),
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
