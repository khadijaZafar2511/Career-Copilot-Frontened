
 import { Card, CardContent, CardTitle } from "@/components/ui/card";

import ROADMAP_CARDS from "../../Data/dataRoadmap"


  

export default function CareerPath() {





  return (
    <>
      <div className="grid md:grid-cols-2  grid-cols-1 gap-3">
        {ROADMAP_CARDS.map((card) => {
        //   const Icon = card.avator;
          return (
            <div
              key={card.title}
              className="hover:border-blue-500 border border-blue-200 rounded-lg"
            >
              <Card className="p-4 flex flex-row">
                <div>
                  <div className="bg-blue-100 flex items-center justify-center rounded-lg h-11 w-11">
                              {/* <Icon className="h-6 w-6 text-blue-600 rounded-lg" /> */}
                              {card.icon}
                  </div>
                </div>

                <div>
                  <CardTitle>{card.title}</CardTitle>
                  <CardContent className="text-[12px] p-1">
                    {card.description}
                  </CardContent>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
