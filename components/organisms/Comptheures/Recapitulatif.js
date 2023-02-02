import { useEffect, useState } from "react";
import { useCalendarContext } from "../../../context/calendar";
import { Card, ReverseParagraph, SubTitle } from "../../atoms";

export function Recapitulatif({ myStats,recapData }) {

    const { frenchDays, frenchMonths, getPrevMonth, getMonth,getFirstMonthRecap, getSecondMonthRecap, clocks, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh, getWeekNumber } = useCalendarContext();


    const [currentWeekNumber, setCurrentWeekNumber] = useState(null)
    const [monthHours, setMonthHours] = useState(0)
    const [weekHours, setWeekHours] = useState(0)
    const [weekClocks, setWeekClocks] = useState([])
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

    return (
        <div>
            <div className="flex flex-col w-full items-center mt-10 gap-10">
                <div className="flex flex-col w-full items-center gap-[15px] ">
                    <SubTitle className="font-orbitron">{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>{workHourToday}</strong> {workHourToday === 0 && "heure"} travaillées</ReverseParagraph>
                    </Card>
                </div>
                <div className="flex flex-col w-full items-center gap-[15px] ">
                    <SubTitle className="font-orbitron">{"Lundi " + recapData?.week?.start.number + " au dimanche " + recapData?.week?.end.number}</SubTitle>
                    <Card edit={true}>  
                        <ReverseParagraph><strong>{recapData?.week?.length}</strong> {recapData?.week?.length < 2 ? "jour" : "jours"}  | <strong>{recapData.week.total}</strong> travaillées</ReverseParagraph>
                    </Card>
                </div>
                <div className="flex flex-col w-full items-center gap-[15px] md:mb-0 mb-60">
                    <SubTitle className="font-orbitron">{recapData?.month?.start + " " + getFirstMonthRecap(recapData?.month, currentDay) + " au " + recapData?.month?.end + " " + getSecondMonthRecap(recapData?.month, currentDay)}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>{recapData?.month?.length}</strong> {clocks?.length < 2 ? "jour" : "jours"} | <strong>{recapData?.month?.total}</strong> travaillées</ReverseParagraph>
                    </Card>
                </div>
            </div>
        </div>
    )
}