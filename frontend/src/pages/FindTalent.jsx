import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";
import SubmitButton from "../components/buttons/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import TalentCard from "../components/TalentCard";
import { useAppContext } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import { Progress } from "antd"; // Ensure Ant Design is installed and imported

const FindTalent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const { showToast } = useAppContext();
  const [data, setData] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);

  // Mutation to find recommended talent
  const mutation = useMutation({
    mutationKey: ["findRecommendedTalent"],
    mutationFn: apiClient.findRecommendedTalent,
    onSuccess: (data) => {
      showToast({ message: data.message, type: "success" });
      setData(data.recommendedTalents);
      setProgressPercent(100); // Set progress to 100% on success
    },
    onError: (error) => {
      showToast({ message: error.message, type: "error" });
      setProgressPercent(100); // Set progress to 100% on error
    },
  });

  const postData = (data) => {
    setProgressPercent(0); // Reset progress before mutation
    mutation.mutate(data); // Trigger mutation
  };

  // Progress bar logic while loading
  useEffect(() => {
    let interval;
    if (mutation.isPending) {
      interval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev < 90) return prev + 10;
          return prev;
        });
      }, 500); // Increment progress every 500ms
    }

    return () => clearInterval(interval); // Cleanup interval
  }, [mutation.isPending]);

  return (
    <div className="justify-content mx-auto my-5 flex flex-col w-[90%] md:p-11 p-4 rounded-lg md:gap-10 bg-white h-full gap-4 ">
      <div className="flex gap-6 max-md:flex-col pe-4">
        <div className="flex flex-col basis-1/2 text-black gap-4 h-full">
          <h1 className="lg:text-3xl md:text-xl font-bold">
            Find Your Talent with AI
          </h1>
          <p className="text-sm md:text-left">
            Unlock the power of AI to discover the ideal candidates for your
            team. Simply enter your requirements in the prompt, and let our
            advanced algorithm browse through tailored talent recommendations
            and make the best hire with just a click!
          </p>

          <form onSubmit={handleSubmit(postData)}>
            <Controller
              control={control}
              name="prompt"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Textarea
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  variant="flat"
                  minRows={11}
                  radius="sm"
                  label="Prompt"
                  labelPlacement="inside"
                  placeholder="e.g : Our company needs a Machine Learning Engineer with skills in Python, TensorFlow, and 5 years of experience..."
                  errorMessage={errors.description?.message}
                  isInvalid={!!errors.description}
                  isRequired
                />
              )}
            />

            {/* Show progress bar when loading */}
            {mutation.isPending && (
              <div className="my-2">
                <Progress percent={progressPercent} size="small" />
              </div>
            )}

            <SubmitButton disabled={mutation.isPending}>Submit</SubmitButton>
          </form>
        </div>

        <div className="flex flex-col basis-1/2 p-10 gap-2 overflow-y-auto shadow-xl h-[400px]">
          <h1 className="lg:text-xl md:text-xl font-bold text-center">
            Your Talent Recommendation
          </h1>
          {data && data.length > 0 ? (
            <div className="w-full flex flex-col gap-3 py-4">
              {data.map((talentList, index) => (
                <TalentCard
                  talentList={talentList.talent}
                  similarityScore={talentList.similarityScore}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs md:text-left m-auto text-slate-500">
              No result yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindTalent;
