import { Component, lazy, Suspense } from 'react';

const MusicLibrary = lazy(() => import('musicLibrary/MusicLibrary'));

class RemoteBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error.message,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto max-w-6xl px-5 py-8">
          <div className="rounded-2xl border border-rose-800/60 bg-rose-950/30 p-8 text-center">
            <h2 className="text-xl font-semibold text-white">Micro frontend failed to load</h2>
            <p className="mt-2 text-rose-200">{this.state.message}</p>
            <p className="mt-2 text-sm text-slate-400">
              The Music Library remote must be built and served on port 5001. Run{' '}
              <code className="text-sky-200">npm run dev</code> from the repo root (not host
              alone). The MFE uses <code className="text-sky-200">vite build --watch</code> +{' '}
              <code className="text-sky-200">vite preview</code> because Module Federation does
              not generate <code className="text-sky-200">remoteEntry.js</code> in Vite dev mode.
            </p>
          </div>
        </section>
      );
    }

    return (
      <Suspense
        fallback={
          <section className="mx-auto max-w-6xl px-5 py-8">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-700/80 bg-slate-900/80 p-10 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-3 border-slate-600 border-t-sky-400" />
              <p className="text-slate-300">Lazy loading Music Library remote…</p>
            </div>
          </section>
        }
      >
        <MusicLibrary role={this.props.role} />
      </Suspense>
    );
  }
}

export function RemoteMusicLibrary({ role }) {
  return <RemoteBoundary role={role} />;
}
