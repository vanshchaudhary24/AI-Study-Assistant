import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import { generateRefreshToken, generateToken } from "../services/auth.service";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },

    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Google email not found."));
        }

        let user = await User.findOne({ email });

        if (!user) {

          user = await User.create({
            fullName: profile.displayName,
            email,
            avatar: profile.photos?.[0]?.value || "",
            googleId: profile.id,
            password: "",
            isEmailVerified: true,
          });
        } else {
          if (!user.googleId) {
            user.googleId = profile.id;
          }

          if (!user.avatar && profile.photos?.length) {
            user.avatar = profile.photos[0].value;
          }

          user.isEmailVerified = true;

          await user.save();

          
        }

        const accessToken = generateToken(user._id.toString());

        const refreshToken = generateRefreshToken(
          user._id.toString()
        );

        user.refreshToken = refreshToken;

        await user.save();

        return done(null, {
          accessToken,
          refreshToken,
          user,
        });

      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;