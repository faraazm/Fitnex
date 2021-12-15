require('dotenv').config();
const mongoose = require('mongoose');
const keys = require('../config/keys')
const User = mongoose.model('User');
const { Strategy, ExtractJwt } = require('passport-jwt');

function initPassport(passport){
	const opts = {
		jwtFromRequest: ExtractJwt.fromHeader('authorization'),
		secretOrKey: keys.secret
	}

	passport.use(new Strategy(opts, async (payload, done) => {
		try {
			const user = await User.findById(payload.sub);
			return user ? done(null, user) : done(null, false);
		} catch(err){
			done(err, false);
		}
	}));
}

module.exports = initPassport;