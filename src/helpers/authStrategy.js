const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const {
    UserService
} = require('../services/UserService')
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userService = new UserService()

passport.use(
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async (email, password, done) => {
            try {
                const user = await userService.findUserByEmail(email);
                checkUser(user);
                await checkPassword(password, user.password);
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(new BearerStrategy(async (token, done) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_KEY)
        const user = await userService.findUserById(payload.id)
        done(null, user)
    } catch (error) {
        done(error)
    }
}))

const checkUser = (user) => {
    if (!user) {
        throw new Error('Usuário não existe.')
    }
}

const checkPassword = async (password, hashPassword) => {
    const validPassword = await bcrypt.compare(password, hashPassword);
    if (!validPassword) {
        throw new Error('Email ou senha inválidos.')
    }
}