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
import { getDayInfo } from "../lib/getDay";
import { DialogContent } from "./ui/dialog";

export const Calender = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(1 / 25)); // date used by calender

  const month = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const week = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate),
  });

  return (
    <DialogContent className="max-w-full bg-transparent h-full max-h-[700px]">
      <div className="flex sm:hidden bg-zinc-100 flex-col">
        {week.map((day) => {
          return <div>{day.getDate()}</div>;
        })}
      </div>
      <div className="w-full h-full bg-zinc-100 rounded sm:flex flex-col hidden">
        <div className="flex justify-between py-2">
          <Button
            onClick={() => setCurrentDate(sub(currentDate, { months: 1 }))}
          >
            <ChevronLeft />
          </Button>
          <p className="font-bold text-lg">{format(currentDate, "MMMM")}</p>
          <Button
            onClick={() => setCurrentDate(add(currentDate, { months: 1 }))}
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="grid grid-cols-7">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => {
            return (
              <div className="bg-zinc-200 font-semibold text-sm p-2 py-5 text-center border-t-2 border-zinc-300">
                {day}
              </div>
            );
          })}
        </div>
        <div className=" grid h-full  grid-cols-7 gap-0.5 bg-zinc-200/50 p-0.5">
          {month.map((day) => {
            const dayInfo = getDayInfo(day);

            console.log(dayInfo);

            const colorMap: Record<number, string> = {
              100: `bg-red-100`,
              200: `bg-red-200`,
              300: `bg-red-300`,
              400: `bg-red-400`,
              500: `bg-red-500`,
              600: `bg-red-600`,
              700: `bg-red-700`,
              800: `bg-red-800`,
              900: `bg-red-900`,
            };

            const colorClamp = 400;

            return (
              <Button
                onClick={() => setDate(day)}
                className={`h-full flex flex-col justify-between p-1 text-left overflow-hidden ${
                  !isSameMonth(day, currentDate)
                    ? "bg-zinc-200 text-zinc-600"
                    : "bg-zinc-100"
                } ${isSameDay(day, new Date()) ? "bg-yellow-100" : ""} ${
                  isSameDay(day, date) ? "bg-yellow-200" : ""
                }
              `}
              >
                <p
                  className={`font-semibold text-center ${
                    dayInfo === undefined ? "m-auto text-lg" : ""
                  }`}
                >
                  {day.getDate().toString().length === 1
                    ? `0${day.getDate()}`
                    : day.getDate()}
                </p>
                {dayInfo?.name && (
                  <p
                    className={`hidden sm:block text-xs text-center ${
                      colorMap[
                        dayInfo.value > colorClamp ? colorClamp : dayInfo.value
                      ]
                    } rounded py-1 px-2 truncate`}
                  >
                    {dayInfo?.name} Day
                  </p>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </DialogContent>
  );
};
