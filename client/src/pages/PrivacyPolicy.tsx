import { Helmet } from "react-helmet";
import { Link } from "wouter";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Super Health Care</title>
        <meta name="description" content="Super Health Care's privacy policy outlines how we collect, use, and protect your personal information." />
        <meta property="og:title" content="Privacy Policy | Super Health Care" />
        <meta property="og:description" content="Learn about how we handle and protect your personal information at Super Health Care." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superhealthcare.co.uk/privacy-policy" />
      </Helmet>
      
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-raleway font-bold text-3xl md:text-4xl text-primary mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>Last updated: January 1, 2023</p>
              
              <h2>1. Introduction</h2>
              <p>
                Super Health Care ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
              
              <h2>2. Collection of Your Information</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
              <ul>
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, address, email address, telephone number, and demographic information that you voluntarily give to us when you register with us or when you choose to participate in various activities related to our services.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access our site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.</li>
                <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase our services.</li>
                <li><strong>Health Data:</strong> Information about your health, medical conditions, and care needs that you share with us to help us provide appropriate services.</li>
              </ul>
              
              <h2>3. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site or our services to:</p>
              <ul>
                <li>Create and manage your account.</li>
                <li>Deliver services and support to you.</li>
                <li>Email you regarding your account or service changes.</li>
                <li>Process payments and refunds.</li>
                <li>Respond to your inquiries and support requests.</li>
                <li>Send you a newsletter, marketing, or promotional materials.</li>
                <li>Increase the efficiency and operation of our services.</li>
                <li>Monitor and analyze usage and trends to improve your experience with our services.</li>
                <li>Comply with our legal and regulatory obligations.</li>
              </ul>
              
              <h2>4. Disclosure of Your Information</h2>
              <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
              <ul>
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                <li><strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.</li>
                <li><strong>Interactions with Other Users:</strong> If you interact with other users of our site, those users may see your name, profile photo, and descriptions of your activity.</li>
                <li><strong>Online Postings:</strong> When you post comments, contributions, or other content to the site, your posts may be viewed by all users and may be publicly distributed outside the site in perpetuity.</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              </ul>
              
              <h2>5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
              
              <h2>6. Your Rights Regarding Your Data</h2>
              <p>You have certain rights regarding the personal information we collect about you:</p>
              <ul>
                <li><strong>Right to Access:</strong> You have the right to request copies of your personal information.</li>
                <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
              
              <h2>7. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <address>
                Super Health Care<br />
                123 Care Street<br />
                London, SW1A 1AA<br />
                Email: privacy@superhealthcare.co.uk<br />
                Phone: 01234 567 890
              </address>
              
              <div className="mt-8">
                <Link href="/contact" className="text-primary hover:underline">Contact Us</Link> | <Link href="/terms-conditions" className="text-primary hover:underline">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
