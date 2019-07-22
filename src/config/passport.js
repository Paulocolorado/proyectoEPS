// se va registrat una estrategia es la que nos permite
//logearnos de diferentes formas Local, facebook, twitter entre otros
const LocalStrategy = require('passport-local').Strategy;
//requerir el modelo de usuario
const User = require('../server/models/user');

module.exports = function (passport) {
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
    // Signup
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            User.findOne({'local.email': email}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'the email is already taken'));
                } else {
                    var newUser = new User();
                    newUser.local.userDoctor = req.body.userDoctor;
                    newUser.local.userAdmin = req.body.userAdmin;
                    newUser.local.userPatiente = req.body.userPatiente;
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.lastName = req.body.lastName;
                    newUser.local.userPatiente = req.body.userPatiente;
                    newUser.local.name = req.body.name;
                    newUser.local.idNumber = req.body.idNumber;
                    newUser.local.numContact = req.body.numContact;
                    newUser.local.especiality = req.body.especiality;
                    newUser.local.birthDate = req.body.birthDate;
                    newUser.local.address = req.body.address;
                    newUser.local.sex = req.body.sex;
                    newUser.local.consulMotivation = req.body.consulMotivation;
                    newUser.local.status = req.body.status;
                    newUser.local.vitalSign = req.body.vitalSign;
                    newUser.local.pulse = req.body.pulse;
                    newUser.local.presion = req.body.presion;
                    newUser.local.generalExam = req.body.generalExam;
                    newUser.local.humanHeight = req.body.humanHeight;
                    newUser.local.laboratoryResults = req.body.laboratoryResults;
                    newUser.local.god = req.body.god;
                    newUser.local.menssage = req.body.menssage;
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        }));

        passport.use('local-newClinicalHist', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'idNumber',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, idNumber, password, done) {
            User.findOne({'local.idNumber': idNumber}, function (err, user) {
                if (err) {
                    // return done(err),
                    return done(err, false, req.flash('newClinicalMessage', 'El Id ya existe'));
                }
                if (user) {
                    return done(null, false, req.flash('newClinicalMessage', 'El Id ya existe'));
                } else {
                    var newUser = new User();
                    newUser.local.userDoctor = req.body.userDoctor;
                    newUser.local.userAdmin = req.body.userAdmin;
                    newUser.local.userPatiente = req.body.userPatiente;
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.lastName = req.body.lastName;
                    newUser.local.userPatiente = req.body.userPatiente;
                    newUser.local.name = req.body.name;
                    newUser.local.idNumber = req.body.idNumber;
                    newUser.local.numContact = req.body.numContact;
                    newUser.local.especiality = req.body.especiality;
                    newUser.local.birthDate = req.body.birthDate;
                    newUser.local.address = req.body.address;
                    newUser.local.sex = req.body.sex;
                    newUser.local.consulMotivation = req.body.consulMotivation;
                    newUser.local.status = req.body.status;
                    newUser.local.vitalSign = req.body.vitalSign;
                    newUser.local.pulse = req.body.pulse;
                    newUser.local.presion = req.body.presion;
                    newUser.local.generalExam = req.body.generalExam;
                    newUser.local.humanHeight = req.body.humanHeight;
                    newUser.local.laboratoryResults = req.body.laboratoryResults;
                    newUser.local.god = req.body.god;
                    newUser.local.menssage = req.body.menssage;
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        }));


    // login
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.findOne({'local.email': email}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No User found'))
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Wrong password'));
                }
                return done(null, user);
            });
        }));

        
}