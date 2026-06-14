import { Link } from 'react-router-dom';

function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-white mb-4 flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-1.5 h-4 w-1 flex-shrink-0 rounded-full bg-[#39FF14] glow-green"
        />
        <span>{title}</span>
      </h2>
      <div className="prose-legal text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-[#16213E] bg-[#0A0A0A]/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 text-xl font-bold rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span className="text-white">Stepz</span>
            <span className="text-[#39FF14]">Sync</span>
          </Link>
          <Link
            to="/"
            className="text-gray-500 hover:text-white transition-colors text-sm rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-gray-500">StepzSync</p>
          <span className="mt-4 inline-block rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 px-4 py-1.5 text-xs font-medium text-[#39FF14]">
            Effective Date: November 25, 2024
          </span>
        </div>

        <div className="border-t border-[#16213E] pt-12">
          <Section title="Acceptance of Terms">
            {`Welcome to StepzSync!

By accessing or using the StepzSync mobile application ("App"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, please do not use the App.

These Terms constitute a legally binding agreement between you and StepzSync. Please read them carefully.`}
          </Section>

          <Section title="Description of Service">
            {`StepzSync is a fitness racing application that enables users to:

Race Types:
\u2022 Solo Races - Individual fitness challenges
\u2022 Public Races - Open competitions with any users
\u2022 Private Races - Invite-only races with friends
\u2022 Marathon Races - Location-based endurance events
\u2022 Quick Races - Fast-paced challenges

Core Features:
\u2022 Real-time step tracking using device sensors
\u2022 GPS location tracking for Marathon races
\u2022 Live leaderboards and race rankings
\u2022 Friend connections and social features
\u2022 Performance statistics and analytics
\u2022 Achievement system

We reserve the right to modify, suspend, or discontinue any aspect of the service at any time, with or without notice.`}
          </Section>

          <Section title="User Accounts and Eligibility">
            {`Age Requirement:
You must be at least 13 years of age to use StepzSync. If you are under 18, you must have parental or guardian consent.

Account Creation:
You can create an account using:
\u2022 Email and password
\u2022 Google Sign-In
\u2022 Apple Sign-In

Your Responsibilities:
\u2022 Provide accurate and complete registration information
\u2022 Maintain the security of your account credentials
\u2022 Not share your account with others
\u2022 Notify us immediately of any unauthorized access (support@stepzsync.com)
\u2022 Keep your profile information up to date

You are fully responsible for all activities that occur under your account, whether authorized by you or not.`}
          </Section>

          <Section title="Acceptable Use Policy">
            {`You agree to use StepzSync only for lawful purposes and in accordance with these Terms.

You Must NOT:
\u2022 Violate any applicable laws or regulations
\u2022 Infringe on others' intellectual property rights
\u2022 Upload malicious code, viruses, or harmful software
\u2022 Harass, abuse, threaten, or harm other users
\u2022 Use bots, scripts, or automated tools to gain unfair advantages
\u2022 Cheat or manipulate race results in any way
\u2022 Impersonate others or create fake accounts
\u2022 Send spam or unsolicited messages
\u2022 Scrape or collect data without permission
\u2022 Attempt to gain unauthorized access to our systems
\u2022 Interfere with or disrupt the App or servers
\u2022 Use the App for commercial purposes without our permission

Violation of these terms may result in immediate account suspension or permanent termination.`}
          </Section>

          <Section title="Fair Play and Anti-Cheat Policy">
            {`StepzSync is built on the principle of fair competition. We have ZERO TOLERANCE for cheating.

Prohibited Activities:
\u2022 Artificial step inflation or manipulation
\u2022 GPS spoofing or location faking
\u2022 Using third-party apps to generate fake activity
\u2022 Sharing accounts during active races
\u2022 Coordinating with others to manipulate results
\u2022 Exploiting bugs or glitches for unfair advantages
\u2022 Device shaking or automated step generation

Anti-Cheat Measures:
We employ sophisticated detection systems including:
\u2022 Step rate validation (max 220 steps/minute)
\u2022 Activity pattern analysis
\u2022 Anomaly detection algorithms
\u2022 Manual review for suspicious activities

Penalties:
\u2022 First offense: Warning and race disqualification
\u2022 Second offense: Temporary account suspension (7-30 days)
\u2022 Third offense: Permanent account ban
\u2022 Severe cases: Immediate permanent ban without warning

Appeals can be submitted to: support@stepzsync.com`}
          </Section>

          <Section title="Health and Safety Disclaimer">
            {`IMPORTANT - PLEASE READ CAREFULLY:

StepzSync is a FITNESS TRACKING APPLICATION, NOT A MEDICAL DEVICE.

Before Using This App:
\u2022 Consult your doctor before starting any exercise program
\u2022 Ensure you are physically fit for walking/running activities
\u2022 If you have any medical conditions, seek professional advice first

While Using This App:
\u2022 Listen to your body and exercise within your limits
\u2022 Stop immediately if you feel pain, dizziness, or discomfort
\u2022 Stay aware of your surroundings at all times
\u2022 Follow all traffic laws when exercising outdoors
\u2022 Stay hydrated and take breaks as needed
\u2022 Do not use the App while driving or operating machinery

Disclaimer of Liability:
\u2022 StepzSync is NOT responsible for any injuries sustained while using the App
\u2022 Calorie, distance, and fitness calculations are ESTIMATES ONLY
\u2022 Do not rely on the App for medical decisions or emergency situations
\u2022 We are not liable for any health issues arising from App use

BY USING STEPZSYNC, YOU ACKNOWLEDGE THESE RISKS AND ASSUME FULL RESPONSIBILITY FOR YOUR HEALTH AND SAFETY.`}
          </Section>

          <Section title="Intellectual Property Rights">
            {`All content, features, and functionality of StepzSync, including but not limited to:
\u2022 Software code and architecture
\u2022 User interface and design
\u2022 Graphics, logos, and trademarks
\u2022 Text, images, and icons
\u2022 Race algorithms and formulas
\u2022 Anti-cheat systems

are owned by StepzSync and are protected by copyright, trademark, patent, and other intellectual property laws.

You May NOT:
\u2022 Copy, modify, distribute, or create derivative works
\u2022 Reverse engineer, decompile, or disassemble the App
\u2022 Remove copyright or proprietary notices
\u2022 Use our trademarks, logos, or branding without written permission
\u2022 Frame or mirror any part of the App

Limited license: We grant you a personal, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes.`}
          </Section>

          <Section title="User-Generated Content">
            {`You retain ownership of content you submit to StepzSync (profile pictures, usernames, race titles, etc.).

By submitting content, you grant StepzSync a worldwide, royalty-free, perpetual, irrevocable license to:
\u2022 Use, display, and distribute your content within the App
\u2022 Modify and adapt content for technical purposes
\u2022 Include content in promotional materials (with your permission)

Your Representations:
\u2022 You own or have rights to all content you submit
\u2022 Your content does not violate others' rights
\u2022 Your content complies with all applicable laws
\u2022 Your content does not contain offensive, harmful, or inappropriate material

We reserve the right to remove any content that violates these Terms or is otherwise objectionable.`}
          </Section>

          <Section title="Race Participation and Conduct">
            {`When Participating in Races:
\u2022 You agree to compete fairly and honestly
\u2022 Race results are final and determined by our tracking system
\u2022 We reserve the right to disqualify participants for rule violations
\u2022 You may be recorded on leaderboards and race history

Race Organizers:
\u2022 Can set race rules and participant limits
\u2022 May remove participants for violations
\u2022 Are responsible for race settings and configurations

We May:
\u2022 Cancel or postpone races due to technical issues
\u2022 Modify race features or mechanics
\u2022 Remove races that violate our policies
\u2022 Reset race results if cheating is detected`}
          </Section>

          <Section title="Privacy and Data Usage">
            {`Your privacy is important to us. Please review our Privacy Policy at:
https://stepzsync-750f9.web.app/privacy-policy

By using StepzSync, you consent to:
\u2022 Collection of fitness and health data (steps, distance, calories)
\u2022 Collection of location data during Marathon races
\u2022 Display of your username and statistics to other users
\u2022 Data usage as described in our Privacy Policy

Contact for privacy concerns: support@stepzsync.com`}
          </Section>

          <Section title="Limitation of Liability">
            {`TO THE MAXIMUM EXTENT PERMITTED BY LAW:

No Warranties:
StepzSync is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:
\u2022 Merchantability
\u2022 Fitness for a particular purpose
\u2022 Accuracy or reliability
\u2022 Uninterrupted or error-free operation

Limitation of Damages:
We shall NOT be liable for:
\u2022 Any indirect, incidental, special, consequential, or punitive damages
\u2022 Loss of profits, data, or goodwill
\u2022 Service interruptions or data loss
\u2022 Injuries or health issues from App use
\u2022 Third-party actions or content

Maximum Liability:
Our total liability to you shall not exceed the amount you paid us (if any) in the past 12 months.

Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so these limitations may not apply to you.`}
          </Section>

          <Section title="Indemnification">
            {`You agree to indemnify, defend, and hold harmless StepzSync, its affiliates, officers, directors, employees, and agents from any claims, damages, obligations, losses, liabilities, costs, or expenses arising from:

\u2022 Your use or misuse of the App
\u2022 Your violation of these Terms
\u2022 Your violation of others' rights
\u2022 Your content or activities
\u2022 Your violation of applicable laws
\u2022 Any injuries or damages you sustain while using the App`}
          </Section>

          <Section title="Account Termination">
            {`We May Suspend or Terminate Your Account:
\u2022 For violation of these Terms
\u2022 For suspected fraud, cheating, or illegal activity
\u2022 For prolonged inactivity (2+ years)
\u2022 For any reason at our sole discretion, with or without notice

You May Delete Your Account:
\u2022 Anytime through Settings > Account > Delete Account
\u2022 By emailing us at: support@stepzsync.com

Upon Termination:
\u2022 Your right to use the App immediately ceases
\u2022 Your account data will be deleted as per our Privacy Policy
\u2022 You remain liable for any outstanding obligations
\u2022 Provisions that should survive termination will remain in effect`}
          </Section>

          <Section title="Changes to Terms of Service">
            {`We may update these Terms from time to time to reflect changes in our services, technology, or legal requirements.

We Will Notify You:
\u2022 By posting updated Terms in the App
\u2022 By updating the "Effective Date" at the top
\u2022 By sending a push notification (for material changes)
\u2022 By sending an email (for significant changes)

Your continued use of the App after changes take effect constitutes acceptance of the new Terms.

If you do not agree to the updated Terms, you must stop using the App and delete your account.`}
          </Section>

          <Section title="Dispute Resolution and Governing Law">
            {`Informal Resolution:
If you have a dispute, please contact us first at: support@stepzsync.com
We will attempt to resolve the issue informally within 30 days.

Governing Law:
These Terms are governed by the laws of your country/region of residence.

Arbitration:
Any disputes that cannot be resolved informally may be subject to binding arbitration in accordance with applicable arbitration rules.

Class Action Waiver:
You agree to resolve disputes on an individual basis and waive any right to participate in class action lawsuits or class-wide arbitration.

Exceptions:
Either party may seek injunctive relief in court for intellectual property violations.`}
          </Section>

          <Section title="General Provisions">
            {`Entire Agreement:
These Terms and our Privacy Policy constitute the entire agreement between you and StepzSync.

Severability:
If any provision is found invalid, the remaining provisions will continue in full effect.

No Waiver:
Our failure to enforce any right or provision does not constitute a waiver of that right.

Assignment:
You may not assign these Terms. We may assign our rights and obligations without restriction.

Force Majeure:
We are not liable for delays or failures due to circumstances beyond our reasonable control.`}
          </Section>

          <Section title="Contact Information">
            {`If you have questions about these Terms of Service:

General Inquiries:
Email: support@stepzsync.com

Legal Matters:
Email: support@stepzsync.com
Subject: "Legal - Terms of Service Inquiry"

We will respond to inquiries within 5-7 business days.`}
          </Section>
        </div>

        {/* Footer */}
        <div className="border-t border-[#16213E] pt-10 mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-lg font-bold rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span className="text-white">Stepz</span>
            <span className="text-[#39FF14]">Sync</span>
          </Link>
          <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Home
            </Link>
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Privacy Policy
            </Link>
            <Link
              to="/delete-account"
              className="text-gray-400 hover:text-white transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Delete Account
            </Link>
          </nav>
          <p className="text-gray-600 text-sm mt-6">&copy; 2024-2026 StepzSync. All rights reserved.</p>
          <p className="text-gray-700 text-xs mt-2">App Version 4.0.0</p>
        </div>
      </main>
    </div>
  );
}
