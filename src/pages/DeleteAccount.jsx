import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DeleteAccount() {
  const [form, setForm] = useState({ username: '', fullName: '', email: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Import Firebase dynamically to keep the page lightweight
      const { initializeApp } = await import('firebase/app');
      const { getFirestore, collection, addDoc, serverTimestamp } = await import('firebase/firestore');

      const app = initializeApp({
        apiKey: "AIzaSyD2DmimsS1ObB85DKdbJ7Wfc6eomBRISfY",
        authDomain: "stepzsync-750f9.firebaseapp.com",
        projectId: "stepzsync-750f9",
        storageBucket: "stepzsync-750f9.firebasestorage.app",
        messagingSenderId: "1061746314202",
        appId: "1:1061746314202:web:4687e04fd5a04bc708cee3",
      }, 'deletion-form');

      const db = getFirestore(app);
      await addDoc(collection(db, 'account_deletion_requests'), {
        username: form.username.trim(),
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        reason: form.reason.trim(),
        requestedAt: serverTimestamp(),
        status: 'pending',
        processedAt: null,
        processedBy: null,
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting deletion request:', err);
      setError('Failed to submit request. Please try again or contact support@stepzsync.com');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#021F29] border border-[#0F3460] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#2759FF] focus-visible:outline-2 focus-visible:outline-offset-2 outline-[#2759FF]/40 transition-colors";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#16213E]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 text-xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 outline-white/50 rounded"
          >
            <span className="text-white">Stepz</span>
            <span className="text-[#39FF14]">Sync</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 outline-white/50 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-14 md:py-16">
        {submitted ? (
          /* Success View */
          <div className="text-center py-16 md:py-20">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-green">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] mb-4">Request Submitted Successfully</h1>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-2">We have received your account deletion request.</p>
            <p className="text-gray-500 text-sm mb-8">Your account will be deleted within 30 days.</p>

            <div className="bg-[#021F29] border border-[#0F3460] rounded-xl p-6 text-left max-w-md mx-auto">
              <p className="text-white font-semibold mb-3">What happens next:</p>
              <ul className="text-gray-400 text-sm space-y-2 leading-relaxed">
                <li>&#8226; We will verify your identity</li>
                <li>&#8226; Your account will be deleted within 30 days</li>
                <li>&#8226; You will receive a confirmation email</li>
                <li>&#8226; All your data will be permanently removed</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-[#16213E]">
                <p className="text-gray-500 text-xs">Need help? Contact us at: <span className="text-[#2759FF]">support@stepzsync.com</span></p>
              </div>
            </div>

            <Link
              to="/"
              className="btn-secondary mt-8 px-6 py-3.5 text-sm font-medium gap-2 group focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        ) : (
          /* Form View */
          <>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5 glow-red">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-neon-pink mb-4">Manage Your Account</p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] mb-2">Account Deletion Request</h1>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">We're sorry to see you go</p>
            </div>

            {/* Warning */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-orange-300 font-semibold mb-2">Important Information</p>
                  <p className="text-orange-200/70 text-sm leading-relaxed whitespace-pre-line">
                    Once your account is deleted:
                    {'\n\n'}&#8226; All your race history will be permanently removed
                    {'\n'}&#8226; Your profile and statistics will be deleted
                    {'\n'}&#8226; You won't be able to recover your account
                    {'\n'}&#8226; Active races will be cancelled
                    {'\n'}&#8226; This action cannot be undone
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="text-white font-semibold text-lg">Please fill in your details</p>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">We need this information to verify your identity and process your deletion request.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username *</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your StepzSync username"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Deletion (Optional)</label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Help us improve by telling us why you're leaving"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm leading-relaxed">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 outline-red-500"
              >
                {loading ? 'Submitting...' : 'Request Account Deletion'}
              </button>

              <p className="text-center text-gray-500 text-sm">
                Prefer to email us directly?{' '}
                <a href="mailto:support@stepzsync.com" className="text-[#2759FF] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 outline-[#2759FF] rounded">
                  support@stepzsync.com
                </a>
              </p>
            </form>
          </>
        )}
      </main>

      {/* Branded footer bar */}
      <footer className="border-t border-[#16213E] py-8 mt-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <Link to="/" className="flex items-center gap-1 text-base font-bold tracking-tight">
            <span className="text-white">Stepz</span>
            <span className="text-[#39FF14]">Sync</span>
          </Link>
          <p className="text-gray-600 text-xs">Real Steps. Real Races. Real Time.</p>
          <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} StepzSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
