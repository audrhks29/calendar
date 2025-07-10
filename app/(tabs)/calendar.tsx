import CalendarIndex from "@/components/calendar/CalendarIndex";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      {/* <ThemedView>
        <ThemedText>캘린더 화면입니다</ThemedText>
        <MonthText />
      </ThemedView> */}
      <CalendarIndex />
    </SafeAreaView>
  );
}
