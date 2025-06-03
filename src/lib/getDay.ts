import days from "../days.json";

export function getDayInfo(date: Date) {
  return days.find(
    (day) =>
      parseInt(day.month) === date.getMonth() + 1 &&
      parseInt(day.day) === date.getDate()
  );
}
