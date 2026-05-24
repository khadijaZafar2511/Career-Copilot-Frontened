import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Checkbox } from "@/Components/ui/checkbox";
import { useState } from "react";

export default function Tasks({ task }) {
    const [checked, setChecked] = useState({});
     const checkHandler = (taskid, value) => {
       setChecked((prev) => ({
         ...prev,
         [taskid]: value,
       }));
     };
  return (
    <div key={task.id} className=" rounded-xl  space-y-2">
      {/* Resources Dropdown */}
      <Accordion type="single" collapsible="true">
        <AccordionItem value={task.id}>
          <div className="flex lg:h-6 justify-between flex-col lg:flex-row">
            <div className="flex gap-2  items-center">
              <Checkbox
                className="border rounded-xl border-gray-500"
                checked={checked[task.id] || false}
                onCheckedChange={(value) => checkHandler(task.id, value)}
              />
              <span className="font-medium">{task.title}</span>
            </div>
            <AccordionTrigger className="text-sm  text-foreground">
              View Resources
            </AccordionTrigger>
          </div>

          <AccordionContent>
            <div className="space-y-2 mt-5">
              {task.resources.map((res) => (
                <>
                  <div
                    key={res.id}
                    className=" border text-gray-600 flex justify-between  rounded-lg  px-3 py-2 hover:bg-gray-100 hover:text-foreground"
                  >
                    <a href={res.url} target="_blank" rel="noreferrer">
                      <p className="text-sm font-semibold">{res.title}</p>
                    </a>
                    <p className="text-sm no-underline mt-2">{res.type}</p>
                  </div>
                </>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
