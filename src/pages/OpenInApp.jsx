import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const APP_STORE_URL = 'https://apps.apple.com/us/app/stepzsync/id6752641870';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.netsphere.stepzsync';

// Maps the deep-link route to the in-app custom-scheme target and the copy
// shown to the user. The path components here mirror the entries declared in
// /.well-known/apple-app-site-association and /.well-known/assetlinks.json.
const LINK_TYPES = {
  invite: {
    scheme: (v) => `stepzsync://invite/${v}`,
    eyebrow: 'You’ve been invited',
    title: 'Join StepzSync',
    body: 'Open your invite in the StepzSync app to claim it and start racing with real people on a live map.',
    label: 'Invite code',
  },
  race: {
    scheme: (v) => `stepzsync://race/${v}`,
    eyebrow: 'You’re invited to a race',
    title: 'Join the Race',
    body: 'Open the StepzSync app to jump into this live race and move across the map in real time.',
    label: 'Race',
  },
  profile: {
    scheme: (v) => `stepzsync://profile/${v}`,
    eyebrow: 'StepzSync profile',
    title: 'View on StepzSync',
    body: 'Open this profile in the StepzSync app to follow, challenge, and race together.',
    label: 'Profile',
  },
};

function detectPlatform() {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || navigator.vendor || '';
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}

export default function OpenInApp({ type = 'invite' }) {
  const params = useParams();
  const value = params.code || params.raceId || params.username || '';
  const config = LINK_TYPES[type] || LINK_TYPES.invite;
  const platform = useMemo(detectPlatform, []);
  const [triedOpen, setTriedOpen] = useState(false);

  const openApp = () => {
    setTriedOpen(true);
    // Attempt the custom scheme. If the app is installed this hands off to it;
    // if not, the page simply stays put and the store buttons remain visible.
    window.location.href = config.scheme(value);
  };

  // On mobile, try to hand off to the app once on load. (When the app is
  // installed AND App/Universal Links are verified, the OS intercepts the
  // https link before this page ever renders — this is the graceful fallback.)
  useEffect(() => {
    if (platform === 'ios' || platform === 'android') {
      const t = setTimeout(openApp, 600);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform]);

  return (
    <div className="min-h-screen gradient-hero grid-pattern flex items-center justify-center px-6 py-16 text-white">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <a href="/" className="inline-flex items-center gap-1 text-2xl font-bold mb-10">
          <span className="text-white">Stepz</span>
          <span className="text-[#39FF14]">Sync</span>
        </a>

        <div className="bg-[#021F29]/70 border border-[#0F3460] rounded-3xl p-8 backdrop-blur-sm glow-blue">
          <p className="text-[#00BFFF] uppercase tracking-[0.2em] text-xs font-medium">
            {config.eyebrow}
          </p>
          <h1 className="text-3xl font-bold mt-3">{config.title}</h1>

          {value && (
            <div className="mt-5 inline-flex flex-col items-center gap-1">
              <span className="text-gray-500 text-xs uppercase tracking-wider">
                {config.label}
              </span>
              <span className="text-[#39FF14] text-xl font-mono font-bold break-all">
                {value}
              </span>
            </div>
          )}

          <p className="text-gray-400 mt-5 leading-relaxed">{config.body}</p>

          {/* Open in app */}
          <button
            onClick={openApp}
            className="mt-8 w-full bg-[#2759FF] hover:bg-[#1e47cc] text-white font-semibold py-4 rounded-xl transition-colors"
          >
            Open in App
          </button>

          {triedOpen && (
            <p className="text-gray-500 text-sm mt-3">
              Nothing happened? Install the app below, then reopen this link.
            </p>
          )}

          {/* Store badges */}
          <div className="mt-8 space-y-3">
            <p className="text-gray-500 text-sm">Don&apos;t have the app yet?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download StepzSync on the App Store"
                className={`inline-flex items-center justify-center gap-3 bg-black text-white px-5 py-3 rounded-xl font-medium border transition-colors ${
                  platform === 'ios'
                    ? 'border-white/40 hover:border-white/60'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-90 leading-none">Download on the</div>
                  <div className="text-base font-bold leading-tight">App Store</div>
                </div>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get StepzSync on Google Play"
                className={`inline-flex items-center justify-center gap-3 bg-black text-white px-5 py-3 rounded-xl font-medium border transition-colors ${
                  platform === 'android'
                    ? 'border-white/40 hover:border-white/60'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path d="M3.6 1.8 13.4 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" fill="#00D4FF" />
                  <path d="M16.8 8.4 13.4 12l-2.4-2.4 3.4-3.4 2.4 2.2z" fill="#39FF14" />
                  <path d="M16.8 15.6 14.4 17.8 11 14.4 13.4 12l3.4 3.6z" fill="#FF2E63" />
                  <path d="M20.4 10.9c.7.4.7 1.8 0 2.2l-3.6 2.5-2.6-2.6 2.6-2.6 3.6 2.5z" fill="#FF6B35" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-90 leading-none">GET IT ON</div>
                  <div className="text-base font-bold leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <a
          href="/"
          className="inline-block mt-8 text-gray-500 hover:text-white text-sm transition-colors"
        >
          &larr; Back to stepzsync.com
        </a>
      </div>
    </div>
  );
}
