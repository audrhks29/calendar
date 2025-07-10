export const generateCalendarDates = (year: number, month: number) => {
  const dates: (Date | null)[] = [];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay(); // 0: 일, 1: 월 ...

  // 앞쪽 빈칸 채우기
  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }

  // 실제 날짜 채우기
  for (let d = 1; d <= lastDay.getDate(); d++) {
    dates.push(new Date(year, month, d));
  }

  // 뒤쪽 빈칸 채워서 총 42칸 맞추기
  while (dates.length < 42) {
    dates.push(null);
  }

  return dates;
};
