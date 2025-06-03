import { add, format } from "date-fns";
import { Calendar, MoveRight } from "lucide-react";
import { getDayInfo } from "../lib/getDay";
import { Button } from "./ui/Button";
import { ToolTip, ToolTipContent, ToolTipTrigger } from "./ui/Tooltip";

export const SingleDay = ({
  date,
  setShowCalender,
}: {
  date: Date;
  setShowCalender: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dayInfo = getDayInfo(date);
  const nextDay = getDayInfo(add(date, { days: 1 }))?.name;
  return (
    <div className="max-w-96 w-full bg-neutral-100 shadow rounded">
      <p className="flex justify-between items-center bg-blue-400 p-2 rounded-t text-neutral-800 font-medium">
        {format(date, "MM/dd/yyyy")}

        <ToolTip>
          <ToolTipTrigger>
            <Button
              className="bg-neutral-200 rounded p-1"
              onClick={() => setShowCalender(true)}
            >
              <Calendar className="w-5 h-5" />
            </Button>
          </ToolTipTrigger>
          <ToolTipContent className="break-normal">
            <p className="break-normal w-28">Open Calender</p>
          </ToolTipContent>
        </ToolTip>
      </p>
      <div className="py-4 px-2 border-t-2 border-neutral-400 bg-neutral-100 text-center flex flex-col font-semibold ">
        {dayInfo?.name || "No Day... :("}
      </div>
      <div className="border-t h-6 border-neutral-400 bg-neutral-200/50 px-2 text-sm flex items-center gap-1 justify-end">
        {nextDay ? (
          <>
            <p className="text-ellipsis text-nowrap overflow-hidden">
              {nextDay}
            </p>
            <MoveRight className="w-5 h-5" />
          </>
        ) : null}
      </div>
    </div>
  );
};
