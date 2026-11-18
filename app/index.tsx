import { Redirect } from 'expo-router';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen label="Loading your secure session..." />;
  }

  return <Redirect href={user ? '/(protected)/dashboard' : '/(auth)/login'} />;
}
