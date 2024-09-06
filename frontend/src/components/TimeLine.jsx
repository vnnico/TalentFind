import { Timeline } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TimeLine = ({ index, setIndex }) => {
  const [timelineItems, setTimelineItems] = useState([
    {
      color: "green",
      children: (
        <button onClick={() => setIndex(0)} className="hover:text-slate-700">
          Personal Information
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(0)} className="hover:text-slate-700">
          Description
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(0)} className="hover:text-slate-700">
          Education
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(0)} className="hover:text-slate-700">
          Experience
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(0)} className="hover:text-slate-700">
          Achievement
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(0)} className="hover:text-slate-700">
          Project
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(0)} className="hover:text-slate-700">
          Skills
        </button>
      ),
    },
  ]);

  useEffect(() => {
    const newTimeline = timelineItems.map((item, idx) => {
      return idx <= index
        ? { ...item, color: "green" }
        : { ...item, color: "gray" };
    });
    setTimelineItems(newTimeline);
  }, [index]);

  return (
    <Timeline
      className="lg:text-3xl md:text-xl font-medium "
      items={timelineItems}
    />
  );
};

export default TimeLine;
