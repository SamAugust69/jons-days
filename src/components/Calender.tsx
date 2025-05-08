import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  sub,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";
import days from "../days.json";

export const Calender = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const [currentDate, setCurrentDate] = useState(date); // date used by calender

  const month = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  return (
    <div className="max-w-2xl w-full bg-neutral-100 rounded p-2 flex flex-col gap-2">
      <div className="flex justify-between">
        <Button onClick={() => setCurrentDate(sub(currentDate, { months: 1 }))}>
          <ChevronLeft />
        </Button>
        {format(date, "MMMM")}
        <Button onClick={() => setCurrentDate(add(currentDate, { months: 1 }))}>
          <ChevronRight />
        </Button>
      </div>
      <div className="grid grid-cols-7  bg-neutral-700 gap-[1px] p-[1px]">
        {month.map((day) => {
          const dayInfo = days.find(
            (daya) => daya.month === day.getMonth() && daya.day === day.getDay()
          );
          return (
            <Button
              onClick={() => setDate(day)}
              className={`aspect-[8.5/9] flex flex-col justify-between p-1 text-left overflow-hidden ${
                !isSameMonth(day, currentDate)
                  ? "bg-neutral-300"
                  : "bg-neutral-100"
              } ${isSameDay(day, new Date()) ? "bg-yellow-100" : ""} ${
                isSameDay(day, date) ? "bg-yellow-200" : ""
              }
              `}
            >
              <p className="font-semibold text-xs">{day.getDate()}</p>
              <p className="text-sm hidden sm:block">{dayInfo?.day}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
