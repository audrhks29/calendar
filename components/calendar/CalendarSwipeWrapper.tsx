import { useRef } from "react";
import { PanResponder, View } from "react-native";

const CalendarSwipeWrapper = ({
  children,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}: PropsType & { children: React.ReactNode }) => {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // X축으로 충분히 움직였을 때 감지
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          // 오른쪽 → 이전 달
          if (selectedMonth === 0) {
            setSelectedYear(selectedYear - 1);
            setSelectedMonth(11);
          } else {
            setSelectedMonth(selectedMonth - 1);
          }
        } else if (gestureState.dx < -50) {
          // 왼쪽 → 다음 달
          if (selectedMonth === 11) {
            setSelectedYear(selectedYear + 1);
            setSelectedMonth(0);
          } else {
            setSelectedMonth(selectedMonth + 1);
          }
        }
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers} className="flex-1">
      {children}
    </View>
  );
};

export default CalendarSwipeWrapper;
