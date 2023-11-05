import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

import { JWT_SECRET, prisma } from "@/shared/config";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const { email, password } = request.body;

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "Password is invalid",
      },
    ];

    const errorMessage = validationSchema.find((check) => !check.valid);

    if (errorMessage) {
      return response.status(400).json({ errorMessage });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const secret = new TextEncoder().encode(JWT_SECRET);

        const token = await new jose.SignJWT({ email })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("24h")
          .sign(secret);

        setCookie("jwt", token, { req: request, res: response,  maxAge: 60 * 6 * 24 });

        return response.status(200).json({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          city: user.city,
        });
      }

      return response
        .status(401)
        .json({ errorMessage: "Email is associates with another account" });
    }

    return response
      .status(401)
      .json({ errorMessage: "Email or password is invalid" });
  }

  response.end();
}
