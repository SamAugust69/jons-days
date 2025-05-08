import { format } from "date-fns";
import { MoveRight } from "lucide-react";

export const SingleDay = ({ date }: { date: Date }) => {
  return (
    <div className="max-w-96 w-full bg-neutral-100 shadow rounded">
      <p className="flex justify-between bg-blue-400 p-2 rounded-t text-neutral-800 font-medium">
        {format(date, "MM/dd/yyyy")}
      </p>
      <div className="py-4 px-2 border-t-2 border-neutral-400 bg-neutral-100 text-center font-semibold ">
        THE DAY
      </div>
      <div className="border-t border-neutral-400 bg-neutral-200/50 px-2 text-sm flex items-center gap-2 justify-end">
        <p className="text-ellipsis text-nowrap overflow-hidden">The day tmr</p>
        <MoveRight className="w-5 h-5" />
      </div>
    </div>
  );
};
