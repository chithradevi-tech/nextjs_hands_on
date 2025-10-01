// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl;

//   // Example: redirect if user is not logged in
//   const isLoggedIn = request.cookies.get('token');
//   if (!isLoggedIn && url.pathname.startsWith('/articles')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // Example: rewrite
//   if (url.pathname === '/old') {
//     return NextResponse.rewrite(new URL('/new', request.url));
//   }

//   // Default: continue request
//   return NextResponse.next();
// }


export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const themepreference = request.cookies.get('theme');

    if(!themepreference){
        response.cookies.set("theme", "dark")
    }

    response.headers.set("custom-header", "custom-value")
   
    return response

    //return NextResponse.redirect(new URL('/', request.url));
    // if(request.nextUrl.pathname === "/home") {
    //     return NextResponse.rewrite(new URL('/product', request.url));
    // }
}

// export const config = {
//     matcher: "/home"
// }