// src/config/passport.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { getUserByEmail, getUserById } from "@/services/auth.service";
import { verifyPassword } from "@/utils/password.util";
import { JwtPayload } from "@/utils/jwt.util";
import { UserDTO } from "@/dtos/user.dto";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Local Strategy para login con email y password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: "Email no registrado" });
        }

        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT Strategy para proteger rutas
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload: JwtPayload, done) => {
      try {
        const user: UserDTO | null = await getUserById(payload.sub);
        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        return done(null, user as UserDTO);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
