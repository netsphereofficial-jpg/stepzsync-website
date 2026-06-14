import { Link } from 'react-router-dom';

function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
        <span aria-hidden="true" className="inline-block w-[3px] self-stretch min-h-[1.25rem] rounded-full bg-neon-green shrink-0" />
        <span>{title}</span>
      </h2>
      <div className="prose-legal text-gray-400 text-[15px] leading-relaxed whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#16213E] bg-[#0A0A0A]/95 backdrop-blur-md py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 text-xl font-bold rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
          >
            <span className="text-white">Stepz</span>
            <span className="text-[#39FF14]">Sync</span>
          </Link>
          <Link
            to="/"
            className="text-gray-500 hover:text-white transition-colors text-sm rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-500">Your Fitness Racing Companion</p>
          <p className="mt-4">
            <span className="inline-block border border-[#16213E] rounded-full px-3 py-1 text-xs text-gray-500">
              Effective Date: November 25, 2024
            </span>
          </p>
        </div>

        <div className="border-t border-[#16213E] pt-12">
          <Section title="Introduction">
            {`Welcome to StepzSync ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application StepzSync (the "App").

By using the App, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use the App.`}
          </Section>

          <Section title="Information We Collect">
            {`We collect information that you provide directly to us when you:

• Create an account using email, Google Sign-In, or Apple Sign-In
• Update your profile information
• Participate in races (Solo, Public, Private, Marathon, Quick Race)
• Communicate with other users
• Contact our support team

Types of information we collect:

• Account Information: Name, email address, profile picture
• Health & Fitness Data: Steps count, distance traveled, calories burned, speed metrics
• Location Data: GPS coordinates during races, start/end locations for races
• Device Information: Device model, operating system, unique device identifiers
• Usage Data: App interactions, race participation, performance statistics
• Social Data: Friend connections, race invitations, chat messages`}
          </Section>

          <Section title="Health and Fitness Data">
            {`StepzSync integrates with your device's health and fitness tracking systems:

iOS (Apple HealthKit):
• We read step count, walking/running distance, and active energy data
• Data is accessed only when you participate in races
• You can revoke access anytime in Settings > Privacy > Health

Android (Google Fit / Health Connect):
• We access step count, distance, and calorie data
• Data is synchronized for race tracking purposes
• You can revoke access anytime in device settings

How we use health data:
• Track your race progress in real-time
• Calculate your position on leaderboards
• Display your performance statistics
• Verify race completion
• Apply anti-cheat validation (step rate limits)

We do NOT:
• Share your health data with advertisers
• Sell your health data to third parties
• Use health data for purposes unrelated to the App

Your health data is encrypted and stored securely using Firebase Cloud Firestore.`}
          </Section>

          <Section title="Location Information">
            {`We collect precise location data when you:

• Participate in location-based races (Marathon races)
• Use GPS tracking during active races
• Set race start and end points (race organizers only)

Location data is used to:
• Track your real-time position during races
• Display your location on race maps
• Calculate distance traveled
• Verify you reached race endpoints
• Show nearby races (if feature is enabled)

Location permissions:
• "When In Use" - We only access location while you're actively using the race features
• You can disable location services anytime in device settings
• Disabling location will limit Marathon race features but won't affect step-based races

We do NOT track your location when the App is not in use.`}
          </Section>

          <Section title="How We Use Your Information">
            {`We use the collected information to:

Provide Core Services:
• Enable race creation and participation (Solo, Public, Private, Marathon, Quick Race)
• Track real-time race progress and rankings
• Generate leaderboards and statistics
• Send race invitations and notifications

Improve User Experience:
• Personalize your dashboard and race recommendations
• Analyze app usage to fix bugs and improve performance
• Develop new features based on usage patterns

Ensure Fair Play:
• Detect and prevent cheating using step rate validation
• Monitor suspicious activity patterns
• Ban users who violate fair play policies

Communication:
• Send race start reminders and notifications
• Notify you of friend requests and race invitations
• Send important app updates and announcements
• Respond to your support inquiries

Legal Compliance:
• Comply with applicable laws and regulations
• Enforce our Terms of Service
• Protect against fraud and abuse`}
          </Section>

          <Section title="Information Sharing and Disclosure">
            {`Information Visible to Other Users:
• Your username, profile picture, and race statistics are visible to other StepzSync users
• Your position on leaderboards is publicly visible within races
• Race organizers can see participants' race progress

Third-Party Service Providers:
We share data with trusted service providers who help us operate the App:

• Firebase (Google Cloud Platform) - Data storage, authentication, cloud functions
• Google Maps API - Location services for Marathon races
• Google Sign-In / Apple Sign-In - Authentication services
• Sentry - Error tracking and crash reporting
• Firebase Analytics - Usage analytics and app performance

These providers are contractually obligated to protect your data and use it only for providing services to us.

Legal Requirements:
We may disclose your information if required by law or to:
• Comply with legal processes (subpoenas, court orders)
• Protect our rights and property
• Prevent fraud or security threats
• Protect user safety

With Your Consent:
We may share information for other purposes with your explicit consent.

We Do NOT:
• Sell your personal information to third parties
• Share your health data with advertisers
• Rent or lease your information`}
          </Section>

          <Section title="Data Storage and Security">
            {`We implement industry-standard security measures:

Technical Safeguards:
• All data transmitted is encrypted using HTTPS/TLS
• Data at rest is encrypted using AES-256 encryption
• Firestore security rules restrict unauthorized access
• Anonymous authentication for race participation (privacy-first approach)

Organizational Safeguards:
• Access to personal data is restricted to authorized personnel only
• Regular security audits and updates
• Secure development practices and code reviews

Infrastructure:
• Data is stored on Google Cloud Platform (Firebase)
• Servers located in secure, SOC 2 certified data centers
• Automatic backups and disaster recovery

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`}
          </Section>

          <Section title="Data Retention">
            {`We retain your personal information for as long as necessary to:

• Provide the App services to you
• Maintain race history and statistics
• Comply with legal obligations
• Resolve disputes and enforce agreements

Active Accounts:
• Your data is retained while your account is active
• Race history is kept for statistical purposes

Account Deletion:
• You can request account deletion anytime in Settings > Account > Delete Account
• Upon deletion, we will remove your personal information within 30 days
• Anonymized race statistics may be retained for analytics
• Backup data is purged within 60 days

Inactive Accounts:
• Accounts inactive for 2+ years may be automatically deleted
• We will send a notice before deletion`}
          </Section>

          <Section title="Your Privacy Rights">
            {`Depending on your location, you may have the following rights:

Access (Right to Know):
• Request a copy of your personal information
• View what data we collect and how we use it

Correction:
• Update inaccurate or incomplete information
• Correct your profile details in Settings

Deletion (Right to be Forgotten):
• Request deletion of your account and personal data
• Delete your account in Settings > Account > Delete Account

Data Portability:
• Request a copy of your data in a machine-readable format
• Export your race history and statistics

Objection:
• Object to certain data processing activities
• Opt-out of marketing communications

Withdraw Consent:
• Revoke health data access permissions
• Disable location services
• Turn off push notifications

To exercise these rights, contact us at: support@stepzsync.com

We will respond to your request within 30 days.`}
          </Section>

          <Section title="Children's Privacy (COPPA Compliance)">
            {`StepzSync is NOT intended for children under the age of 13.

We do not knowingly collect personal information from children under 13. If you are under 13, please do not use the App or provide any information.

If we learn that we have collected information from a child under 13 without parental consent, we will delete that information immediately.

If you believe we may have collected information from a child under 13, please contact us at: support@stepzsync.com`}
          </Section>

          <Section title="Third-Party Services and Integrations">
            {`StepzSync integrates with the following third-party services:

Authentication:
• Google Sign-In (Google LLC)
• Apple Sign-In (Apple Inc.)
• Privacy Policies: Available on respective provider websites

Maps and Location:
• Google Maps Platform (Google LLC)

Backend Services:
• Firebase (Google Cloud Platform)
  - Authentication
  - Cloud Firestore (Database)
  - Cloud Functions
  - Cloud Storage
  - Analytics

Health Data:
• Apple HealthKit (iOS)
• Google Fit / Health Connect (Android)

Error Tracking:
• Sentry (Functional Software Inc.)

These third-party services have their own privacy policies. We encourage you to review them.`}
          </Section>

          <Section title="Push Notifications">
            {`We may send you push notifications for:

Race Activity:
• Race start reminders
• Race invitations from friends
• Race countdown alerts (5 min, 1 min before start)
• Race completion notifications

Social Features:
• Friend requests
• Race invitations
• Achievement unlocks

Important Updates:
• App updates and new features
• Security alerts
• Policy changes

You can disable push notifications anytime in:
• iOS: Settings > StepzSync > Notifications
• Android: Settings > Apps > StepzSync > Notifications`}
          </Section>

          <Section title="International Data Transfers">
            {`Your information may be transferred to and processed in countries other than your country of residence, including the United States where our servers (Google Cloud Platform) are located.

These countries may have data protection laws different from your country. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.

Safeguards:
• Standard Contractual Clauses (SCCs) for EU data transfers
• Adherence to Privacy Shield principles
• Google Cloud Platform's global compliance certifications`}
          </Section>

          <Section title="California Privacy Rights (CCPA)">
            {`If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):

• Right to know what personal information is collected
• Right to know if personal information is sold or disclosed
• Right to say no to the sale of personal information (we do NOT sell)
• Right to access your personal information
• Right to request deletion of personal information
• Right to non-discrimination for exercising your rights

To exercise these rights, email: support@stepzsync.com`}
          </Section>

          <Section title="European Privacy Rights (GDPR)">
            {`If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR):

• Right to access your personal data
• Right to rectification of inaccurate data
• Right to erasure ("right to be forgotten")
• Right to restrict processing
• Right to data portability
• Right to object to processing
• Right to withdraw consent
• Right to lodge a complaint with a supervisory authority

Legal basis for processing:
• Contract performance (providing the App services)
• Legitimate interests (improving the App, preventing fraud)
• Consent (for health data, location data)

To exercise these rights, email: support@stepzsync.com`}
          </Section>

          <Section title="Changes to This Privacy Policy">
            {`We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.

We will notify you of any material changes by:
• Posting the updated Privacy Policy in the App
• Updating the "Effective Date" at the top
• Sending a push notification (for significant changes)
• Sending an email notification (for significant changes)

Your continued use of the App after the changes take effect constitutes your acceptance of the updated Privacy Policy.

We encourage you to review this Privacy Policy periodically.`}
          </Section>

          <Section title="Contact Us">
            {`If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

Email: support@stepzsync.com

Data Protection Inquiries: support@stepzsync.com

We will respond to your inquiry within 30 days (or as required by applicable law).

For EU residents: You have the right to lodge a complaint with your local data protection authority if you believe we have not adequately addressed your concerns.`}
          </Section>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#16213E] pt-8 mt-12">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-base font-bold rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
              >
                <span className="text-white">Stepz</span>
                <span className="text-[#39FF14]">Sync</span>
              </Link>
              <p className="text-gray-600 text-sm mt-1">&copy; 2024-2026 StepzSync. All rights reserved.</p>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                to="/"
                className="text-gray-500 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
              >
                Home
              </Link>
              <Link
                to="/privacy-policy"
                className="text-gray-500 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-500 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
          <p className="text-gray-700 text-xs mt-6 text-center">App Version 4.0.0</p>
        </footer>
      </main>
    </div>
  );
}
