import Link from "next/link";
const AboutUs = () => {
  return (
    <div className="container p-8 border my-7 rounded-xl mx-auto w-[22rem] sm:w-2/3">
      <h1 className="text-3xl font-bold mb-4">
        Merge JSON Files Online &amp; Transform JSON Data
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Premium JSON File Merger - Combine JSON Files Securely
        </h2>
        <p className="text-gray-700">
          As the leading <strong>online JSON merger</strong>,
          merge-json-files.com specializes in combining multiple JSON files
          instantly. Our core <strong>merge JSON files online </strong>
          tool remains the most refined solution for developers needing to
          <strong> combine JSON files </strong> while preserving data structure
          integrity. We&apos;ve expanded to offer complementary tools including
          a
          <Link
            href="https://merge-json-files.com/json-file-splitter"
            className="text-blue-500 hover:underline"
          >
            {" "}
            JSON splitter online
          </Link>{" "}
          and
          <Link
            href="https://merge-json-files.com/json-flattener"
            className="text-blue-500 hover-underline"
          >
            {" "}
            JSON flattener online
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Why Choose Our JSON Tools?
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>Merge JSON files</strong> of any size with structure
            preservation
          </li>
          <li>
            <strong>Split JSON files</strong> into manageable chunks
            effortlessly
          </li>
          <li>
            <strong>Flatten JSON files</strong> to simplify complex hierarchies
          </li>
          <li>Zero data storage - all processing in your browser</li>
          <li>No registration required for any JSON operations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Comprehensive JSON File Solutions
        </h2>
        <div className="text-gray-700">
          <h3 className="text-lg font-semibold mt-3">Merge JSON Online</h3>
          <p>
            Combine multiple JSON files into unified datasets with our
            specialized merger tool. Ideal for API responses, data aggregation,
            and configuration management.
          </p>

          <h3 className="text-lg font-semibold mt-3">
            Split JSON Files Online
          </h3>
          <p>
            Process large JSON files by splitting them into smaller, manageable
            pieces while maintaining original formatting and structure.
          </p>

          <h3 className="text-lg font-semibold mt-3">Flatten JSON Online</h3>
          <p>
            Simplify nested JSON structures into flat key-value pairs for easier
            data processing and analysis.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Secure JSON Processing</h2>
        <p className="text-gray-700">
          Whether you&apos;re <strong>merging JSON files online</strong>,
          <strong> splitting JSON datasets</strong>, or
          <strong> flattening JSON structures</strong>, all operations occur
          directly in your browser. Our strict no-server-processing policy
          ensures complete data privacy as outlined in our
          <a href="/privacy-policy" className="text-blue-500 hover:underline">
            &nbsp;Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Optimized for JSON Workflows
        </h2>
        <p className="text-gray-700">
          Our tools are designed to work together -
          <strong>merge JSON files</strong> from multiple sources,
          <strong>split large JSON outputs</strong> for system compatibility, or{" "}
          <strong>flatten nested JSON</strong> for simplified parsing. Bookmark
          our growing collection of JSON utilities for your development needs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-700">
          Questions about JSON merging or our other tools? Reach us at
          <Link
            href="mailto:techemad.web@gmail.com"
            className="text-blue-500 hover:underline"
          >
            &nbsp;techemad.web@gmail.com
          </Link>
          . We welcome feedback on all our JSON utilities.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
