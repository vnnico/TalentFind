const Talent = require("../models/talent");
const Education = require("../models/education");
const Experience = require("../models/experience");
const CV = require("../models/cv");
const Project = require("../models/project");
const Achievement = require("../models/achievement");
const mongoose = require("mongoose");

const createCV = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const talentId = req.user;
    const {
      description,
      educations,
      experiences,
      achievements,
      projects,
      skills,
    } = req.body;

    const talent = await Talent.findById(talentId);
    if (!talent) return res.status(404).json({ message: "Talent not found" });

    // Start Transaction
    await session.startTransaction();

    try {
      // CV
      const newCV = new CV({
        talentId: talentId,
        description: description,
        skills: skills,
      });

      await newCV.save({ session });

      // Educations
      for (const education of educations) {
        const newEducation = new Education({
          cvId: newCV._id,
          institution: education.institution,
          GPA: education.gpa,
          major: education.major,
          yearStart: education.yearStart,
          yearEnd: education.yearEnd,
        });
        await newEducation.save({ session });
      }

      // Experience
      for (const experience of experiences) {
        const newExperience = new Experience({
          cvId: newCV._id,
          companyName: experience.companyName,
          position: experience.position,
          description: experience.description,
          yearStart: experience.yearStart,
          yearEnd: experience.yearEnd,
        });
        await newExperience.save({ session });
      }

      // Achievement
      for (const achievement of achievements) {
        const newAchievement = new Achievement({
          cvId: newCV._id,
          name: achievement.name,
          date: achievement.date,
          issuingBy: achievement.issuingBy,
        });
        await newAchievement.save({ session });
      }

      // Projects
      for (const project of projects) {
        const newProject = new Project({
          cvId: newCV._id,
          name: project.name,
          description: project.description,
        });
        await newProject.save({ session });
      }

      await session.commitTransaction();
      return res.status(200).json({ message: "CV created successfully" });
    } catch (transactionError) {
      await session.abortTransaction();
      return res.status(500).json({
        message: "Failed to create CV",
        error: transactionError.message,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = { createCV };
