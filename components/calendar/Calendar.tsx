import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { generateCalendarDates } from "@/utils/calendar/generateCalendarDates";
import { Dispatch, SetStateAction } from "react";
import { Dimensions, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

type PropsType = {
  year: number;
  month: number;
  CELL_WIDTH: number;
  CELL_HEIGHT: number;
  today: Date;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
};

const Calendar = ({
  year,
  month,
  CELL_WIDTH,
  CELL_HEIGHT,
  today,
  selectedDate,
  setSelectedDate,
}: PropsType) => {
  const SCREEN_WIDTH = Dimensions.get("window").width; // 스크린 너비

  const colorScheme = useColorScheme();

  const dates = generateCalendarDates(year, month); // 날짜 생성

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  // console.log(selectedDate);
  return (
    <ThemedView
      className="flex flex-row flex-wrap"
      style={{ width: SCREEN_WIDTH }}
    >
      {dates.map((dt, index) => {
        const isSunday = index % 7 === 0;
        const isSaturday = index % 7 === 6;
        const isMatchToday = dt && isSameDate(today, dt); // 오늘 날짜가 있는지 확인
        const isSelectedDate = dt && isSameDate(selectedDate, dt); // 선택된 날짜인지 확인

        const textColor = isSunday
          ? "red"
          : isSaturday
            ? "blue"
            : Colors[colorScheme ?? "light"].text;

        return (
          <Pressable key={index} onPress={() => dt && setSelectedDate(dt)}>
            <ThemedView
              style={{
                width: CELL_WIDTH,
                height: CELL_HEIGHT,
                backgroundColor: isSelectedDate ? "red" : "transparent",
              }}
            >
              <ThemedText
                style={{
                  color: textColor,
                  textDecorationLine: isMatchToday ? "underline" : "none",
                }}
              >
                {dt ? dt.getDate() : ""}
              </ThemedText>
            </ThemedView>
          </Pressable>
        );
      })}
    </ThemedView>
  );
};

export default Calendar;
