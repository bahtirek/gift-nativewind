import { getProfile } from '@api/auth';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthData = {
  profile: string;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  loading: true,
  profile: 'Guest',
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState('Guest');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchSession = async () => {
      const profile = await getProfile();
      setProfile(profile)
      setLoading(false);
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, profile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);