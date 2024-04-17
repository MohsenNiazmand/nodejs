import passport from 'passport';
import LocalStrategy from 'passport-local';
import { createUser, getUser } from './controllers/users.js';

passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
}, async (req, username, password, done) => {
    try {
        const user = await createUser({
            fullname: req.body.fullname,
            username,
            password,
        });

        done(null, user);
    } catch(error) {
        done(error);
    }
}));

passport.use('login',new LocalStrategy(async (username,password,done)=> {
    const InvadiUserError = 'Invalid username or password';
    try{
       const user =await  getUser({username});
        if(!user){
            done(new Error('Invalid username'));
            return;
        }

        const hasValidPassword=user.isValidPassword(password);

        if(!hasValidPassword){
            done(new Error('Invalid password'));
            return;
        }

        done(null,user);

    }catch(error){
        done(error);
    }
}));