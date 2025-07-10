import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useCalendarLayout = () => {
  const insets = useSafeAreaInsets();

  const CALENDAR_PADDING = 20;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  const HEADER_HEIGHT = 60;
  const WEEK_HEIGHT = 40;
  const BAR_HEIGHT = 90;

  const CELL_WIDTH = (SCREEN_WIDTH - CALENDAR_PADDING * 2) / 7;
  const CELL_HEIGHT =
    (SCREEN_HEIGHT - WEEK_HEIGHT - HEADER_HEIGHT - BAR_HEIGHT - insets.bottom) /
    6;

  return {
    CALENDAR_PADDING,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    HEADER_HEIGHT,
    WEEK_HEIGHT,
    BAR_HEIGHT,
    CELL_WIDTH,
    CELL_HEIGHT,
    insets,
  };
};
