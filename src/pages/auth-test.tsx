// src/pages/auth-test.tsx

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthTest() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Authentication Test Page</h1>
      {!session?.user ? (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      ) : (
        <>
          <p>Welcome, {session.user.name}!</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
