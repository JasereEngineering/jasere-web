import AppLayout from "../components/layouts/AppLayout";

const Terms = () => {
  return (
    <AppLayout className="flex flex-col font-inter text-[0.938rem] leading-[1.5em] tracking-[0.25px] pt-[8rem] px-[1.125rem] pb-[2.875rem]">
      <h1 className="font-lal text-center text-[1.5rem] leading-[2.351rem] tracking-[-0.25px] mb-[1.125rem]">
        Terms Of Use
      </h1>
      <h4 className="font-semibold">1. Acceptance of Terms:</h4>
      <p className="mb-4">
        By downloading, installing, or using the Jasere app, you agree to be
        bound by these Terms of Service ("Terms"). If you do not agree to these
        Terms, do not use the app.
      </p>

      <h4 className="font-semibold">2. Use of the App</h4>
      <ul className="mb-4 pl-[1.125rem]">
        <li>
          Eligibility: You must be at least 13 years old to use the Jasere app.
          By using the app, you confirm that you are at least 13 years old.
        </li>
        <li>
          License: Jasere grants you a non-exclusive, non-transferable,
          revocable license to use the app for personal, non-commercial purposes
          in accordance with these Terms.
        </li>
        <li>
          Prohibited Activities: You agree not to:
          <ul className="pl-[1.125rem]">
            <li>Use the app for any illegal or unauthorized purpose.</li>
            <li>Modify, adapt, hack, or reverse engineer the app.</li>
            <li>Interfere with or disrupt the operation of the app.</li>
          </ul>
        </li>
      </ul>

      <h4 className="font-semibold">3. User-Generated Content</h4>
      <ul className="mb-4 pl-[1.125rem]">
        <li>
          Responsibility: You are solely responsible for any content you upload,
          post, or share within the app. Jasere does not endorse any
          user-generated content and is not liable for any content posted by
          users.
        </li>
        <li>
          License to Jasere: By posting content, you grant Jasere a worldwide,
          non-exclusive, royalty-free license to use, display, and distribute
          your content within the app.
        </li>
      </ul>

      <h4 className="font-semibold">4. Privacy Policy:</h4>
      <p className="mb-4">
        Your use of the app is also governed by our Privacy Policy, which is
        incorporated into these Terms by reference. Please review the Privacy
        Policy to understand how we collect, use, and protect your information.
      </p>

      <h4 className="font-semibold">5. Intellectual Property</h4>
      <ul className="mb-4 pl-[1.125rem]">
        <li>
          Ownership: All intellectual property rights in the app, including but
          not limited to text, graphics, logos, and software, are owned by or
          licensed to Jasere.
        </li>
        <li>
          Restrictions: You may not reproduce, distribute, or create derivative
          works based on the app's content without express written permission
          from Jasere.
        </li>
      </ul>

      <h4 className="font-semibold">6. Termination:</h4>
      <p className="mb-4">
        Jasere reserves the right to terminate or suspend your access to the app
        at any time, with or without notice, for any reason, including but not
        limited to a breach of these Terms.
      </p>

      <h4 className="font-semibold">7. Disclaimers</h4>
      <ul className="mb-4 pl-[1.125rem]">
        <li>
          As-Is Basis: The app is provided on an "as-is" and "as-available"
          basis. Jasere makes no warranties, either express or implied,
          regarding the app's operation, performance, or content.
        </li>
        <li>
          Limitation of Liability: To the maximum extent permitted by law,
          Jasere shall not be liable for any indirect, incidental, special, or
          consequential damages arising out of or related to your use of the
          app.
        </li>
      </ul>

      <h4 className="font-semibold">8. Changes to the Terms:</h4>
      <p className="mb-4">
        We may modify these Terms from time to time. If we make material
        changes, we will notify you by posting the updated Terms on the app.
        Your continued use of the app after any changes signifies your
        acceptance of the new Terms.
      </p>

      <h4 className="font-semibold">9. Governing Law: </h4>
      <p className="mb-4">
        These Terms shall be governed by and construed in accordance with the
        laws of [Your Country/State], without regard to its conflict of law
        principles.
      </p>

      <h4 className="font-semibold">10. Contact Us: </h4>
      <p>
        If you have any questions or concerns about these Terms, please contact
        us at <a href="mailto:jaseregames@gmail.com">jaseregames@gmail.com</a> 
      </p>
    </AppLayout>
  );
};

export default Terms;
