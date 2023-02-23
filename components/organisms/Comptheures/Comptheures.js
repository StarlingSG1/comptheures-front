import { use, useEffect, useState } from "react"
import { useUserContext } from "../../../context"
import { Arrow, BorderedButton, Button, Card, CoffeeIcon, ComptheuresSwitch, Cross, CrossIcon, OrbitronTitle, Paragraph, Plus, RealArrow, ReverseParagraph, SpecialDayButton, SubTitle, Title, WorkIcon } from "../../atoms"
import { ConfirmModal, SmallStraightLogo, TimeInput } from "../../molecules"
import { Calendar } from "../Calendar/Calendar"
import { TimeBlock } from "../../organisms";
import { useCalendarContext } from "../../../context/calendar"
import { addTimes, getClocks } from "../../../api/clock/clock";
import { toast } from "react-toastify"
import { Recapitulatif } from "../../organisms"
import { Notations } from "./Notations"
import { createTime, deleteStat, recapList, statsList } from "../../../api/time/time"

export function Comptheures() {

    const { frenchDays, getMonth, setTheDay, getPrevMonth, getNextMonth, getMonthByIndex, setTimes, getDayByIndex, currentDay, setCurrentDay, refresh, getWeekNumber, currentCustomTimes, setCurrentCustomTimes } = useCalendarContext();
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

    // add a new empty custom time if previous are filled
    const addTime = () => {
        const newClock = [...currentCustomTimes]
        newClock.push({
            name: "Travail supplémentaire",
            order: currentCustomTimes?.length + 1,
            type: "WORK",
            start: "",
            end: "",
        })
        setCurrentCustomTimes(newClock)
    }


    // get recap for the current day/week/month
    const getRecapTimes = async () => {
        const date = {
            day: currentDay.getDate(),
            month: currentDay.getMonth(),
            year: currentDay.getFullYear(),
        }
        const response = await recapList(date)
        if (response.error === false) {
            setRecapData(response.data.recap)
        }
    }

    // validate time for the day
    const validateTimes = async (item, type) => {
        if (modalCheck) {
            localStorage.setItem("timeConfirmation", true)
        }
        if (edit) {
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
        // getRecapTimes()
        checkTimeToday()
    }, [currentDay])

    useEffect(() => {
        setContentLoading(true)
        getRecapTimes()
        setContentLoading(false)
    }, [getWeekNumber(currentDay)])

    // useEffect(() => {
    //     getRecapTimes()
    // }, [currentDay.getMonth()])

    useEffect(() => {
        setContentLoading(true)
        goodActualTimes(currentDay);
        getRecapTimes()
        checkTimeToday()
        currentDay ? getTimeOfTheDay(currentDay) :
        getTimeOfTheDay(new Date)
        setContentLoading(false)
    }, [myStats])

    useEffect(() => {
        setContentLoading(true)
        setSpecialDays(enterprise?.configEnterprise?.SpecialDays)
        setContentLoading(false)
    }, [enterprise])


    return (
        contentLoading ? <div className="flex items-center justify-center h-full"><div className="loader"></div></div> :
            <div>
                {modal &&
                    <ConfirmModal modal={modal} onClick={() => validateTimes(notationSelected, notationType)} type="time" user={user} crossClick={() => setModal(false)} checkbox={true} checkboxClick={() => setModalCheck(!modalCheck)} checkboxState={modalCheck} />
                }
                <SmallStraightLogo className={"md:hidden"} />
                <OrbitronTitle className="!text-center  md:mt-0 mt-5 md:mb-0 mb-5">{currentDay.getFullYear()}</OrbitronTitle>
                <div className="w-full h-10 flex items-center justify-between px-[5px] md:mt-5">
                    <Arrow onClick={() => {
                        changeMonth("previous")
                    }} className="rotate-180" />
                    <div className="flex items-center justify-center gap-6 w-full ">
                        <Paragraph onClick={() => {
                            changeMonth("previous")
                        }} className={"!text-gray cursor-pointer"}>{getPrevMonth()}</Paragraph>
                        <div className=" dark:bg-white bg-blue rounded">
                            <ReverseParagraph className={"px-4 z-10 py-2 font-bold"}>{getMonth()}</ReverseParagraph>
                        </div>
                        <Paragraph onClick={() => {
                            changeMonth("next")
                        }} className={"!text-gray cursor-pointer"}>{getNextMonth()}</Paragraph>
                    </div>
                    <Arrow onClick={() => {
                        changeMonth("next");
                    }} />
                </div>
                <Calendar times={myStats} frenchDays={frenchDays} setCurrentNumber={setCurrentNumber} day={currentDay} currentNumber={currentNumber} changeCurrentDay={changeCurrentDay} />
                <ComptheuresSwitch comptheuresSwitchState={comptheuresSwitchState} setComptheuresSwitchState={setComptheuresSwitchState} />
                {comptheuresSwitchState ?
                    <Recapitulatif recapData={recapData} myStats={myStats} />
                    :
                    customSelected ?
                        <>
                            <SubTitle className={`text-center font-orbitron underline capitalize  ${customSelected ? "mt-10 mb-5" : "my-10"}`}>{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
                            <div onClick={() => { setCustomSelected(false) }} className="flex items-center gap-1.5 mb-5 cursor-pointer">
                                <RealArrow className="min-w-[30px] rotate-180 min-h-[30px]" card={true} />
                                <Paragraph className="uppercase font-bold">Retour</Paragraph>
                            </div>
                            <div className="flex flex-col w-full items-center gap-10">
                                {currentCustomTimes?.sort((a, b) => a.order > b.order ? 1 : -1).map((time, index) => (
                                    ((!edit && time?.start?.length > 0) || edit) && <div key={index} className={`flex flex-col w-full items-center gap-[15px]`}>
                                        <div className="flex w-full items-center justify-center gap-2.5">
                                            {time.type === "WORK" ? <WorkIcon className={edit && "cursor-pointer"} onClick={() => edit && changeClockType(index, time.type)} /> : time.type === "BREAK" ? <CoffeeIcon className={edit && "cursor-pointer"} onClick={() => edit && changeClockType(index, time.type)} /> : <WorkIcon onClick={() => changeClockType(key, time.type)} />}
                                            {edit ? <input id="txt" type="text" defaultValue={time.name} className="bg-transparent font-bold outline-none text-center text-blue dark:text-white w-[55px]" onChange={(e) =>
                                                setCurrentCustomTimes(currentCustomTimes.map((time, i) =>
                                                    i === index ? { ...time, name: e.target.value } : time
                                                ))}
                                                style={{ width: ((time.name.length + 3) * 8) + 'px' }}
                                            /> : <Paragraph className={"font-bold"}>{time.name}</Paragraph>
                                            }
                                        </div>
                                        <Card edit={edit} className="">
                                            <TimeInput index={index} defaultValue={time.start} edit={edit}>{time.start}</TimeInput>
                                            <div className={`h-full flex-col py-[5px] flex ${edit ? "justify-between" : "justify-center"} items-center`}>
                                                {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                                                </span>}
                                                <RealArrow edit={edit} className="min-w-[22px] min-h-[22px]" card={true} />
                                                {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                                                </span>}
                                            </div>
                                            <TimeInput index={index} defaultValue={time.end} edit={edit} end={true}>{time.end}</TimeInput>
                                        </Card>
                                    </div>
                                ))}
                                {edit && displayAddOneTimeButton() && <div onClick={addTime} className="dark:bg-white bg-blue cursor-pointer rounded-full flex justify-center items-center w-10 h-10"><Plus /></div>}
                                <Button className="md:mb-0 mb-10" onClick={() => { validateTimes(currentCustomTimes, notationType) }}>{edit ? "Enregistrer" : "Modifier"}</Button>
                            </div>
                        </>
                        :
                        <>
                            <Notations pickedNotation={pickedNotation} modalCheck={modalCheck} notationSelected={notationSelected} validateTimes={validateTimes} notationType={notationType} initialNotation={initialNotation} setModal={setModal} specialDays={specialDays} />
                        </>
                }
                <div className="w-screen -ml-[5.5%] md:hidden gap-10 dark:border-y-white border-y-blue flex flex-col py-10 border-y md:mb-0 mb-[60px]">
                    <Paragraph className="text-center"><strong>Automatique : </strong>{user?.userEnterprise?.enterprise?.configEnterprise?.workHourADay}</Paragraph>
                    {todayStatus && <Paragraph className="text-center"><strong>Statut : </strong>{todayStatus}</Paragraph>}
                </div>
            </div>
    )
}