import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. On définit les routes qui doivent rester accessibles sans connexion
const isPublicRoute = createRouteMatcher([
  '/login(.*)', 
  '/sign-up(.*)', 
  '/api/webhooks(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. Si la route n'est PAS publique, on oblige l'utilisateur à se connecter
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Ignore les fichiers internes de Next.js et les fichiers statiques
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Toujours exécuter pour les routes API
    '/(api|trpc)(.*)',
  ],
};