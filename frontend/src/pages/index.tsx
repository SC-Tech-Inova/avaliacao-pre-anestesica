import { useEffect } from 'react';
import { useRouter } from 'next/router';

// This page automatically redirects to the home page
export default function Index() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/home');
  }, [router]);
  
  return null;
}
