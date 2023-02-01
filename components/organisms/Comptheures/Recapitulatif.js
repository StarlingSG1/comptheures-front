import { useEffect, useState } from "react";
import { useCalendarContext } from "../../../context/calendar";
import { Card, ReverseParagraph, SubTitle } from "../../atoms";

export function Recapitulatif({ myStats }) {

    const { frenchDays, frenchMonths, getPrevMonth, getMonth, getNextMonth, clocks, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh, getWeekNumber } = useCalendarContext();


    const [currentWeekNumber, setCurrentWeekNumber] = useState(null)
    const [monthHours, setMonthHours] = useState(0)
    const [weekHours, setWeekHours] = useState(0)
    const [weekClocks, setWeekClocks] = useState([])
    const [workHourToday, setWorkHourToday] = useState(0)
    const [actualMonth, setActualMonth] = useState(new Date().getMonth())



    const totalWeekHours = () => {
        let totalH = 0
        let totalM = 0
        let hours = []
        let minutes = []
        if (weekClocks?.length > 0) {
            // for (let i = 0; i < weekClocks?.length; i++) {
            //     const [h, m] = weekClocks[i].stats[0].work.split('h')
            //     hours.push(h)
            //     minutes.push(m)
            // }
            for (var h in hours) {
                totalH += parseInt(hours[h], 10);
            }
            // for each in minutes
            for (var m in minutes) {
                totalM += parseInt(minutes[m], 10);
            }
            // If the minutes exceed 60
            if (totalM >= 60) {
                // Divide minutes by 60 and add result to hours
                totalH += Math.floor(totalM / 60);
                // Add remainder of totalM / 60 to minutes
                totalM = totalM % 60;
            }
        }
        setWeekHours(totalH + 'h' + totalM)
    }

    const totalMonthHours = () => {
        let totalH = 0
        let totalM = 0
        let hours = []
        let minutes = []
        if (clocks?.length > 0) {
            // for (let i = 0; i < clocks?.length; i++) {
            //     const [h, m] = clocks[i].stats[0].work.split('h')
            //     hours.push(h)
            //     minutes.push(m)
            // }
            for (var h in hours) {
                totalH += parseInt(hours[h], 10);
            }
            // for each in minutes
            for (var m in minutes) {
                totalM += parseInt(minutes[m], 10);
            }
            // If the minutes exceed 60
            if (totalM >= 60) {
                // Divide minutes by 60 and add result to hours
                totalH += Math.floor(totalM / 60);
                // Add remainder of totalM / 60 to minutes
                totalM = totalM % 60;
            }
        }
        setMonthHours(totalH + 'h' + totalM)
    }

    const getClocksOfTheWeek = () => {
        const weekClocks = clocks.filter(clock => clock.week === currentWeekNumber)
        setWeekClocks(weekClocks)
    }

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

    useEffect(() => {
        getClocksOfTheWeek()
    }, [currentWeekNumber])



    useEffect(() => {
        totalWeekHours()
    }, [weekClocks])

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
                    <SubTitle className="font-orbitron">{"Semaine " + getWeekNumber(currentDay)}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>{weekClocks.length}</strong> {weekClocks.length < 2 ? "jour" : "jours"} | <strong>{weekClocks.length === 0 ? 0 : weekHours}</strong> {weekClocks.length === 0 && "heure"} travaillées</ReverseParagraph>
                    </Card>
                </div>
                <div className="flex flex-col w-full items-center gap-[15px] md:mb-0 mb-60">
                    <SubTitle className="font-orbitron">{getMonthByIndex()}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>{clocks?.length}</strong> {clocks?.length < 2 ? "jour" : "jours"} | <strong>{monthHours}</strong> travaillées</ReverseParagraph>
                    </Card>
                </div>
            </div>
        </div>
    )
}