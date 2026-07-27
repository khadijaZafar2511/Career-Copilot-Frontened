import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {Card} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRequireAuth } from "../../hooks/use-require-auth"
import {useTaskSelect} from "../../Features/Tasks/tasks.mutation"

export default function Tasks({ task, selected,roadmapId }) {
   const { enforceAuth } = useRequireAuth();

const status = {
  completed:
    "bg-green-50 text-green-700 border border-green-200 rounded-full p-2 mb-2   font-semibold",
  incomplete:
    "bg-blue-50 text-blue-700 border border-blue-200 rounded-full p-2 mb-2  font-semibold",
  not_started:
    "bg-gray-50 text-gray-600 border border-gray-200 rounded-full p-2 mb-2   font-semibold",
  locked:
    "bg-gray-200 text-gray-500 border border-gray-200 rounded-full p-2 mb-2  font-semibold  cursor-not-allowed",
  };

  const { mutate, data, isPending } = useTaskSelect();
 const isTaskDone = task.status === "completed";
  const checkHandler =async (task) => {
    if(isTaskDone){
      toast.dismiss()
      toast("You have already completed it!!")
      return;
    }
    else {
      mutate(  { selected, task,roadmapId })
    
    } 
  
  };
  return (
    
    <div key={task._id} className=" rounded-xl flex space-y-2 gap-2">
      <div className="flex items-center ">
        <Checkbox
          className="border rounded-xl border-gray-500"
          checked={isTaskDone}
          onCheckedChange={enforceAuth(() => checkHandler(task))}
        />
      </div>
      {/* Resources Dropdown */}
      <Card className="w-full border px-2">
        <Accordion type="single" collapsible="true">
          <AccordionItem value={task.id}>
            <div className="flex lg:h-6 justify-between flex-col lg:flex-row">
              <div className="flex gap-2  items-center text-gray-500">
                <span>{task.order}-</span>
                <span className="font-medium ">{task.title} </span>
                <Badge
                  className={
                    status[isTaskDone ? "completed" : task.status]
                  }
                >
                  {isTaskDone ? "completed" : task.status}
                </Badge>
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
                      key={res._id}
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
      </Card>
    </div>
  );
}
