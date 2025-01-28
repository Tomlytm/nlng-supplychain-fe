export function getFormattedDate(date: string) {
  // Array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Array of abbreviated month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //  Get the current date
  // const now = new Date();
  // Get the day of the week, day of the month, month, and year
  const newdate = new Date(date);
  const weekday = weekdays[newdate.getDay()];
  const day = String(newdate.getDate()).padStart(2, "0");
  const month = months[newdate.getMonth()];
  const year = newdate.getFullYear();

  // Format the date
  const formattedDate = `${weekday} ${day} ${month}, ${year}`;
  return formattedDate;
}

// export const handleLastModified = (file: File) => {
//   const lastModified = new Date(file.lastModified);
//   const today = new Date();
//   const timeDiff = today.getTime() - lastModified.getTime();

//   const sec = Math.floor((timeDiff / 1000) % 60);
//   const mins = Math.floor((timeDiff / (1000 * 60)) % 60);
//   const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
//   const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

//   if (days > 0) {
//     return `${days} day${days > 1 ? "s" : ""} ago`;
//   } else if (hours > 0) {
//     return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   } else if (mins > 0) {
//     return `${mins} minute${mins > 1 ? "s" : ""} ago`;
//   } else {
//     return `${sec} second${sec > 1 ? "s" : ""} ago`;
//   }
// };
