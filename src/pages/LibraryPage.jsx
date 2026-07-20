import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { RemoteMusicLibrary } from '../components/RemoteMusicLibrary';

export function LibraryPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Module Federation Host</p>
            <h1 className="mt-1 text-2xl font-bold text-white">Welcome, {user.username}</h1>
            <p className="mt-1 text-slate-300">
              Signed in as <strong className="text-white">{user.role}</strong>. Admin controls are
              injected into the remote module via props.
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-100 hover:bg-slate-700"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>

      <RemoteMusicLibrary role={user.role} />
    </div>
  );
}
