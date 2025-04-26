// src/config/passport.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import dotenv from 'dotenv';
import { AppDataSource } from './database';
import { User } from '../models/user.entity';
import { verifyPassword } from '../utils/password.util';
import { JwtPayload } from '../utils/jwt.util';

dotenv.config();

// Local Strategy: login con email y contraseña
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',     // campo que enviamos en el body
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOneBy({ email });
        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }
        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }
        // omitimos el hash al adjuntar user
        delete (user as any).passwordHash;
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// JWT Strategy: proteger rutas privadas
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'supersecret',
  passReqToCallback: false,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload: JwtPayload, done) => {
    try {
      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOneBy({ id: payload.sub });
      if (!user) {
        return done(null, false, { message: 'Token inválido' });
      }
      delete (user as any).passwordHash;
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

// Serializar y deserializar (no usamos sessions, pero Passport lo requiere)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: number, done) => {
  try {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });
    if (user) {
      delete (user as any).passwordHash;
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
});

export default passport;
