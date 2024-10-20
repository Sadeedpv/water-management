import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define which routes require authentication
const protectedRoutes = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/preference",
  "/dashboard/home",
  "/dashboard/profile",
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  // If the user is not authenticated and is trying to access a protected route, redirect to the login page
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is authenticated, allow the request to proceed
  return NextResponse.next();
}

// Define the paths where the middleware should apply
export const config = {
  matcher: ["/dashboard/:path*"], // Protect all dashboard routes
};
