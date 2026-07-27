
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FaSun, FaMoon, FaCloudSun } from "react-icons/fa";
import { FaRocket, FaRegClock, FaLeaf } from 'react-icons/fa';
import {Button} from "@/components/ui/button"
export default function SetGoal({ selected, setActiveTab, setFilledtab, setGoalData , goalData }) {
  // const [goalData, setGoalData] = useState({
  //   career: selected ? selected.title : "",
  //   roadmapId: selected ? selected.slug : "",
  //   skillLevel: "beginner",
  //   TargetPace:"",
  //   weeklyHours: "",
  //   timeline: "",
  //  dailyReminder:""
  // });

  // const [goalData,setGoalData]=useState({})
  const studyTimeData = [
    {
      time: "Morning",
      duration: " 6 AM - 12 PM",
      icon: FaSun,
    },
    {
      time: "Afternoom",
      duration: " 12 PM - 5 PM",
      icon: FaSun,
    },
    {
      time: "Evening",
      duration: " 5 PM - 10 PM ",
      icon: FaMoon,
    },
    {
      time: "Night",
      duration: "10 PM - 2 AM",
      icon: FaCloudSun,
    },
  ];

  const TargetPace = [
    {
      title: "Fast Track",
      detail: "Complete sooner with more daily effort ",
      icon: FaRocket,
    },
    {
      title: "Normal",
      detail: "Balance and sustainable pace ",
      icon: FaRegClock,
    },
    {
      title: "Relaxed",
      detail: "Learn at a comfortable and steady pace  ",
      icon: FaLeaf,
    },
  ];
  const [hours, setHours] = useState(5);
  // console.log(goalData);
  return (
    <>
      <div className="flex flex-col gap-3 lg:px-4 ">
        <Card className="p-4 gap-2 ">
          <CardTitle className=" text-lg mb-0 ">Selected Roadmap</CardTitle>
          {/* <Separator className="text-blue-300" /> */}
          <div className="border lg:w-2/3 w-full p-2 bg-blue-50">
            <div className="text-foreground text-xl font-bold">
              {selected ? selected.title : "No career is selected "}
            </div>
            <div>{selected ? selected.shortDescription : " "}</div>
          </div>
        </Card>
        {/* second card  */}
        <Card className="p-4 gap-2 ">
          <CardTitle className=" text-lg  mb-0 font-semibold">
            1- Weekly study hours
          </CardTitle>
          <CardContent>
            How many hours you can dedicate to study per week ?
          </CardContent>
          <div className="flex gap-2 font-bold ">
            <span>5hrs</span>
            <input
              type="range"
              min={5}
              max={20}
              step="1"
              value={hours}
              onChange={(e) => (
                setHours(e.target.value),
                setGoalData((prev) => ({ ...prev, weeklyHours: hours }))
              )}
              className="md:w-1/2 w-6/8  cursor-pointer"
            />
            <span>20hrs</span>
          </div>
          <div className="md:mt-4 mt-3  justify-center ml-7 md:justify-start flex ">
            <div className="bg-blue-50 text-foreground px-4 py-2 rounded-full font-semibold">
              Selected: {hours} hours per week
            </div>
          </div>
        </Card>

        {/* third card  */}
        <Card className="p-4 gap-2 ">
          <CardTitle className=" text-lg  font-semibold mb-0">
            2- Perfect Study Time
          </CardTitle>
          <CardContent>When do you usually want to study ?</CardContent>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-3 lg:px-17 py-1">
            {studyTimeData.map((time) => (
              <div
                onClick={() =>
                  setGoalData((prev) => ({
                    ...prev,
                    timeline: `${time.time}  ${time.duration}`,
                  }))
                }
                className="border rounded-md border-foreground flex-col gap-1 justify-center items-center p-2 *:mb-0 active:bg-blue-50 hover:bg-blue-50"
              >
                <time.icon size={27} />
                <div className="font-bold">{time.time}</div>
                <div>{time.duration}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* fourth card */}

        <Card className="p-4 gap-2 ">
          <CardTitle className=" text-lg  font-semibold mb-0">
            3- Target Pace
          </CardTitle>
          <CardContent>
            How fast do you want to complete your journey ?
          </CardContent>
          <div className="grid md:grid-cols-3 grid-cols-1  gap-3 lg:px-15 py-2">
            {TargetPace.map((target) => (
              <div
                onClick={() =>
                  setGoalData((prev) => ({ ...prev, TargetPace: target.title }))
                }
                className="border rounded-md border-foreground flex-col gap-1 justify-center items-center p-3 *:mb-0 active:bg-blue-50 hover:bg-blue-50"
              >
                <target.icon size={27} className="text-foreground" />
                <div className="font-bold text-md ">{target.title}</div>
                <div>{target.detail}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* fifth card */}
        <Card className="p-4 gap-2">
          <CardTitle className=" text-lg  font-semibold mb-0">
            4- Daily Reminder
          </CardTitle>
          <CardContent className="flex md:flex-row flex-col   gap-3">
            <div className="border py-3 px-5">
              <input
                type="time"
                defaultValue="08:30"
                // value={time}
                id="alarm"
                onChange={(e) =>
                  setGoalData((prev) => ({
                    ...prev,
                    dailyReminder: e.target.value,
                  }))
                }
              />
            </div>
            <div className="border p-3 bg-blue-50 text-foreground font-bold">
              You will receive reminder to stay on track
            </div>
          </CardContent>
        </Card>

        {/* button */}
        <div
          onClick={() => (
            setActiveTab(4),
            setFilledtab((prev) =>
              prev.find((tab) => tab == 3) ? [...prev] : [...prev, 3],
            ),
            setGoalData((prev) => ({
              ...prev,
              career: selected ? selected.title : "",
              roadmapId: selected ? selected.slug : "",
            }))
          )}
          className="h-10 md:text-xl w-full"
        >
          <Button className="w-full">Set Goal</Button>
        </div>
      </div>
    </>
  );
}