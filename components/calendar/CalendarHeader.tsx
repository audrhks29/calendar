import { useCalendarLayout } from "@/hooks/calendar/useCalendarLayout";
import { Dispatch, SetStateAction } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

type PropsType = {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: Dispatch<SetStateAction<number>>;
  setSelectedMonth: Dispatch<SetStateAction<number>>;
};

const CalendarHeader = ({
  selectedYear,
  selectedMonth,
  setSelectedYear,
  setSelectedMonth,
}: PropsType) => {
  const { HEADER_HEIGHT } = useCalendarLayout();
  return (
    <ThemedView
      className="flex flex-row justify-between items-center border-b"
      style={{ height: HEADER_HEIGHT }}
    >
      {/* <TouchableOpacity
        onPress={() => {
          if (selectedMonth === 0) {
            setSelectedYear(selectedYear - 1);
            setSelectedMonth(11);
          } else {
            setSelectedMonth(selectedMonth - 1);
          }
        }}
      >
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity> */}

      <ThemedText
        style={{
          textAlign: "center",
          fontSize: 20,
        }}
      >
        {selectedYear}년 {selectedMonth + 1}월
      </ThemedText>

      {/* <TouchableOpacity
        onPress={() => {
          if (selectedMonth === 11) {
            setSelectedYear(selectedYear + 1);
            setSelectedMonth(0);
          } else {
            setSelectedMonth(selectedMonth + 1);
          }
        }}
      >
        <AntDesign name="right" size={24} color="white" />
      </TouchableOpacity> */}
    </ThemedView>
  );
};

export default CalendarHeader;
