import { Helmet } from "react-helmet";
import { Link } from "wouter";

const TermsConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Super Health Care</title>
        <meta name="description" content="Read the terms and conditions for using Super Health Care's services." />
        <meta property="og:title" content="Terms & Conditions | Super Health Care" />
        <meta property="og:description" content="The terms and conditions governing the use of Super Health Care's services and website." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superhealthcare.co.uk/terms-conditions" />
      </Helmet>
      
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-raleway font-bold text-3xl md:text-4xl text-primary mb-8">Terms and Conditions</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>Last updated: January 1, 2023</p>
              
              <h2>1. Agreement to Terms</h2>
              <p>
                These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Super Health Care ("we," "us," or "our"), concerning your access to and use of our website and services.
              </p>
              <p>
                You agree that by accessing our website and/or services, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using our website and services and must discontinue use immediately.
              </p>
              
              <h2>2. Services</h2>
              <p>
                Super Health Care provides home care services to individuals in need of support with activities of daily living, personal care, companionship, and specialized care services.
              </p>
              <p>
                All services are subject to a formal assessment and care plan agreement. The specific services to be provided, their frequency, and associated costs will be detailed in a separate Care Agreement that will be provided to you before the commencement of services.
              </p>
              
              <h2>3. Care Assessment and Care Plans</h2>
              <p>
                Before services commence, we will conduct a comprehensive assessment of your needs. Based on this assessment, we will develop a personalized care plan in consultation with you and, where appropriate, your family members or representatives.
              </p>
              <p>
                Care plans will be regularly reviewed and updated as needed to ensure they continue to meet your requirements. You have the right to request a review of your care plan at any time.
              </p>
              
              <h2>4. Payments and Fees</h2>
              <p>
                Our fees for services are set out in our current fee schedule, which will be provided to you before the commencement of services. Fees may be subject to periodic review and adjustment.
              </p>
              <p>
                We typically invoice on a monthly basis, and payment is due within 14 days of the invoice date. We accept payment by direct debit, bank transfer, or credit/debit card.
              </p>
              <p>
                If you experience difficulty in meeting your payment obligations, please contact us as soon as possible to discuss alternative arrangements.
              </p>
              
              <h2>5. Cancellation Policy</h2>
              <p>
                If you need to cancel a scheduled visit, we request at least 24 hours' notice. Cancellations with less than 24 hours' notice may be charged at the full rate.
              </p>
              <p>
                To end our services entirely, we require 7 days' written notice. This notice period may be waived in exceptional circumstances at our discretion.
              </p>
              
              <h2>6. Liability</h2>
              <p>
                We maintain appropriate insurance coverage for our services. However, we are not liable for any loss or damage to your property unless it is caused by our negligence or willful misconduct.
              </p>
              <p>
                We are not responsible for any acts or omissions of third-party service providers that we may recommend to you.
              </p>
              
              <h2>7. Complaints Procedure</h2>
              <p>
                If you are dissatisfied with any aspect of our services, we encourage you to raise your concerns with us directly. We have a formal complaints procedure that will be provided to you at the commencement of services.
              </p>
              <p>
                All complaints will be taken seriously and investigated thoroughly. We are committed to resolving any issues promptly and to your satisfaction.
              </p>
              
              <h2>8. Confidentiality and Data Protection</h2>
              <p>
                We are committed to protecting your privacy and confidentiality. We will collect, store, and process your personal information in accordance with our Privacy Policy and applicable data protection laws.
              </p>
              <p>
                We will only share your information with third parties with your consent, except where required by law or for the proper provision of our services.
              </p>
              
              <h2>9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes to these Terms constitutes your acceptance of such changes.
              </p>
              
              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <address>
                Super Health Care<br />
                123 Care Street<br />
                London, SW1A 1AA<br />
                Email: info@superhealthcare.co.uk<br />
                Phone: 01234 567 890
              </address>
              
              <div className="mt-8">
                <Link href="/contact" className="text-primary hover:underline">Contact Us</Link> | <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
