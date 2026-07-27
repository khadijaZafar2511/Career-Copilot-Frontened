import { Card} from "@/components/ui/card";
import { careerPaths } from "@/Data/CareerData";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "../ui/separator"
export default function CareerPath({ setActiveTab, setFilledtab,selected, setSelected }) {


  const handleSelected = (cardDetail) => {
    localStorage.setItem("selected", JSON.stringify(cardDetail));
    setSelected(cardDetail)
    // setSelected(prev => ({
    //   ...prev, title:titl, description:shortDescription
    // }));
  };
  useEffect(() => {
    setSelected(
      JSON.parse(localStorage.getItem("selected"))
        ? JSON.parse(localStorage.getItem("selected"))
        : {},
    );
  }, []);
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
        {careerPaths.map((card) => {
          return (
            /* Move the Sheet inside the loop so every card gets its own sheet */
            <Sheet
              key={card.title}
              className="mt-2 max-w-5xl  mx-auto w-full flex-1  overflow-y-auto "
            >
              {/* use asChild so the trigger becomes your custom div click target */}
              <SheetTrigger asChild>
                <div className="hover:border-blue-500 border border-blue-200 rounded-lg cursor-pointer transition-all">
                  <Card className="p-3 flex flex-col gap-0 text-left ">
                    {/* Layout wrapper for Icon and Text Content */}
                    <div className="flex gap-3 w-full ">
                      {/* Icon Wrapper */}
                      <div className="bg-blue-100 text-2xl flex items-center justify-center rounded-lg h-11 w-11 shrink-0">
                        {card.icon}
                      </div>

                      {/* Single Text Div: Controls the gap perfectly */}
                      <div className="w-full">
                        <div className="font-semibold  flex justify-between text-slate-900">
                          <p>{card.title}</p>
                          {selected.title == card.title ? (
                            <Badge className="lg:w-22 lg:h-7">selected</Badge>
                          ) : (
                            ""
                          )}
                        </div>
                        {/* Tiny mt-1 margin sets a clean, tight spacing */}
                        <p className="text-[13px] sm:text-sm text-muted-foreground mt-1 ">
                          {card.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Badges Layout */}
                    {/* sm:ml-14 lines up badges with the text block on larger screens */}
                    <div className="flex  gap-2 mt-4 sm:ml-14">
                      <Badge className="bg-orange-50 text-orange-500 px-2.5 py-1 text-[11px] font-medium border-none shadow-none">
                        {card.difficultyLevel}
                      </Badge>
                      <Badge className="bg-blue-50 text-blue-600 px-2.5 py-1 text-[11px] font-medium border-none shadow-none">
                        {card.estimatedDuration}
                      </Badge>
                      <Badge className="bg-green-50 text-green-600 px-2.5 py-1 text-[11px] font-medium border-none shadow-none">
                        {card.jobGrowth}
                      </Badge>
                    </div>
                  </Card>
                </div>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  {/* This will now dynamically display the clicked card's title */}
                  <SheetTitle className="text-2xl font-semibold mt-3 flex gap-2">
                    <div className="bg-blue-100 flex items-center justify-center rounded-lg h-11 w-11">
                      {card.icon}
                    </div>
                    Explore {card.title}
                  </SheetTitle>
                  <SheetDescription>{card.shortDescription}</SheetDescription>
                </SheetHeader>
                <Separator />
                <div className="ml-3 text-md  text-foreground">
                  Category : {card.category}
                </div>
                <Separator />

                <div className="ml-4  md:mt-3">
                  <p className="text-lg font-semibold">Skills You'll Learn </p>
                  <div className="grid mt-2  sm:grid-cols-3 grid-cols-2 gap-2">
                    {card.requiredSkills.map((skill) => (
                      <Badge
                        className="w-29  h-9 bg-gray-100 text-gray-700"
                        key={skill}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="ml-3 p-1 ">
                  <p className="text-lg font-semibold">Career Stats</p>
                  <div className=" flex grid-cols-2 gap-3">
                    <div className="bg-blue-100 text-gray-800 h-20 w-30 flex flex-col items-center justify-center ">
                      <span>Average Salary</span>{" "}
                      <div className="font-bold">
                        {(card.averageSalary.min + card.averageSalary.min) / 2}{" "}
                        {card.averageSalary.currency}
                      </div>
                    </div>
                    <div className="bg-blue-100 text-gray-800 h-20 w-30 flex flex-col items-center justify-center ">
                      <span>Learning Time</span>{" "}
                      <div className="font-bold">{card.estimatedDuration}</div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() =>
                    handleSelected(card)
                  }
                  className="ml-3 mr-3"
                >
                  <Button className="w-full" type="submit">
                    <span
                      onClick={() => (
                        setActiveTab(3),
                        setFilledtab((prev) =>
                          prev.find((tab) => tab == 2)
                            ? [...prev]
                            : [...prev, 2],
                        )
                      )}
                    >
                      Select as Career
                    </span>
                  </Button>
                </div>

                {/* Changed from render prop to asChild */}
              </SheetContent>
            </Sheet>
          );
        })}
      </div>
    </>
  );
}

//  <div className="bg-blue-100 text-gray-800 h-20 w-30 flex flex-col items-center justify-center ">
//    <span>Job Growth</span> <div className="font-bold">{card.jobGrowth}</div>
//  </div>;
//  <div className="grid md:grid-cols-2  grid-cols-1 gap-3">
//    {careerPaths.map((card) => {
//      //   const Icon = card.avator;
//      return (
//        <div
//          key={card.title}
//          className="hover:border-blue-500 border border-blue-200 rounded-lg"
//        >
//          <Card className="p-4 flex flex-row">
//            <div>
//              <div className="bg-blue-100 flex items-center justify-center rounded-lg h-11 w-11">
//                {/* <Icon className="h-6 w-6 text-blue-600 rounded-lg" /> */}
//                {card.icon}
//              </div>
//            </div>

//            <div>
//              <CardTitle className="font-semibold">{card.title}</CardTitle>
//              <CardContent className="text-[12px] p-1">
//                <span>{card.shortDescription}</span>
//                <div className="flex gap-3 mt-4">
//                  <Badge className="bg-orange-50 text-orange-500 p-2">
//                    {card.difficultyLevel}
//                  </Badge>
//                  <Badge className="bg-blue-50 text-blue-600 p-2">
//                    {card.estimatedDuration}
//                  </Badge>
//                  <Badge className="bg-green-50 text-green-600 p-2">
//                    {card.jobGrowth}
//                  </Badge>
//                </div>
//              </CardContent>
//            </div>
//          </Card>
//        </div>
//      );
//    })}
//  </div>;