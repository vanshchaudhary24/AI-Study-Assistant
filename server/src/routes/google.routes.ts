import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
    failureRedirect:
      "http://localhost:5173/login",
  }),

  (req: any, res) => {

    const {
      accessToken,
      refreshToken,
    } = req.user;

    const clientUrl = process.env.CLIENT_URL! ;

    res.redirect(

      `${clientUrl}/auth/google-success?accessToken=${accessToken}&refreshToken=${refreshToken}`

    );

  }
);

export default router;