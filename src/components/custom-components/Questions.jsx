import { Card, CardContent, CardTitle } from "@/components/ui/card"
import assessmentQuestions from "@/Data/questions-data";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {createPortal} from "react-dom"


export default function Questions({ setActiveTab, setFilledtab, filledtab }) {
  let careers = [
    { careerId: "career_frontend", score: 0 },
    { careerId: "career_backend", score: 0 },
    { careerId: "career_fullstack", score: 0 },
    { careerId: "career_ai_ml", score: 0 },
    { careerId: "career_data_science", score: 0 },
    { careerId: "career_devops", score: 0 },
    { careerId: "career_cybersecurity", score: 0 },
    { careerId: "career_uiux", score: 0 },
  ];
  const [career, setCareer] = useState(careers);
  const [count, setCount] = useState(1);
  const [checked, setChecked] = useState({});
  const [ques, setQues] = useState(`q${count}`);
  const qdata = assessmentQuestions;

  const handleSubmit = (option) => {
    if (option) {
      const careermaping = option.careerMappings;
      const updatedcareer = careers.map((career) => {
        const mapping = careermaping.find(
          (mapcareer) => mapcareer.careerId == career.careerId,
        );

        if (mapping) {
          return { ...career, score: career.score + mapping.weight };
        }
        return career;
      });

      setCareer(updatedcareer);
    }
    setCount((prev) => prev + 1);
    setQues(`q${count + 1}`);
    setChecked(null);

    if (count >= assessmentQuestions.length) {
      setActiveTab(2);
      setFilledtab((prev) =>
        prev.find((tab) => tab == 1) ? [...prev] : [...prev, 1],
      );
     
    }
  };

  return createPortal(
    <>
      <div className="flex flex-col  mt-0 bg-black/40  p-2 sm:p-0 backdrop-blur-xs   top-0 left-0 w-full h-full bottom-0  z-100 item-center justify-center fixed">
        {qdata.map((q) =>
          q._id == ques ? (
            <Card
              key={q._id}
              className="border  p-2 md:p-4 gap-0 md:w-150  mx-w-3xl  mx-auto w-full mt-0 "
            >
              <CardTitle className="font-semibold md:text-xl text-lg mt-2 flex justify-between ">
                <div>{q.question}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => (
                    setActiveTab(2),
                    setFilledtab((prev) =>
                      prev.find((tab) => tab == 1) ? [...prev] : [...prev, 1],
                    )
                  )}
                >
                  ✖
                </div>
              </CardTitle>
              {q.options.map((op) => (
                <div className="flex  " key={op._id}
                >
                  <Checkbox
                    checked={checked == op}
                    onClick={() => setChecked(op)}
                    className="rounded-full border border-black p-2 "
                  />
                  <CardContent key={op._id}>{op.text}</CardContent>
                </div>
              ))}
              <div onClick={() => handleSubmit(checked ? checked : [])}>
                <Button className="w-full ">Submit</Button>
              </div>
              <div></div>
            </Card>
          ) : (
            <div></div>
          ),
        )}
      </div>
    </>,
    document.body,
  );
}
