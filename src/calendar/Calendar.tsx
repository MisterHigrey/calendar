import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaCircleArrowDown,
  FaCircleArrowUp,
} from "react-icons/fa6";

import Section from "./Section";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
};

const Calendar: React.FC<Props> = ({ value = new Date(), onChange }) => {
  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => onChange(sub(value, { months: 1 }));
  const nextMonth = () => onChange(add(value, { months: 1 }));
  const prevYear = () => onChange(sub(value, { years: 1 }));
  const nextYear = () => onChange(add(value, { years: 1 }));

  const handleClickDate = (index: number) => {
    const date = setDate(value, index);
    onChange(date);
  };

  return (
    <div className="w-[400px] bg-white rounded-md shadow-md p-4">
      <div className="grid grid-cols-7 items-center justify-center text-center">
        <Section onClick={prevYear} className="cursor-pointer">
          <FaCircleArrowDown />
        </Section>
        <Section onClick={prevMonth} className="cursor-pointer">
          <FaArrowLeftLong />
        </Section>
        <Section className="col-span-3 font-bold text-lg">
          {format(value, "LLLL yyyy")}
        </Section>
        <Section onClick={nextMonth} className="cursor-pointer">
          <FaArrowRightLong />
        </Section>
        <Section onClick={nextYear} className="cursor-pointer">
          <FaCircleArrowUp />
        </Section>

        {days.map((day) => (
          <Section
            key={day}
            className="text-xs font-bold uppercase text-gray-600"
          >
            {day}
          </Section>
        ))}

        {Array.from({ length: prefixDays }).map((_, index) => (
          <Section key={index} />
        ))}

        {Array.from({ length: numDays }).map((_, index) => {
          const date = index + 1;
          const isCurrentDate = date === value.getDate();

          return (
            <Section
              key={date}
              isActive={isCurrentDate}
              onClick={() => handleClickDate(date)}
              className={`p-2 ${
                isCurrentDate ? "bg-blue-500 text-white rounded-full" : ""
              }`}
            >
              {date}
            </Section>
          );
        })}

        {Array.from({ length: suffixDays }).map((_, index) => (
          <Section key={index} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
