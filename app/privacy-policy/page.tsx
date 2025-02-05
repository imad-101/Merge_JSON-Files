const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-8 px-6 md:px-24 border my-7 bg-yello-50 rounded-lg w-[22rem] sm:w-2/3">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 ">
        Privacy Policy for JSON File Merger
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Our Privacy Commitment
        </h2>
        <p className="text-gray-600">
          When you merge JSON files using our free online tool, your privacy is
          our priority. This policy explains how our JSON merger handles your
          data during the file combination process.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          JSON File Processing & Security
        </h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>
            <strong>In-Browser Processing:</strong> All JSON merging occurs
            locally in your browser
          </li>
          <li>
            <strong>Zero Storage Policy:</strong> We never store your JSON files
            on any servers
          </li>
          <li>
            <strong>Instant Processing:</strong> Files are merged and
            immediately available for download
          </li>
          <li>
            <strong>Data Structure Protection:</strong> Your JSON structure
            remains intact during merging
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Data Collection & Usage
        </h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>
            No registration or personal information required to merge JSON files
          </li>
          <li>Anonymous usage analytics to improve our JSON merger tool</li>
          <li>Essential cookies for tool functionality only</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Security Measures
        </h2>
        <p className="text-gray-600">
          Our JSON file merger employs client-side processing technology,
          ensuring your data never leaves your browser. We use HTTPS encryption
          and implement security best practices for safe JSON file merging.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          User Rights & Control
        </h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Use our JSON merger tool without creating an account</li>
          <li>Control browser cookies and analytics preferences</li>
          <li>Download merged JSON files instantly without registration</li>
          <li>
            Contact us about privacy at
            <a
              href="mailto:techemad.web@gmail.com"
              className="text-blue-500 hover:underline"
            >
              {" "}
              techemad.web@gmail.com
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Policy Updates
        </h2>
        <p className="text-gray-600">
          We may update this privacy policy to reflect improvements in our JSON
          merging tool. Check this page periodically for changes in how we
          handle your data during JSON file processing.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
