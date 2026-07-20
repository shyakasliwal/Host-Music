import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const inputClassName =
  'w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none focus:border-sky-400';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(username, password);
      const redirectTo = location.state?.from ?? '/library';
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-900/90 p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Host Application</p>
        <h1 className="mt-2 text-3xl font-bold text-white">FinacPlus Music Hub</h1>
        <p className="mt-2 text-slate-300">
          Sign in to load the Music Library micro frontend with role-based access.
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-1.5 text-sm text-slate-300">
            <span>Username</span>
            <input
              className={inputClassName}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          </label>

          <label className="grid gap-1.5 text-sm text-slate-300">
            <span>Password</span>
            <input
              type="password"
              className={inputClassName}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2.5 font-medium text-white disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-700/80 pt-4 text-sm text-slate-400">
          <p className="font-medium text-slate-300">Demo accounts</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <code className="text-sky-200">admin / admin123</code> — add & delete songs
            </li>
            <li>
              <code className="text-sky-200">user / user123</code> — view, filter, sort, group only
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
