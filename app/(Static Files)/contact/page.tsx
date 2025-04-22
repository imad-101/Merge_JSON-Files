"use client";

import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy submission logic
    setMessageSent(true);
    // Optionally, reset the form fields
    setForm({ name: "", email: "", subject: "", message: "" });
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow bg-white">
          <div className="max-w-5xl mx-auto px-4 py-16">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Contact Us
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We'd love to hear from you! Whether you have a question about
                features, usage or anything else, our team is ready to answer
                all your questions.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-sm">
              {messageSent ? (
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Message Sent!
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:ring-gray-600 focus:border-gray-600"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:ring-gray-600 focus:border-gray-600"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:ring-gray-600 focus:border-gray-600"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:ring-gray-600 focus:border-gray-600"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Additional Contact Information */}
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Or reach out to us at{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-gray-800 font-medium hover:underline"
                >
                  jsontools.web@gmail.com
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ContactUs;
