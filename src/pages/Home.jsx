import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../componenets/core/HomePage/HighlightText";
import CTAButton from "../componenets/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../componenets/core/HomePage/CodeBlocks";
import TimelineSection from "../componenets/core/HomePage/TimelineSection";
import LearningLanguageSection from "../componenets/core/HomePage/LearningLanguageSection";
import InstructorSection from "../componenets/core/HomePage/InstructorSection";
import Footer from "../componenets/common/Footer";
import ExploreMore from "../componenets/core/HomePage/ExploreMore";
const Home = () => {
  return (
    <div>
      {/* Section 1 */}

      <div className=" mx-auto relative flex flex-col w-11/12 items-center justify-between text-white">
        <Link to={"/signup"}>
          <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover: scale-95 w-fit max-w-maxContent">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an instructor </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-3xl md:text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" mt-4 w-[90%] text-left md:text-center text-sm md:text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            {" "}
            Book a Demo{" "}
          </CTAButton>
        </div>

        <div className="mx-3 my-12 shadow-blue-200 w-[60%] relative">
          <div className="grad2 -top-10 w-[800px]"></div>
          <video className="video" autoPlay loop muted>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* codeblocks section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className=" font-semibold text-2xl lg:text-4xl sm:w-full">
                Unlock Your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"white"}
            backgroudGradient={"grad"}
          />
        </div>

        {/* codeblocks section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className=" font-semibold text-2xl lg:text-4xl sm:w-full">
                Unlock Your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"white"}
            backgroudGradient={"grad"}
          />
        </div>

        <div>
          <ExploreMore />
        </div>
      </div>

      {/* Section 2 */}
      <div className="hidden lg:block lg:h-[200px]"></div>

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage-bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%] ">
              Get the skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white ">
        <InstructorSection />

        <h2 className="text-center text-4xl font-semibold mt-10">
          Review from Other Learners
        </h2>
        {/* Review Slider here */}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Home;
