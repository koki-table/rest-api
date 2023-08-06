// export const convertUtcToLocal = (utcDateStr: string): string => {
//   const utcDate = new Date(utcDateStr);
//   const newDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000);

//   const year = newDate.getFullYear();
//   const month = newDate.getMonth();
//   const date = newDate.getDate();
//   const hours = newDate.getHours();
//   const minutes = newDate.getMinutes();

//   const formattedTime = `${year}年${month}月${date}日${hours}時${minutes}分`;

//   return formattedTime;
// };

export const convertUtcToLocal = (utcDateStr: string): string => {
  const utcDate = new Date(utcDateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const localTime = utcDate.toLocaleString("ja-JP", options);

  return localTime;
};