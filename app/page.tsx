import JsonMerger from "@/components/Main";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/Faq";

const page = () => {
  return (
    <div className="">
      <h1 className="text-center text-5xl my-7 font-bold text-gray-800 ">
        Merge JSON Files
      </h1>
      <p className="text-gray-600 mb-10 text-center px-3">
        Seamlessly merge multiple{" "}
        <span className="font-semibold">JSON files</span> in just a few clicks
        and instantly <span className="font-semibold">download or copy</span>{" "}
        the combined data.
      </p>
      <JsonMerger />

      <p className="text-gray-600 text-center my-10 px-3">
        No Ads, No sign up. Get Your Files Merged Within A Few Clicks.
      </p>

      {/* -------------------------------------------------------------------------------------------------- */}
      <HowItWorks />
      {/* ---------------------------------------------------------------------------------- */}

      <FaqSection />
    </div>
  );
};

export default page;
