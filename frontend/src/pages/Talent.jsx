import TimeLine from "../components/TimeLine";
import { Link } from "react-router-dom";
import TalentInfo from "../sections/TalentInfo";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import { useEffect, useState } from "react";
import Description from "../sections/Description";
import Achievement from "../sections/Achievement";
import Project from "../sections/Project";
import Skills from "../sections/Skills";

const Talent = () => {
  const [index, setIndex] = useState(0);
  const [talentInput, setTalentInput] = useState("");

  const cvDetails = [
    "Talent",
    "Description",
    "Education",
    "Experience",
    "Achievement",
    "Project",
    "Skills",
  ];

  const clickNext = () => {
    if (index !== cvDetails.length - 1) setIndex(index + 1);
  };

  const clickPrev = () => {
    if (index !== 0) setIndex(index - 1);
  };

  return (
    <div className="justify-content mx-auto my-5 flex max-md:flex-col w-[90%] p-11 rounded-lg md:gap-10 bg-white gap-4 h-full">
      <div className="flex flex-col basis-1/2 text-black gap-4 h-full">
        <h1 className="lg:text-3xl md:text-xl font-bold">
          Craft Your Professional Profile
        </h1>
        <p className="text-sm md:text-left">
          Complete your details to create an optimized, ATS-friendly CV that
          highlights your strengths and gets you noticed.
        </p>
        <div className="m-auto">
          <TimeLine index={index} setIndex={setIndex}></TimeLine>
        </div>
      </div>
      <div className="flex flex-col basis-1/2 p-10 gap-2 overflow-y-auto shadow-xl overflow-y-auto">
        {cvDetails[index] === "Talent" && (
          <>
            <h1 className="lg:text-xl md:text-xl font-bold">
              Personal Information
            </h1>
            <p className="text-xs md:text-left">
              The information below will be included in your CV. You can update
              your personal details{" "}
              <Link
                href="#"
                className="text-blue-700 font-semibold hover:text-blue-500"
              >
                here
              </Link>{" "}
              or you can proceed by clicking next button.
            </p>
            <TalentInfo
              clickNext={clickNext}
              clickPrev={clickPrev}
              talentInput={talentInput}
              setTalentInput={setTalentInput}
            />
          </>
        )}
        {cvDetails[index] === "Description" && (
          <>
            <h1 className="lg:text-xl md:text-xl font-bold">
              Description<span className="text-red-600">*</span>
            </h1>
            <p className="text-xs md:text-left">
              This section is for you to craft a compelling overview of
              yourself. Share brief of professional background, interests, and
              personal traits that define you.
            </p>
            <Description clickNext={clickNext} clickPrev={clickPrev} />
          </>
        )}
        {cvDetails[index] === "Education" && (
          <>
            <h1 className="lg:text-xl md:text-xl font-bold">Education</h1>

            <Education clickNext={clickNext} clickPrev={clickPrev} />
          </>
        )}
        {cvDetails[index] === "Experience" && (
          <>
            <h1 className="lg:text-xl md:text-xl font-bold">Experience</h1>
            <Experience clickNext={clickNext} clickPrev={clickPrev} />
          </>
        )}
        {cvDetails[index] === "Achievement" && (
          <>
            <h1 className="lg:text-xl md:text-xl font-bold">Achievement</h1>
            <Achievement clickNext={clickNext} clickPrev={clickPrev} />
          </>
        )}
        {cvDetails[index] === "Project" && (
          <>
            <h1 className="lg:text-xl md:text-xl font-bold">Project</h1>
            <Project clickNext={clickNext} clickPrev={clickPrev} />
          </>
        )}
        {cvDetails[index] === "Skills" && (
          <>
            <h1 className="lg:text-xl md:text-xl font-bold">Skills</h1>
            <Skills clickNext={clickNext} clickPrev={clickPrev} />
          </>
        )}
      </div>
    </div>
  );
};

export default Talent;
