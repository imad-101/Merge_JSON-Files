const AboutUs = () => {
  return (
    <div className="container p-8 border my-7 w-[22rem] sm:w-2/3 mx-auto rounded-xl">
      <h1 className="text-3xl font-bold mb-6">About merge-json-files.com</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          At merge-json-files.com, we're dedicated to simplifying JSON file
          operations for developers, data analysts, and tech professionals. Our
          platform provides a suite of free, browser-based tools designed to
          streamline your JSON data processing workflows.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Tools</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">JSON Merger</h3>
            <p className="text-gray-700">
              Our flagship tool allows you to effortlessly combine multiple JSON
              files into a single cohesive document, maintaining data structure
              and integrity.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">JSON Flattener</h3>
            <p className="text-gray-700">
              Transform complex, nested JSON structures into flat, easily
              manageable formats for simpler data processing and analysis.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">JSON Splitter</h3>
            <p className="text-gray-700">
              Break down large JSON files into smaller, more manageable
              components while preserving data relationships and structure.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Format Converters</h3>
            <p className="text-gray-700">
              Switch seamlessly between JSON and JSONL formats with our
              specialized converters, facilitating data interchange between
              different systems and applications.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Browser-Based Processing
            </h3>
            <p className="text-gray-700">
              All operations are performed locally in your browser, ensuring
              your data never leaves your device.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Zero Installation</h3>
            <p className="text-gray-700">
              Access professional-grade JSON tools instantly without downloading
              or installing any software.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-700">
              We maintain a strict no-storage policy. Your data is processed
              locally and never stored on our servers.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Free to Use</h3>
            <p className="text-gray-700">
              All our tools are completely free, making professional JSON
              processing accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <p className="text-gray-700 mb-4">
          We're committed to maintaining and improving our tools to meet the
          evolving needs of the developer community. Our focus remains on
          providing reliable, efficient, and secure JSON processing solutions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700">
          Have questions or suggestions? We'd love to hear from you. Reach out
          to us at{" "}
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

export default AboutUs;
