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

  const [currentCustomTimes, setCurrentCustomTimes] = useState([{
    name: "Journée de travail",
    order: 1,
    type: "WORK",
    start: "",
    end: "",
  }, {
    name: "Pause déjeuner",
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

  const getFirstMonthRecap = (config,currentDay) => {
    let month = 0;
    if(currentDay?.getDate() >= config?.start){
      month = currentDay.getMonth() 
    }else{
      month = currentDay.getMonth() - 1
    }
    
    if(month === -1){
      month = 11
    } if(month === 12){
      month = 0
    }
    
    return frenchMonths[month].abrev
  }

  const getSecondMonthRecap = (config, currentDay) => {
    let month = 0;
    if(currentDay?.getDate() >= config?.start && config?.start >= config?.end){
      month = currentDay.getMonth() + 1
    }else{
      month = currentDay.getMonth()
    }

    if(month === -1){
      month = 11
    } if(month === 12){
      month = 0
    }

    return frenchMonths[month].abrev
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
      currentCustomTimes,
      setCurrentCustomTimes,
      clocks,
      setClocks,
      workTotal,
      setWorkTotal,
      breakTotal,
      setBreakTotal,
      getFirstMonthRecap,
      getSecondMonthRecap
    }),
    [frenchDays, frenchMonths, setFrenchDays, getFirstMonthRecap, getSecondMonthRecap, setFrenchMonths, months, setMonths, today, setToday, getPrevMonth, getMonth, getNextMonth, setTheDay, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh,
      getWeekNumber, currentCustomTimes, setCurrentCustomTimes, clocks, setClocks, workTotal, setWorkTotal, breakTotal, setBreakTotal]
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
