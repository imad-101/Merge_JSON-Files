const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-8 px-6 md:px-24 border my-7 bg-yello-50 rounded-lg  w-2/3">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">
        Privacy Policy
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Introduction
        </h2>
        <p className="text-gray-600">
          Welcome to <span className="font-semibold">Merge JSON Files</span>!
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          JSON File Merger tool.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Information We Collect
        </h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>
            <strong>User-Provided Data:</strong> No personal data is required to
            merge JSON files.
          </li>
          <li>
            <strong>Uploaded Files:</strong> Your JSON files are processed
            securely and not stored on our servers.
          </li>
          <li>
            <strong>Cookies & Analytics:</strong> We may use cookies and
            third-party analytics tools to improve services.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>To provide and enhance our JSON merging functionality.</li>
          <li>To analyze website traffic and improve user experience.</li>
          <li>To ensure security and prevent fraudulent activity.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Data Security
        </h2>
        <p className="text-gray-600">
          We implement strong security measures to protect your data. All file
          processing is done in a secure environment, and we do not store or
          share your JSON files.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Third-Party Links
        </h2>
        <p className="text-gray-600">
          Our website may contain links to third-party websites. We are not
          responsible for their privacy policies and encourage you to read their
          terms before interacting with them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Your Rights
        </h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>
            You can request information about any data we may have collected.
          </li>
          <li>You can opt out of analytics tracking.</li>
          <li>
            You can contact us for privacy concerns at
            <a
              href="mailto:[Your Contact Email]"
              className="text-blue-500 hover:underline"
            >
              {" "}
              techemad.web@gmail.com
            </a>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Updates to This Policy
        </h2>
        <p className="text-gray-600">
          We may update this policy periodically. Changes will be posted on this
          page with the updated revision date.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
