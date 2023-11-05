import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { JWT_SECRET } from "@/shared/config";

export async function middleware(request: NextRequest, response: NextResponse) {
  const bearerToken = request.headers.get("authorization");

  if (bearerToken) {
    const [, token] = bearerToken.split(" ");

    if (token) {
      const secret = new TextEncoder().encode(JWT_SECRET);

      try {
        await jose.jwtVerify(token, secret);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json(
          { errorMessage: "Token is not valid" },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.json(
    { errorMessage: "Unauthorized request" },
    { status: 401 }
  );
}

export const config = {
  matcher: ["/api/auth/me"],
};
