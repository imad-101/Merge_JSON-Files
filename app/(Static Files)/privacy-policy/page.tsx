const PrivacyPolicy = () => {
  return (
    <div className="container p-8 border my-7 w-[22rem] sm:w-2/3 mx-auto rounded-xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="text-gray-700 mb-8">
        <p>Last updated: February 22, 2025</p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="text-gray-700">
          At merge-json-files.com, we take your privacy seriously. This Privacy
          Policy explains how we handle any information when you use our JSON
          processing tools, including our JSON merger, flattener, splitter, and
          format converters. We believe in complete transparency about our data
          practices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Data Processing and Storage
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Local Processing</h3>
            <p className="text-gray-700">
              All JSON file processing occurs entirely within your browser. Your
              files are never uploaded to our servers or stored anywhere outside
              your local device. This includes all operations such as merging,
              flattening, splitting, and format conversions.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No Data Retention</h3>
            <p className="text-gray-700">
              We maintain a strict no-storage policy. Any data processed through
              our tools is automatically cleared from your browser's memory once
              processing is complete. We do not retain any copies of your JSON
              files or their contents.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Usage Analytics</h3>
            <p className="text-gray-700">
              We collect anonymous usage statistics to improve our services,
              including:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              <li>Pages visited on our website</li>
              <li>Tools used and their frequency of use</li>
              <li>Browser type and version</li>
              <li>General geographic location (country/region level only)</li>
              <li>Device type (desktop/mobile)</li>
              <li>Error reports and performance data</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Cookies</h3>
            <p className="text-gray-700">
              We use essential cookies to ensure the proper functioning of our
              website. These cookies do not track personal information and are
              used solely for:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              <li>Maintaining website functionality</li>
              <li>Improving performance</li>
              <li>Remembering basic user preferences</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">HTTPS Encryption</h3>
            <p className="text-gray-700">
              All connections to our website are encrypted using HTTPS protocol,
              ensuring secure communication between your browser and our
              servers.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Browser Security</h3>
            <p className="text-gray-700">
              We recommend using modern, updated browsers to ensure the best
              security when using our tools. Our client-side processing approach
              means your data never leaves your browser's secure environment.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
        <p className="text-gray-700">
          We use the following third-party services:
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>Google Analytics for anonymous usage statistics</li>
          <li>CloudFlare for CDN services and DDoS protection</li>
        </ul>
        <p className="mt-4 text-gray-700">
          These services may collect basic usage data as outlined in their
          respective privacy policies. They do not have access to your JSON file
          contents or processing operations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Rights</h2>
        <p className="text-gray-700">You have the right to:</p>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>Opt out of non-essential cookies</li>
          <li>Request information about the data we collect</li>
          <li>Request deletion of any stored data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
        <p className="text-gray-700">
          Our services are not directed to children under 13. We do not
          knowingly collect or maintain information from persons under 13 years
          of age.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time. We will notify
          users of any material changes by posting the new Privacy Policy on
          this page and updating the "Last updated" date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:jsontools.web@gmail.com"
            className="text-blue-500 hover:underline"
          >
            jsontools.web@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
