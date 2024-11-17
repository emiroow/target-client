export const convertPersianDate = (gregorianDate: string): string => {
  const date = new Date(gregorianDate);

  const persianFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC",
  });

  return persianFormatter.format(date);
};
