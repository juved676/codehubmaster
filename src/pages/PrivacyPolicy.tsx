import { SEO } from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - CodeHubMaster"
        description="Read CodeHubMaster's privacy policy. Learn how we collect, use, and protect your personal data. GDPR and CCPA compliant."
        keywords="privacy policy, data protection, GDPR, CodeHubMaster privacy"
        canonical="https://codehubmaster.site/privacy-policy"
      />

      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-center mb-4 text-foreground">Privacy Policy</h1>
          <p className="text-center text-muted-foreground mb-2">Last Updated: March 24, 2026</p>
          <p className="text-center text-muted-foreground mb-12">Effective Date: January 1, 2026</p>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p>
                Welcome to CodeHubMaster ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at codehubmaster.site (the "Site") and use our AI-powered coding assistant services (the "Services").
              </p>
              <p className="mt-3">
                By accessing or using our Site and Services, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use our Site or Services. We encourage you to read this policy carefully and contact us if you have any questions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Personal Information You Provide</h3>
              <p>When you create an account, subscribe to a plan, or contact us, we may collect the following personal information:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
                <li><strong className="text-foreground">Account Information:</strong> Your email address and password when you register for an account on our platform.</li>
                <li><strong className="text-foreground">Profile Information:</strong> Your preferred programming language, study level (school, college, or research), and any other optional profile details you choose to provide.</li>
                <li><strong className="text-foreground">Payment Information:</strong> When you purchase a subscription plan, we collect transaction details such as payment method, transaction ID, and payment status. We do not directly store your credit card or bank account numbers — payment processing is handled by our secure third-party payment providers.</li>
                <li><strong className="text-foreground">Communication Data:</strong> Any information you include in emails, support requests, or feedback messages sent to us at support@codehubmaster.com.</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.2 Information Collected Automatically</h3>
              <p>When you visit our Site, certain information is collected automatically through cookies and similar technologies:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
                <li><strong className="text-foreground">Usage Data:</strong> Pages visited, time spent on each page, links clicked, and features used within our platform.</li>
                <li><strong className="text-foreground">Device Information:</strong> Browser type and version, operating system, device type (desktop, mobile, tablet), and screen resolution.</li>
                <li><strong className="text-foreground">Log Data:</strong> IP address, access times, referring URLs, and error logs generated during your use of the Site.</li>
                <li><strong className="text-foreground">Questions and Interactions:</strong> The coding questions you submit to our AI assistant and the corresponding answers generated, which help us improve our AI models and service quality.</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
              <p>
                We use cookies, web beacons, and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device that help us remember your preferences, understand how you use our Site, and improve our Services. You can control cookie settings through your browser preferences, though disabling cookies may affect certain features of the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
                <li><strong className="text-foreground">Service Delivery:</strong> To provide, maintain, and improve our AI-powered coding assistant, including generating accurate answers to your programming questions.</li>
                <li><strong className="text-foreground">Account Management:</strong> To create and manage your user account, process subscriptions, track credit usage, and handle payments securely.</li>
                <li><strong className="text-foreground">Personalization:</strong> To customize your learning experience based on your skill level, preferred programming language, and usage patterns.</li>
                <li><strong className="text-foreground">Communication:</strong> To send you important account notifications, respond to your inquiries, and provide customer support.</li>
                <li><strong className="text-foreground">Analytics and Improvement:</strong> To analyze usage trends, measure the effectiveness of our content, and make data-driven decisions to enhance the platform.</li>
                <li><strong className="text-foreground">Security:</strong> To detect, prevent, and address fraud, abuse, security incidents, and technical issues that may affect our platform.</li>
                <li><strong className="text-foreground">Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Google AdSense and Advertising</h2>
              <p>
                Our Site uses Google AdSense to display advertisements. Google AdSense is an advertising service provided by Google LLC. Google may use cookies and web beacons to serve ads based on your prior visits to our Site and other websites on the Internet.
              </p>
              <p className="mt-3">
                Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our Site and other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.
              </p>
              <p className="mt-3">
                Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. You can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Sharing and Disclosure</h2>
              <p>We do not sell your personal information to third parties. We may share your information in the following limited circumstances:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
                <li><strong className="text-foreground">Service Providers:</strong> We share data with trusted third-party service providers who assist us in operating our platform, including Supabase (database and authentication), payment processors, and analytics providers. These providers are contractually obligated to protect your data.</li>
                <li><strong className="text-foreground">Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect the rights, property, or safety of CodeHubMaster, our users, or the public.</li>
                <li><strong className="text-foreground">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission using SSL/TLS protocols, secure authentication through Supabase Auth, role-based access controls, regular security audits, and secure audit logging of sensitive operations.
              </p>
              <p className="mt-3">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. We encourage you to use strong, unique passwords and to keep your login credentials confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as needed to provide you with our Services. If you close your account, we will delete or anonymize your personal data within 90 days, except where retention is required by law, for legitimate business purposes, or to resolve disputes. Usage logs and aggregated, non-identifiable data may be retained indefinitely for analytics and service improvement purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Your Rights and Choices</h2>
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
                <li><strong className="text-foreground">Access:</strong> You can request a copy of the personal data we hold about you.</li>
                <li><strong className="text-foreground">Correction:</strong> You can request that we correct any inaccurate or incomplete information.</li>
                <li><strong className="text-foreground">Deletion:</strong> You can request that we delete your personal data, subject to certain legal exceptions.</li>
                <li><strong className="text-foreground">Opt-Out:</strong> You can opt out of receiving promotional emails by following the unsubscribe link in our emails.</li>
                <li><strong className="text-foreground">Cookie Preferences:</strong> You can manage your cookie preferences through your browser settings.</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, please contact us at <a href="mailto:support@codehubmaster.com" className="text-primary hover:underline">support@codehubmaster.com</a>. We will respond to your request within 30 days.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
              <p>
                Our Services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13 without parental consent, we will take steps to delete that information promptly. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. International Data Transfers</h2>
              <p>
                Our Services are operated globally, and your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. By using our Services, you consent to the transfer of your information to these countries. We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party websites, services, or resources that are not owned or controlled by CodeHubMaster. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit. This Privacy Policy applies only to information collected by our Site and Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a revised "Last Updated" date. Your continued use of our Site and Services after any changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Us</h2>
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
              <div className="mt-3 bg-muted/50 p-6 rounded-lg">
                <p><strong className="text-foreground">CodeHubMaster</strong></p>
                <p className="mt-2">Email: <a href="mailto:support@codehubmaster.com" className="text-primary hover:underline">support@codehubmaster.com</a></p>
                <p className="mt-1">Website: <a href="https://codehubmaster.site" className="text-primary hover:underline">https://codehubmaster.site</a></p>
                <p className="mt-3 text-sm">We typically respond to all privacy-related inquiries within 24–48 hours during business days.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
