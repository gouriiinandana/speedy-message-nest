import { useAuth, AuthProvider } from '@/hooks/useAuth';
import { AuthForm } from '@/components/auth/AuthForm';
import Chat from './Chat';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '200ms' }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return <Chat />;
}

export default function Index() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
