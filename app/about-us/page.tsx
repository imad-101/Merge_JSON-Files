const AboutUs = () => {
  return (
    <div className="container p-8 border my-7 rounded-xl mx-auto w-[22rem] sm:w-2/3">
      <h1 className="text-3xl font-bold mb-4">
        About Our JSON File Merger Tool
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Simple JSON File Merging
        </h2>
        <p className="text-gray-700">
          Merge JSON Files provides a free online tool for combining multiple
          JSON files instantly. Built for developers, data analysts, and anyone
          working with JSON data, our tool simplifies the process of merging
          JSON files while maintaining perfect data structure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          What Makes Our JSON Merger Different
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Instant JSON file processing with no signup required</li>
          <li>
            Clean, ad-free interface focused on merging JSON files efficiently
          </li>
          <li>
            Secure in-browser processing &mdash; no file storage or data
            collection
          </li>
          <li>Support for merging multiple JSON files of any size</li>
          <li>Perfect preservation of JSON structure and arrays</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Security &amp; Privacy Focus
        </h2>
        <p className="text-gray-700">
          Our JSON merger processes all files directly in your browser. We never
          store your JSON files on servers, ensuring complete data privacy.
          Review our
          <a href="/privacy-policy" className="text-blue-500 hover:underline">
            &nbsp;Privacy Policy
          </a>
          &nbsp;for details about our security measures.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How to Merge JSON Files</h2>
        <p className="text-gray-700">
          Simply upload your JSON files, click merge, and download your combined
          JSON file instantly. No registration, no software installation, and no
          waiting. Try our free JSON merger tool today to streamline your data
          processing workflow.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-700">
          Questions about merging JSON files? Contact us at
          <a
            href="mailto:techemad.web@gmail.com"
            className="text-blue-500 hover:underline"
          >
            &nbsp;techemad.web@gmail.com
          </a>
          . We&apos;re here to help with your JSON file merging needs.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
