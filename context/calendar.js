import React, { useContext, useMemo, useState } from "react";

const CalendarContext = React.createContext({ calendar: null });
CalendarContext.displayName = "CalendarContext";

const CalendarContextProvider = ({ children }) => {

  const [frenchDays, setFrenchDays] = useState([
    { french: "Lundi", abrev: "Lun" },
    { french: "Mardi", abrev: "Mar" },
    { french: "Mercredi", abrev: "Mer" },
    { french: "Jeudi", abrev: "Jeu" },
    { french: "Vendredi", abrev: "Ven" },
    { french: "Samedi", abrev: "Sam" },
    { french: "Dimanche", abrev: "Dim" },
  ])

  const [frenchMonths, setFrenchMonths] = useState([
    { french: "Janvier", abrev: "Jan" },
    { french: "Février", abrev: "Fév" },
    { french: "Mars", abrev: "Mar" },
    { french: "Avril", abrev: "Avr" },
    { french: "Mai", abrev: "Mai" },
    { french: "Juin", abrev: "Juin" },
    { french: "Juillet", abrev: "Juil" },
    { french: "Août", abrev: "Août" },
    { french: "Septembre", abrev: "Sep" },
    { french: "Octobre", abrev: "Oct" },
    { french: "Novembre", abrev: "Nov" },
    { french: "Décembre", abrev: "Déc" },
  ])

  const [months, setMonths] = useState(['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'])

  const [today, setToday] = useState(months.indexOf(months[new Date().getMonth()]))

  const [clocks, setClocks] = useState([])

  const [currentDay, setCurrentDay] = useState(new Date())

  const getWeekNumber = (currentDay) => {
    let startDate = new Date(currentDay.getFullYear(), 0, 1);
    var days = Math.floor((currentDay - startDate) /
      (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil((days + 1) / 7);
    // Display the calculated result       
    return weekNumber;
  }

  const [currentClocks, setCurrentClocks] = useState([{
    name: "Journée de travail",
    year: currentDay?.getFullYear(),
    week: getWeekNumber(currentDay),
    day: currentDay?.getDate(),
    order: 1,
    type: "WORK",
    start: "",
    end: "",
  }, {
    name: "Pause déjeuner",
    year: currentDay?.getFullYear(),
    month: currentDay?.getMonth(),
    week: getWeekNumber(currentDay),
    day: currentDay?.getDate(),
    hour: currentDay?.getHours(),
    order: 2,
    type: "BREAK",
    start: "",
    end: "",
  }
  ])

  const getPrevMonth = () => {
    if (today === 0) {
      return frenchMonths[11].abrev
    } else {
      return frenchMonths[today - 1].abrev
    }
  }

  const getMonth = () => {
    return frenchMonths[today].french
  }

  const getNextMonth = () => {
    if (today === 11) {
      return frenchMonths[0].abrev
    } else {
      return frenchMonths[today + 1].abrev
    }
  }

  const setTheDay = (bool) => {
    if (bool) {
      if (today === 11) {
        setToday(0)
      } else {
        setToday(today + 1)
      }
    } else {
      if (today === 0) {
        setToday(11)
      } else {
        setToday(today - 1)
      }
    }
  }



  const getMonthByIndex = () => {
    return frenchMonths[currentDay.getMonth()].french
  }

  const getDayByIndex = () => {
    let day = currentDay.getDay() - 1
    if (day === -1) {
      day = 6
    }
    return frenchDays[day]?.french
  }

  const refresh = () => {
    setCurrentDay(new Date())
    setToday(months.indexOf(months[new Date().getMonth()]))
  }

  const [workTotal, setWorkTotal] = useState(null)
    const [breakTotal, setBreakTotal] = useState(null)

  const stateValues = useMemo(
    () => ({
      frenchDays,
      setFrenchDays,
      frenchMonths,
      setFrenchMonths,
      months,
      setMonths,
      today,
      setToday,
      getPrevMonth,
      getMonth,
      getNextMonth,
      setTheDay,
      getMonthByIndex,
      getDayByIndex,
      currentDay,
      setCurrentDay,
      refresh,
      getWeekNumber,
      currentClocks,
      setCurrentClocks,
      clocks,
      setClocks,
      workTotal,
      setWorkTotal,
      breakTotal,
      setBreakTotal
    }),
    [frenchDays, frenchMonths, setFrenchDays, setFrenchMonths, months, setMonths, today, setToday, getPrevMonth, getMonth, getNextMonth, setTheDay, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh,
      getWeekNumber, currentClocks, setCurrentClocks, clocks, setClocks, workTotal, setWorkTotal, breakTotal, setBreakTotal]
  );

  return (
    <CalendarContext.Provider value={stateValues}>{children}</CalendarContext.Provider>
  );
};
const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (context === undefined) {
    throw new Error("Context was used outside of its Provider");
  }

  return context;
};

export { CalendarContextProvider, useCalendarContext, CalendarContext };
