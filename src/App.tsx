import { useEffect, useState } from 'react';
import Auth from './components/Auth';
import Tracker from './Tracker';
import supabase from './hooks/supabase';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session);
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription }, } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event)
      setIsAuthenticated(!!session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    // Loading state
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Tracker /> : <Auth />

}
export default App
