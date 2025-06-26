import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-effect rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              HR Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Sign in to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}