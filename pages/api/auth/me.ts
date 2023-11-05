import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";

import { JWT_SECRET, prisma } from "@/shared/config";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const bearerToken = request.headers.authorization;

  if (bearerToken) {
    const [, token] = bearerToken.split(" ");

    if (token) {
      const secret = new TextEncoder().encode(JWT_SECRET);

      try {
        await jose.jwtVerify(token, secret);

        const payload = jwt.decode(token) as { email: string };

        const user = await prisma.user.findUnique({
          where: { email: payload.email },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            city: true,
            phone: true,
          },
        });

        if (user) {
          return response.status(200).json({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            city: user.city,
            phone: user.phone,
          });
        }

        return response.status(401).json({ errorMessage: "User not found" });
      } catch (error) {
        return response
          .status(401)
          .json({ errorMessage: "Token is not valid" });
      }
    }
  }

  response.status(401).json({ errorMessage: "Unauthorized request" });
}
