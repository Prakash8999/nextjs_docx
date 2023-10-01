import { NextRequest, NextResponse } from "next/server";

export const middleware = ( request: NextRequest)=>{
const path = request.nextUrl.pathname

const isPublicPath = path === '/auth/login' || path.includes('/auth/signup')  || path ==='/'


const token = request.cookies.get('token') 

if (isPublicPath && token) {
	return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
}

if (!isPublicPath && !token) {
	return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
}
 
 return NextResponse.next();
}

export const config = {
	// matcher: '/about/:path*',
	// Use an array to specify multiple matchers
	matcher: [
	  // '/:path*',
	  '/',
	  '/dashboard/:path*',
	  

	  '/auth/:path*',
	  '/signup'
	]
  };
  