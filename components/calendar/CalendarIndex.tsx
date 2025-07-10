import { useCalendarLayout } from "@/hooks/calendar/useCalendarLayout";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import Calendar from "./Calendar";
import CalendarHeader from "./CalendarHeader";

const CalendarIndex = () => {
  const today = new Date();
  today.setHours(0, 0, 0);
  const year = today.getFullYear();
  const month = today.getMonth();

  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDate, setSelectedDate] = useState(today);

  const [visibleYear, setVisibleYear] = useState(selectedYear);
  const [visibleMonth, setVisibleMonth] = useState(selectedMonth);

  const { WEEK_HEIGHT, CELL_WIDTH, CELL_HEIGHT } = useCalendarLayout();

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const prevYear = visibleMonth === 0 ? visibleYear - 1 : visibleYear;
  const nextYear = visibleMonth === 11 ? visibleYear + 1 : visibleYear;
  const prevMonth = (visibleMonth + 11) % 12;
  const nextMonth = (visibleMonth + 1) % 12;

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = useSharedValue(-SCREEN_WIDTH);

  // 상태 업데이트와 translateX 리셋을 동시에 실행
  const updateCalendarAndReset = (direction: "next" | "prev") => {
    const newMonth =
      direction === "next" ? (visibleMonth + 1) % 12 : (visibleMonth + 11) % 12;
    const newYear =
      direction === "next"
        ? visibleMonth === 11
          ? visibleYear + 1
          : visibleYear
        : visibleMonth === 0
          ? visibleYear - 1
          : visibleYear;

    setSelectedYear(newYear);
    setSelectedMonth(newMonth);
    setVisibleYear(newYear);
    setVisibleMonth(newMonth);

    // 같은 프레임에서 translateX 리셋
    requestAnimationFrame(() => {
      translateX.value = -SCREEN_WIDTH;
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = -SCREEN_WIDTH + event.translationX;
    })
    .onEnd((event) => {
      const threshold = SCREEN_WIDTH / 3;

      if (event.translationX < -threshold) {
        // 다음 달로 이동
        translateX.value = withTiming(
          -SCREEN_WIDTH * 2,
          { duration: 250 },
          (finished) => {
            if (finished) {
              runOnJS(updateCalendarAndReset)("next");
            }
          }
        );
      } else if (event.translationX > threshold) {
        // 이전 달로 이동
        translateX.value = withTiming(0, { duration: 250 }, (finished) => {
          if (finished) {
            runOnJS(updateCalendarAndReset)("prev");
          }
        });
      } else {
        // 원래 위치로 복귀
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 250 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <ThemedView className="px-5">
      <CalendarHeader
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedYear={setSelectedYear}
        setSelectedMonth={setSelectedMonth}
      />

      <ThemedView className="flex flex-row" style={{ height: WEEK_HEIGHT }}>
        {weekDays.map((day, i) => (
          <ThemedText key={`week-${i}`} style={{ width: CELL_WIDTH }}>
            {day}
          </ThemedText>
        ))}
      </ThemedView>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            {
              flexDirection: "row",
              width: SCREEN_WIDTH * 3,
            },
            animatedStyle,
          ]}
        >
          <Calendar
            year={prevYear}
            month={prevMonth}
            CELL_WIDTH={CELL_WIDTH}
            CELL_HEIGHT={CELL_HEIGHT}
            today={today}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <Calendar
            year={visibleYear}
            month={visibleMonth}
            CELL_WIDTH={CELL_WIDTH}
            CELL_HEIGHT={CELL_HEIGHT}
            today={today}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <Calendar
            year={nextYear}
            month={nextMonth}
            CELL_WIDTH={CELL_WIDTH}
            CELL_HEIGHT={CELL_HEIGHT}
            today={today}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Animated.View>
      </GestureDetector>
    </ThemedView>
  );
};

export default CalendarIndex;
