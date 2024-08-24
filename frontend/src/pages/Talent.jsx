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
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

const Talent = () => {
  const [index, setIndex] = useState(0);

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      talentInput: {
        fullname: "",
        email: "",
        dob: "",
        phoneNumber: "",
        address: "",
      },

      description: "",
      education: [{ institution: "", major: "", gpa: "", yearRange: "" }],
      experience: [
        { company: "", position: "", description: "", yearRange: "" },
      ],
      achievement: [{ name: "", issuingBy: "", date: "" }],
      project: [{ name: "", description: "" }],
      skills: [{ skill: "" }],
    },
    mode: "onBlur",
  });

  const cvDetails = [
    "TalentInput",
    "Description",
    "Education",
    "Experience",
    "Achievement",
    "Project",
    "Skills",
  ];

  const clickNext = (data) => {
    setValue(cvDetails[index].toLowerCase(), data);
    if (index !== cvDetails.length - 1) {
      setIndex(index + 1);
    }
  };

  const clickPrev = (data) => {
    setValue(cvDetails[index].toLowerCase(), data);
    if (index !== 0) {
      setIndex(index - 1);
    }
  };

  const postData = (data) => {
    console.log(data);
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
        <form
          action=""
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(postData)}
        >
          {cvDetails[index] === "TalentInput" && (
            <>
              <h1 className="lg:text-xl md:text-xl font-bold">
                Personal Information
              </h1>
              <p className="text-xs md:text-left">
                The information below will be included in your CV. You can
                update your personal details{" "}
                <Link
                  href="#"
                  className="text-blue-700 font-semibold hover:text-blue-500"
                >
                  here
                </Link>{" "}
                or you can proceed by clicking next button.
              </p>
              <TalentInfo
                clickNext={handleSubmit((data) => clickNext(data.talentInput))}
                control={control}
                talentInput={getValues("talentInput")}
                // talentInput={talentInput}
                // setTalentInput={setTalentInput}
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
              <Description
                control={control}
                clickNext={handleSubmit((data) => clickNext(data.description))}
                clickPrev={handleSubmit((data) => clickPrev(data.description))}

                // description={description}
                // setDescription={setDescription}
              />
            </>
          )}
          {cvDetails[index] === "Education" && (
            <>
              <h1 className="lg:text-xl md:text-xl font-bold">Education</h1>

              <Education
                control={control}
                clickNext={handleSubmit((data) => clickNext(data.education))}
                clickPrev={handleSubmit((data) => clickPrev(data.education))}
                education={getValues("education")}
                // education={education}
                // setEducation={setEducation}
              />
            </>
          )}
          {cvDetails[index] === "Experience" && (
            <>
              <h1 className="lg:text-xl md:text-xl font-bold">Experience</h1>
              <Experience
                control={control}
                clickNext={handleSubmit((data) => clickNext(data.experience))}
                clickPrev={handleSubmit((data) => clickPrev(data.experience))}
                experience={getValues("experience")}
                // experience={experience}
                // setExperience={setExperience}
              />
            </>
          )}
          {cvDetails[index] === "Achievement" && (
            <>
              <h1 className="lg:text-xl md:text-xl font-bold">Achievement</h1>
              <Achievement
                control={control}
                clickNext={handleSubmit((data) => clickNext(data.achievement))}
                clickPrev={handleSubmit((data) => clickPrev(data.achievement))}
                achievement={getValues("achievement")}
                // achievement={achievement}
                // setAchievement={setAchievement}
              />
            </>
          )}
          {cvDetails[index] === "Project" && (
            <>
              <h1 className="lg:text-xl md:text-xl font-bold">Project</h1>
              <Project
                control={control}
                clickNext={handleSubmit((data) => clickNext(data.project))}
                clickPrev={handleSubmit((data) => clickPrev(data.project))}
                project={getValues("project")}
                // project={project}
                // setProject={setProject}
              />
            </>
          )}
          {cvDetails[index] === "Skills" && (
            <>
              <h1 className="lg:text-xl md:text-xl font-bold">Skills</h1>
              <Skills
                control={control}
                clickNext={handleSubmit((data) => clickNext(data.skills))}
                clickPrev={handleSubmit((data) => clickPrev(data.skills))}
                skills={getValues("skills")}
                // skills={skills}
                // setSkills={setSkills}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Talent;
