import { useState } from "react";
import { Calender } from "./components/Calender";
import { SingleDay } from "./components/SingleDay";

export const App = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="bg-neutral-200 gap-2 flex-col dots w-screen h-screen p-2 font-roboto flex justify-center items-center">
      <SingleDay date={date} />
      <Calender date={date} setDate={setDate} />
    </div>
  );
};
