import { createAuthClient } from "better-auth/react";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const authClient = createAuthClient({ baseURL });

export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const signOut = authClient.signOut;
export const useSession = authClient.useSession;
