import { use, useEffect, useState } from "react"
import { useUserContext } from "../../../context"
import { Arrow, BorderedButton, Button, Card, CoffeeIcon, ComptheuresSwitch, Cross, CrossIcon, OrbitronTitle, Paragraph, Plus, RealArrow, ReverseParagraph, SpecialDayButton, SubTitle, Title, WorkIcon } from "../../atoms"
import { ConfirmModal, SmallStraightLogo, TimeInput } from "../../molecules"
import { Calendar } from "../Calendar/Calendar"
import { TimeBlock } from "../../organisms";
import { useCalendarContext } from "../../../context/calendar"
import { toast } from "react-toastify"
import { Recapitulatif } from "../../organisms"
import { Notations } from "./Notations"
import { createTime, deleteStat, recapList, statsList } from "../../../api/time/time"
import { CalendarMonths, CustomTimeNotation } from "./_components"

export function Comptheures() {

    const { frenchDays, getMonth, setTheDay, getPrevMonth, getNextMonth, setTimes, currentDay, setCurrentDay, refresh, getWeekNumber, currentCustomTimes, setCurrentCustomTimes } = useCalendarContext();
    const { setBurgerOpen, user, setUser, enterprise, contentLoading, setContentLoading } = useUserContext()

    const [edit, setEdit] = useState(true)
    const [comptheuresSwitchState, setComptheuresSwitchState] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalCheck, setModalCheck] = useState(false)
    const [notationSelected, setNotationSelected] = useState(null)
    const [initialNotation, setInitialNotation] = useState(null)
    const [notationType, setNotationType] = useState(null)
    const [customSelected, setCustomSelected] = useState(false)
    const [currentNumber, setCurrentNumber] = useState("")
    const [recapData, setRecapData] = useState([])
    const [myStats, setMyStats] = useState([])
    const [specialDays, setSpecialDays] = useState([])
    const [todayStatus, setTodayStatus] = useState(null)
    const [recapLoading, setRecapLoading] = useState(false)
    const [validateLoading, setValidateLoading] = useState(false)

    // when clicking on a day, change the current day
    const changeCurrentDay = (day) => {
        setCurrentDay(new Date(day.year, day.month, day.number));
        goodActualTimes(new Date(day.year, day.month, day.number))
    }

    // when clicking on a day, know which type of notation is selected
    const pickedNotation = (notation, items) => {
        switch (notation) {
            case "AUTO":
                if (notationSelected === "AUTO") {
                    setNotationSelected(null)
                    setNotationType(null)
                } else {
                    setNotationSelected("AUTO")
                    setNotationType("AUTO")
                    setEdit(true)
                }
                break;
            case "CUSTOM":
                if (items === notationSelected) {
                    setNotationSelected(null)
                    setNotationType(null)
                    setCustomSelected(false)
                } else {
                    setNotationSelected(items)
                    setNotationType("CUSTOM")
                    setCustomSelected(true)
                }
                break;
            case "SPECIAL":
                if (items?.id === notationSelected?.id) {
                    setNotationSelected(null)
                    setNotationType(null)
                    setEdit(false)
                } else {
                    setNotationSelected(items)
                    setNotationType("SPECIAL")
                    setEdit(true)
                }
                break;
            default:
                break;
        }
    }

    // check the modal to not have it appear every time
    const modalCheckHandler = () => {
        if (localStorage.getItem("timeConfirmation") === null) {
            localStorage.setItem("timeConfirmation", false);
        } else if (localStorage.getItem("timeConfirmation") === "true") {
            setModalCheck(true);
        }
    };


    // get the realisation status of the current day
    const checkTimeToday = () => {
        const today = myStats.find(time => time.day === currentDay.getDate() && time.month === currentDay.getMonth() && time.year === currentDay.getFullYear())
        if (today?.realisationStatus) {
            switch (today.realisationStatus) {
                case "IN_VALIDATION":
                    setTodayStatus("En attente de validation")
                    break;
                case "VALIDATED":
                    setTodayStatus("Validé par l'administateur")
                    break;
                case "REFUSED":
                    setTodayStatus("Refusé par l'administateur")
                    break;
                default:
            }
        } else {
            setTodayStatus(null)
        }
    }

    // get if there is a stat for the current day and if there is, give what type of notation is selected
    const getTimeOfTheDay = async (day) => {
        setNotationSelected(null)
        setNotationType(null)
        setInitialNotation(null)
        setCustomSelected(false)
        const myStat = myStats?.find(stat => stat.day === day.getDate() && stat.month === day.getMonth() && stat.year === day.getFullYear())
        if (myStat?.specialTime) {
            setInitialNotation(myStat?.specialTime?.specialDay)
            setNotationSelected(myStat?.specialTime?.specialDay)
            setNotationType("SPECIAL")
        }
        if (!myStat?.specialTime && myStat?.CustomTime?.length === 0) {
            setInitialNotation("AUTO")
            setNotationSelected("AUTO")
            setNotationType("AUTO")
        }

        if (!myStat?.specialTime && myStat?.CustomTime?.length > 0) {
            setInitialNotation(myStat?.CustomTime)
            setNotationSelected(myStat?.CustomTime)
            setCustomSelected(true)
            setNotationType("CUSTOM")
        }
    }

    // get allTimes of the user
    const getMyStats = async () => {
        const response = await statsList()
        if (response.error === false) {
            setMyStats(response.data.stats)
            setTimes(response.data.stats)
        }
    }

    // change the type of the clock
    const changeClockType = (index, type) => {
        const newClocks = [...currentCustomTimes]
        if (type === "WORK") {
            newClocks[index].type = "BREAK"
            setCurrentCustomTimes(newClocks)
        }
        if (type === "BREAK") {
            newClocks[index].type = "WORK"
            setCurrentCustomTimes(newClocks)
        }
    }

    // get custom times for custom days if there is one
    const goodActualTimes = (date) => {
        // get the unique item where the date is the same as the current day
        const dayClocks = myStats?.filter(stat => stat.year === date.getFullYear() && stat.month === date.getMonth() && stat.day === date.getDate())
        if (dayClocks && dayClocks[0]?.CustomTime?.length === 0 || dayClocks?.length === 0) {
            const newClocks = [{
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
            ]
            setCurrentCustomTimes(newClocks)
        }
        if (dayClocks && dayClocks[0]?.CustomTime.length > 0) {
            setCurrentCustomTimes(dayClocks[0]?.CustomTime)
            setEdit(false)
        } else {
            setEdit(true)
        }

    }

    // display the add time button if all the previous custom times are filled
    const displayAddOneTimeButton = () => {
        let canAdd = true
        currentCustomTimes.forEach(time => {
            if (time.start === "" || time.end === "") {
                canAdd = false
            }
        })
        return canAdd
    }

    // get recap for the current day/week/month
    const getRecapTimes = async () => {
        const date = {
            day: currentDay.getDate(),
            month: currentDay.getMonth(),
            year: currentDay.getFullYear(),
        }
        setRecapLoading(true)
        const response = await recapList(date)
        if (response.error === false) {
            setRecapData(response.data.recap)
            setRecapLoading(false)
        } else {
            toast.error("Erreur dans la récupération des données")
            setRecapLoading(false)
        }
    }

    // validate time for the day
    const validateTimes = async (item, type) => {
        console.log(item, type)
        if (modalCheck) {
            localStorage.setItem("timeConfirmation", true)
        }
        if (edit) {
            setValidateLoading(true)
            if (type === null && item === null && notationSelected === null) {
                const data = {
                    day: currentDay.getDate(),
                    month: currentDay.getMonth(),
                    year: currentDay.getFullYear(),
                }
                const response = await deleteStat(data)
                if (response.error === false) {
                    setInitialNotation(null)
                    setNotationSelected(null)
                    setNotationType(null)
                    setEdit(false)
                    setModal(false)
                    setMyStats(response.data)
                    setTimes(response.data)
                    setUser({ ...user, userEnterprise: { ...user.userEnterprise, Stats: response.data } })
                    toast.success(response.message)
                }
                else {
                    toast.error(response.message)
                }
            } else {

                let payload = {}
                switch (type) {
                    case "CUSTOM":
                        payload = {
                            type: type,
                            data: {
                                times: item,
                                day: currentDay.getDate(),
                                month: currentDay.getMonth(),
                                year: currentDay.getFullYear(),
                                week: getWeekNumber(currentDay),
                            }
                        }
                        break;
                    case "SPECIAL":
                        payload = {
                            type: type,
                            data: {
                                ...item,
                                day: currentDay.getDate(),
                                month: currentDay.getMonth(),
                                year: currentDay.getFullYear(),
                                week: getWeekNumber(currentDay),
                            }
                        }
                        break;
                    case "AUTO":
                        payload = {
                            type: type,
                            data: {
                                day: currentDay.getDate(),
                                month: currentDay.getMonth(),
                                year: currentDay.getFullYear(),
                                week: getWeekNumber(currentDay),
                            }
                        }
                }

                const response = await createTime(payload)
                if (response.error === false) {
                    setInitialNotation(item)
                    setNotationSelected(item)
                    setEdit(false)
                    setModal(false)
                    setMyStats(response.data)
                    setTimes(response.data)
                    setUser({ ...user, userEnterprise: { ...user.userEnterprise, Stats: response.data } })
                    toast.success(response.message)
                } else {
                    toast.error(response.message)
                }
            setValidateLoading(false)
            }
        } else {
            setEdit(true)
        }
    }

    const changeMonth = (direction) => {
        if (direction === "previous") {
            setTheDay(false)
            let newDate = new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, currentDay.getDate())
            while (newDate.getMonth() === currentDay.getMonth()) {
                newDate.setDate(newDate.getDate() - 1)
            }
            setCurrentDay(newDate)
        } else {
            setTheDay(true)
            let newDate = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, currentDay.getDate())
            while (newDate.getMonth() === currentDay.getMonth() + 2) {
                newDate.setDate(newDate.getDate() - 1)
            }
            setCurrentDay(newDate)
        }
    }

    useEffect(() => {
        setContentLoading(true)
        setBurgerOpen(false); refresh();
        getMyStats()
        modalCheckHandler()
    }, [])

    useEffect(() => {
        getTimeOfTheDay(currentDay)
        checkTimeToday()

    }, [currentDay])

    useEffect(() => {
        setContentLoading(true)
        getRecapTimes()
        setContentLoading(false)
    }, [getWeekNumber(currentDay)])

    useEffect(() => {
        setRecapLoading(true)
        setContentLoading(true)
        goodActualTimes(currentDay);
        getRecapTimes()
        checkTimeToday()
        currentDay ? getTimeOfTheDay(currentDay) : getTimeOfTheDay(new Date)
        setContentLoading(false)
        setRecapLoading(false)
    }, [myStats])

    useEffect(() => {
        setSpecialDays(enterprise?.configEnterprise?.SpecialDays)
    }, [enterprise])


    return (
        contentLoading ?
            <div className="flex items-center justify-center h-full"><div className="loader"></div></div>
            :
            <div>
                {modal &&
                    <ConfirmModal modal={modal} onClick={() => validateTimes(notationSelected, notationType)} type="time" user={user} crossClick={() => setModal(false)} checkbox={true} checkboxClick={() => setModalCheck(!modalCheck)} checkboxState={modalCheck} />
                }
                <SmallStraightLogo className={"md:hidden"} />
                <CalendarMonths changeMonth={changeMonth} />
                <Calendar times={myStats} frenchDays={frenchDays} setCurrentNumber={setCurrentNumber} day={currentDay} currentNumber={currentNumber} changeCurrentDay={changeCurrentDay} />
                <ComptheuresSwitch comptheuresSwitchState={comptheuresSwitchState} setComptheuresSwitchState={setComptheuresSwitchState} />
                {comptheuresSwitchState ?
                    <Recapitulatif recapData={recapData} myStats={myStats} recapLoading={recapLoading} setRecapLoading={setRecapLoading} />
                    :
                    customSelected ?
                        <CustomTimeNotation validateLoading={validateLoading} setValidateLoading={setValidateLoading } customSelected={customSelected} setCustomSelected={setCustomSelected} edit={edit} changeClockType={changeClockType} displayAddOneTimeButton={displayAddOneTimeButton} validateTimes={validateTimes} notationType={notationType} />
                        :
                        <Notations validateLoading={validateLoading} setValidateLoading={setValidateLoading} pickedNotation={pickedNotation} modalCheck={modalCheck} notationSelected={notationSelected} validateTimes={validateTimes} notationType={notationType} initialNotation={initialNotation} setModal={setModal} specialDays={specialDays} />
                }
                <div className="w-screen -ml-[5.5%] md:hidden gap-10 dark:border-y-white border-y-blue flex flex-col py-10 border-y md:mb-0 mb-[60px]">
                    <Paragraph className="text-center"><strong>Automatique : </strong>{user?.userEnterprise?.enterprise?.configEnterprise?.workHourADay}</Paragraph>
                    {todayStatus && <Paragraph className="text-center"><strong>Statut : </strong>{todayStatus}</Paragraph>}
                </div>
            </div>
    )
}