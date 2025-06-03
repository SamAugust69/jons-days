import { useState } from "react";
import { Calender } from "./components/Calender";
import { SingleDay } from "./components/SingleDay";
import { Button } from "./components/ui/Button";
import { Dialog, DialogContent } from "./components/ui/dialog";

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [showCalender, setShowCalender] = useState(true);

  return (
    <div className="bg-neutral-200 gap-2 flex-col dots w-screen h-screen font-roboto flex justify-center items-center ">
      <SingleDay date={date} setShowCalender={setShowCalender} />
      <Dialog isOpen={showCalender} setIsOpen={setShowCalender}>
        <Calender date={date} setDate={setDate} />
      </Dialog>

      <footer className="bg-neutral-900/25 w-full h-16 absolute bottom-0"></footer>
    </div>
  );
};
