import { Project, ScheduleRound } from "database";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "~/utils/api";
import { Progress } from "~/components/common/Progress";

interface Props {}

const TopDetailInfo: React.FC<Props> = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading } = api.project.getOne.useQuery(
    { id },
    {
      enabled: !!id,
    }
  );
  const project = data as Project;
  const scheduleRounds = data?.ScheduleRound as ScheduleRound[];
  const currentRound = scheduleRounds?.find(
    (round) => round.startTime < new Date() && round.endTime > new Date()
  );

  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(80);
    }, 500);
  }, []);

  return (
    <>
      {project && (
        <div className="bg-gray-800 p-12 flex flex-col text-white font-bold gap-7 rounded-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-black w-28 aspect-square rouned-md">
                <img src={project?.image} className="w-full h-full" />
              </div>

              <div className="grid gap-4">
                <p className="capitalize font-mono text-3xl">{project.name}</p>
                <div>
                  <p>Price (DDO) = {currentRound?.pricePerToken} BUSD</p>
                </div>
              </div>
            </div>
            <div className="rounded-full bg-blue-400 w-12 aspect-square"></div>
            <div>
              <p className="font-light text-xl">Sale end in</p>
              <div className="flex gap-4">
                <div>
                  <span className="text-5xl">8</span>
                  <span className="text-sm">D</span>
                </div>
                <div>
                  <span className="text-5xl">9</span>
                  <span className="text-sm">H</span>
                </div>
                <div>
                  <span className="text-5xl">10</span>
                  <span className="text-sm">M</span>
                </div>
                <div>
                  <span className="text-5xl">11</span>
                  <span className="text-sm">S</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center font-bold text-sm">
            <span>Total Raise: 100,000 BUSD (64%)</span>
            <span>Allocation: 500 BUSD Max</span>
            <span>Targeted Price: 200,000 BUSD</span>
          </div>

          <Progress value={progress} secondaryClassName="bg-lime-300" />
        </div>
      )}
    </>
  );
};

export default TopDetailInfo;
