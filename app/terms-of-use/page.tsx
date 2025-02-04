const TermsOfUse = () => {
  return (
    <div className="container p-8 px-24 border my-7 w-2/3 mx-auto rounded-xl">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p className="text-gray-700">
          Welcome to <span className="font-semibold">Merge JSON Files</span>. By
          using our JSON File Merger tool, you agree to the following terms and
          conditions. Please read them carefully.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Acceptable Use</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>You agree to use our service only for lawful purposes.</li>
          <li>
            You may not upload, process, or merge JSON files containing
            sensitive, illegal, or copyrighted data.
          </li>
          <li>
            You must not attempt to exploit, hack, or interfere with the
            functionality of our tool.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Service Availability</h2>
        <p className="text-gray-700">
          We strive to keep our tool available at all times but do not guarantee
          uninterrupted service. We reserve the right to modify or discontinue
          the service without prior notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">User Data & Privacy</h2>
        <p className="text-gray-700">
          We do not store or share your uploaded JSON files. Our tool processes
          files securely without retaining data. For more details, please review
          our{" "}
          <a href="/privacy-policy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
        <p className="text-gray-700">
          We are not responsible for any data loss, errors, or issues that may
          arise from the use of our tool. You use our service at your own risk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Changes to These Terms</h2>
        <p className="text-gray-700">
          We may update these Terms of Use at any time. Changes will be posted
          on this page with the updated revision date.
        </p>
      </section>
    </div>
  );
};
export default TermsOfUse;
