import AppLayout from "../components/layouts/AppLayout";

const PrivacyPolicy = () => {
  return (
    <AppLayout className="flex flex-col font-inter text-[0.938rem] leading-[1.5em] tracking-[0.25px] pt-[8rem] px-[1.125rem] pb-[2.875rem]">
      <h1 className="font-lal text-center text-[1.5rem] leading-[2.351rem] tracking-[-0.25px] mb-[1.125rem]">
        Privacy Policy
      </h1>
      <h4 className="font-semibold">1. Introduction:</h4>
      <p className="mb-4">
        Jasere ("we," "our," or "us") is committed to protecting the privacy of
        our users ("you" or "your"). This Privacy Policy explains how we
        collect, use, and safeguard your information when you use our app. By
        using Jasere, you agree to the collection and use of information in
        accordance with this policy.
      </p>

      <h4 className="font-semibold">2. Information We Collect</h4>
      <ul className="mb-4 pl-[1.125rem]">
        <li>
          Personal Information: We may collect personal information that can
          directly identify you, such as your name, email address, or phone
          number, but only if you choose to provide it. You can use the Jasere
          app without providing any personal information.
        </li>
        <li>
          Non-Personal Information: We may collect non-personal information such
          as device type, operating system, and usage data to improve our app
          and services.
        </li>
      </ul>

      <h4 className="font-semibold">3. How We Use Your Information</h4>
      <ul className="mb-4 pl-[1.125rem]">
        <li>To improve the functionality of Jasere.</li>
        <li>
          To monitor and analyze usage patterns to enhance user experience.
        </li>
        <li>
          If provided, to communicate with you regarding updates, offers, or
          support.
        </li>
      </ul>

      <h4 className="font-semibold">4. Data Security: </h4>
      <p className="mb-4">
        We implement appropriate technical and organizational measures to
        protect your data from unauthorized access, alteration, or destruction.
      </p>

      <h4 className="font-semibold">5. Changes to This Privacy Policy: </h4>
      <p className="mb-4 pl-[1.125rem]">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on our app. You are
        advised to review this Privacy Policy periodically for any changes.
      </p>

      <h4 className="font-semibold">6. Contact Us:</h4>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at{" "}
        <a href="mailto:jaseregames@gmail.com">jaseregames@gmail.com </a>
      </p>
    </AppLayout>
  );
};

export default PrivacyPolicy;
