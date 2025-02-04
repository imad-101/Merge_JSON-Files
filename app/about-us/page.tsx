const AboutUs = () => {
  return (
    <div className="container p-8  border my-7   rounded-xl mx-auto w-[22rem] sm:w-2/3">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
        <p className="text-gray-700">
          Welcome to Merge JSON Files, a cutting-edge tool designed to simplify
          JSON file merging. We are dedicated to providing a seamless and
          efficient experience for developers, data analysts, and anyone who
          works with JSON data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          Our mission is to offer a fast, secure, and user-friendly JSON merging
          solution that enhances productivity and streamlines data processing.
          We prioritize ease of use, ensuring that merging JSON files is as
          simple as a few clicks.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Fast and reliable JSON merging process.</li>
          <li>Strong security measures to protect user data.</li>
          <li>Completely web-based with no need for installations.</li>
          <li>Free and easy-to-use interface for all users.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Our Commitment to Security
        </h2>
        <p className="text-gray-700">
          We value your privacy and ensure that your JSON files are processed
          securely without being stored on our servers. For more details, check
          out our
          <a href="/privacy-policy" className="text-blue-500 hover:underline">
            {" "}
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p className="text-gray-700">
          Have questions or feedback? Reach out to us at
          <a
            href="mailto:[Your Contact Email]"
            className="text-blue-500 hover:underline"
          >
            {" "}
            techemad.web@gmail.com
          </a>
          . We’d love to hear from you!
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
