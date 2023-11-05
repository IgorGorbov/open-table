import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

import { JWT_SECRET, prisma } from "@/shared/config";
import { setCookie } from "cookies-next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const { firstName, lastName, email, phone, city, password } = request.body;

    const validationSchema = [
      {
        valid: validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 20 }),
        errorMessage: "Last name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone is invalid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is invalid",
      },
      {
        valid: validator.isLength(password, { min: 1, max: 20 }),
        errorMessage: "Password is invalid",
      },
    ];

    const validationError = validationSchema.find((check) => !check.valid);

    if (validationError) {
      return response
        .status(400)
        .json({ errorMessage: validationError.errorMessage });
    }

    const userWithEmail = await prisma.user.findUnique({ where: { email } });

    if (userWithEmail) {
      return response
        .status(400)
        .json({ errorMessage: "Email is associates with another account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        email,
        city,
        phone,
      },
    });

    const secret = new TextEncoder().encode(JWT_SECRET);

    const token = await new jose.SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("jwt", token, {
      req: request,
      res: response,
      maxAge: 60 * 6 * 24,
    });

    return response.status(200).json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
  }

  response.end();
}
