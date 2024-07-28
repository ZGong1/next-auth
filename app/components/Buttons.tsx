'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export function SignInButton() {
  const { data: session, status } = useSession();
  // console.log(session, status);

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated') {
    return (
      <Link href={`/dashboard`}>
        <div style={{ width: `${40}px`, height: `${40}px`, borderRadius: '50%', overflow: 'hidden',}}>
          <Image
            src={session.user?.image ?? '/mememan.webp'}
            width={40}
            height={40}
            alt={session.user?.name || 'session not found'}
          />
        </div>
      </Link>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  const { data: session, status} = useSession()

  if (!session) return;

  return <button onClick={() => signOut()}>Sign out</button>;
}