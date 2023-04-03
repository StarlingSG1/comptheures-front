import { useEffect, useState } from "react";
import { useCalendarContext } from "../../../context/calendar";
import { Card, ReverseParagraph, SubTitle } from "../../atoms";

export function Recapitulatif({ myStats, recapData, recapLoading }) {

    const { frenchDays, frenchMonths, getPrevMonth, getMonth, getFirstMonthRecap, getSecondMonthRecap, clocks, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh, getWeekNumber } = useCalendarContext();


    const [currentWeekNumber, setCurrentWeekNumber] = useState(null)
    const [workHourToday, setWorkHourToday] = useState(0)
    const [actualMonth, setActualMonth] = useState(new Date().getMonth())


    const getWorkOfTheDay = (day) => {
        const workOfTheDay = myStats.filter(clock => clock.day === day.getDate() && clock.month === day.getMonth() && clock.year === day.getFullYear())
        setWorkHourToday(workOfTheDay[0]?.work || 0)
    }

    useEffect(() => {
        getWorkOfTheDay(currentDay)
    }, [myStats])

    useEffect(() => {
        setCurrentWeekNumber(getWeekNumber(new Date()))
        setActualMonth(frenchMonths[new Date().getMonth()].french)
    }, [])

    useEffect(() => {
        getWorkOfTheDay(currentDay)
    }, [currentDay])

    const handleMonthState = (config, currentDay) => {
        let month = 0;
        if (currentDay?.getDate() >= config?.start) {
            month = currentDay.getMonth()
        } else {
            month = currentDay.getMonth() - 1
        }

        if (month === -1) {
            month = 11
        } if (month === 12) {
            month = 0
        }

        // get the last day of the month
        const lastDay = new Date(currentDay.getFullYear(), month + 1, 0);
        // if lastDay.getDate() < config.start, make the difference then make config.start - difference
        if (lastDay.getDate() < config.start) {
            recapData.month.start = 1
            return recapData.month.start
        } 
        return recapData.month.start
    }

    const handleNextMonthState = (config, currentDay) => {
        let month = 0;
        if (currentDay?.getDate() < config?.end) {
            month = currentDay.getMonth()
        } else {
            month = currentDay.getMonth() + 1
        }

        if (month === -1) {
            month = 11
        } if (month === 12) {
            month = 0
        }
        const lastDay = new Date(currentDay.getFullYear(), month + 1, 0);
        // if lastDay.getDate() < config.start, make the difference then make config.start - difference
        if (lastDay.getDate() < config.end) {
            const item = config.end - lastDay.getDate()
            recapData.month.end = config.end - item
            return recapData.month.end
        } 
        return recapData.month.end
    }

    return (
        recapLoading ? <div className="flex items-center justify-center h-[440px]"><div className="loader"></div></div> : 
        <div>
            <div className="flex flex-col w-full items-center mt-10 gap-10">
                <div className="flex flex-col w-full items-center gap-[15px] ">
                    <SubTitle className="font-orbitron text-center">{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>{workHourToday}</strong> {workHourToday === 0 && "heure"} travaillées</ReverseParagraph>
                    </Card>
                </div>
                <div className="flex flex-col w-full items-center gap-[15px] ">
                    <SubTitle className="font-orbitron text-center">{"Lun. " + recapData?.week?.start.number + " " + frenchMonths[recapData?.week?.start?.month].french + " au dim. " + recapData?.week?.end.number + " " + frenchMonths[recapData?.week?.end?.month].french}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>{recapData?.week?.length}</strong> {recapData?.week?.length < 2 ? "jour" : "jours"}  | <strong>{recapData.week.total}</strong> travaillées</ReverseParagraph>
                    </Card>
                </div>
                <div className="flex flex-col w-full items-center gap-[15px] md:mb-0 mb-60">
                    <SubTitle className="font-orbitron text-center">{handleMonthState(recapData?.month, currentDay)  + " " + getFirstMonthRecap(recapData?.month, currentDay) + " au " + handleNextMonthState(recapData?.month, currentDay) + " " + getSecondMonthRecap(recapData?.month, currentDay)}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>{recapData?.month?.length}</strong> {clocks?.length < 2 ? "jour" : "jours"} | <strong>{recapData?.month?.total}</strong> travaillées</ReverseParagraph>
                    </Card>
                </div>
            </div>
        </div>
    )
}