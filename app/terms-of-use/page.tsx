const TermsOfUse = () => {
  return (
    <div className="container p-8 border my-7 w-[22rem] sm:w-2/3 mx-auto rounded-xl">
      <h1 className="text-3xl font-bold mb-4">
        Terms of Use - JSON File Merger Tool
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p className="text-gray-700">
          Welcome to <span className="font-semibold">Merge JSON Files</span>,
          your trusted online JSON merger tool. These terms govern your use of
          our free JSON file combination service. By using our tool to merge
          JSON files online, you agree to these terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Service Features & Usage
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            Our JSON merger tool is provided free of charge with no registration
            required.
          </li>
          <li>
            We offer instant JSON file processing with a clean, ad-free
            interface.
          </li>
          <li>
            The service supports merging multiple JSON files while maintaining
            data structure.
          </li>
          <li>
            Use our tool for lawful purposes only - no sensitive or copyrighted
            data.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Data Security & Processing
        </h2>
        <p className="text-gray-700">
          Our JSON file merger processes your files securely in-browser. We
          maintain a strict no-storage policy - your JSON files are never saved
          on our servers. All processing occurs locally for maximum data privacy
          and security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Service Reliability</h2>
        <p className="text-gray-700">
          While we strive to maintain consistent uptime for our JSON merging
          service, we may occasionally update or modify the tool to improve
          performance. We recommend downloading your merged JSON files promptly
          after processing.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Liability & Warranties</h2>
        <p className="text-gray-700">
          Our free JSON merger tool is provided "as is" without warranties.
          Users are responsible for verifying merged JSON file accuracy. We
          recommend backing up your original JSON files before merging.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Terms Updates</h2>
        <p className="text-gray-700">
          These terms may be updated to reflect improvements to our JSON merging
          tool. Check this page periodically for changes. For questions about
          merging JSON files using our service, contact us via{" "}
          <a className="text-blue-500 hover:underline">
            techemad.web@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
