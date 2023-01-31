import { use, useEffect, useState } from "react"
import { useUserContext } from "../../../context"
import { Arrow, BorderedButton, Button, Card, CoffeeIcon, ComptheuresSwitch, OrbitronTitle, Paragraph, Plus, RealArrow, ReverseParagraph, SpecialDayButton, SubTitle, Title, WorkIcon } from "../../atoms"
import { SmallStraightLogo, TimeInput } from "../../molecules"
import { Calendar } from "../Calendar/Calendar"
import { TimeBlock } from "../../organisms";
import { useCalendarContext } from "../../../context/calendar"
import { addClocks, getClocks } from "../../../api/clock/clock";
import { toast } from "react-toastify"
import { Recapitulatif } from "../../organisms"
import { Notations } from "./Notations"
import { createTime, statsList } from "../../../api/time/time"

export function Comptheures() {

    const { frenchDays, getMonth, setTheDay, getPrevMonth, getNextMonth, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh, getWeekNumber, currentCustomTimes, setCurrentCustomTimes, clocks, setClocks, workTotal, breakTotal } = useCalendarContext();
    const { setBurgerOpen, user, setUser } = useUserContext()
    const [edit, setEdit] = useState(true)
    const [comptheuresSwitchState, setComptheuresSwitchState] = useState(false)
    const [modal, setModal] = useState(false)

    // selected item in blue
    const [notationSelected, setNotationSelected] = useState(null)
    const [initialNotation, setInitialNotation] = useState(null)
    const [notationType, setNotationType] = useState(null)
    const [customSelected, setCustomSelected] = useState(false)
    const [currentNumber, setCurrentNumber] = useState("")
    const [myStats, setMyStats] = useState([])

    const [specialDays, setSpecialDays] = useState([])

    // when clicking on a day, change the current day
    const changeCurrentDay = (day) => {
        setCurrentDay(new Date(day.year, day.month, day.number));
        goodActualTimes(new Date(day.year, day.month, day.number))
    }

    // when clicking on a day, know which type of notation is selected
    const pickedNotation = (notation, items) => {

        

        switch (notation) {
            case "AUTO":
                setNotationSelected("AUTO")
                setNotationType("AUTO")
                break;
            case "CUSTOM":
                setNotationSelected(items)
                setNotationType("CUSTOM")
                setCustomSelected(true)
                break;
            case "SPECIAL":
                setNotationSelected(items)
                setNotationType("SPECIAL")
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setBurgerOpen(false); refresh();
        setSpecialDays(user?.userEnterprise?.enterprise?.configEnterprise.SpecialDays)
        getMyStats()
    }, [])


    useEffect(() => {
    }, [myStats])

    useEffect(() => {
        getTimeOfTheDay(currentDay)
    }, [currentDay])

    useEffect(() => {
        goodActualTimes(currentDay);
        currentDay ? getTimeOfTheDay(currentDay) :
            getTimeOfTheDay(new Date)
    }, [myStats])

    // get if there is a stat for the current day and if there is, give what type of notation is selected
    const getTimeOfTheDay = async (day) => {
        setNotationSelected(null)
        setNotationType(null)
        setCustomSelected(false)
        const myStat = myStats.find(stat => stat.day === day.getDate() && stat.month === day.getMonth() && stat.year === day.getFullYear())
        if (myStat?.specialTime) {
            // console.pecialDay)
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

    // pas utiliser actuellement
    const getMyStats = async () => {
        const response = await statsList()
        if (response.error === false) {
            setMyStats(response.data)
        }
    }

    // cliquer sur le picot d'une heure custom pour changer le type
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
        const dayClocks = myStats.filter(stat => stat.year === date.getFullYear() && stat.month === date.getMonth() && stat.day === date.getDate())
        if (dayClocks[0]?.CustomTime?.length === 0 || dayClocks?.length === 0) {
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
        if (dayClocks[0]?.CustomTime.length > 0) {
            setCurrentCustomTimes(dayClocks[0]?.CustomTime)
            setEdit(false)
        } else {
            setEdit(true)
        }

    }

    // afficher le bouton ajouter une heure custom si les précédentes sont remplies
    const displayAddOneTimeButton = () => {
        let canAdd = true
        currentCustomTimes.forEach(time => {
            if (time.start === "" || time.end === "") {
                canAdd = false
            }
        })
        return canAdd
    }

    // ajouter une heure custom si les précédentes sont remplies
    const addClock = () => {
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


    // when clicking on enregistrer ou modifier pour save la value
    const validateClocks = async (item, type) => {
        if (edit) {
            let payload = {}
            if (type === "CUSTOM") {
                payload =
                {
                    type: type,
                    data: {
                        times: item,
                        day: currentDay.getDate(),
                        month: currentDay.getMonth(),
                        year: currentDay.getFullYear(),
                        week: getWeekNumber(currentDay),
                    }
                }
            } 
            if(type === "SPECIAL"){
                payload =
                {
                    type: type,
                    data: {
                        ...item,
                        day: currentDay.getDate(),
                        month: currentDay.getMonth(),
                        year: currentDay.getFullYear(),
                        week: getWeekNumber(currentDay),
                    }
                }
            } 
            if(type === "AUTO") {
                payload =
                {
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
                setUser({ ...user, userEnterprise: { ...user.userEnterprise, Stats: response.data } })
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        } else {
            setEdit(true)
        }
    }

    return (
        <div>
            {modal &&
                <div className="absolute w-full h-full top-0 left-0 bottom-O right-0 bg-black/[0.3] flex justify-center items-end rounded-2xl z-20">
                    <div className="h-[240px] w-[70%] bg-white dark:bg-blue mb-80 rounded-xl flex flex-col justify-between p-5">
                        <Paragraph onClick={() => setModal(false)}>X</Paragraph>
                        <Paragraph className="text-center">Vos horaires pour ce jour seront envoyés à un administrateur de l’entreprise pour validation.</Paragraph>
                        <div className="flex flex-col gap-2.5">
                            <div className="flex gap-2.5">
                                <input type="checkbox" />
                                <Paragraph>Ne plus me demander</Paragraph>
                            </div>
                            <Button onClick={() => validateClocks(notationSelected, notationType)}>Oui, enregistrer</Button>
                        </div>
                    </div>
                </div>
            }
            <SmallStraightLogo className={"md:hidden"} />
            <OrbitronTitle className="!text-center  md:mt-0 mt-5 md:mb-0 mb-5">{currentDay.getFullYear()}</OrbitronTitle>
            <div className="w-full h-10 flex items-center justify-between px-[5px] md:mt-5">
                <Arrow onClick={() => {
                    setTheDay(false); setCurrentDay(
                        new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, currentDay.getDate()))
                }} className="rotate-180" />
                <div className="flex items-center justify-center gap-6 w-full ">
                    <Paragraph onClick={() => {
                        setTheDay(false); setCurrentDay(
                            new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, currentDay.getDate()))
                    }} className={"!text-gray cursor-pointer"}>{getPrevMonth()}</Paragraph>
                    <div className=" dark:bg-white bg-blue rounded">
                        <ReverseParagraph className={"px-4 z-10 py-2 font-bold"}>{getMonth()}</ReverseParagraph>
                    </div>
                    <Paragraph onClick={() => {
                        setTheDay(true); setCurrentDay(
                            new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, currentDay.getDate()))
                    }} className={"!text-gray cursor-pointer"}>{getNextMonth()}</Paragraph>
                </div>
                <Arrow onClick={() => {
                    setTheDay(true); setCurrentDay(
                        new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, currentDay.getDate()));
                }} />
            </div>
            <Calendar times={myStats} frenchDays={frenchDays} setCurrentNumber={setCurrentNumber} day={currentDay} currentNumber={currentNumber} changeCurrentDay={changeCurrentDay} />
            <ComptheuresSwitch comptheuresSwitchState={comptheuresSwitchState} setComptheuresSwitchState={setComptheuresSwitchState} />
            {comptheuresSwitchState ?
                <Recapitulatif myStats={myStats} />
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
                            {edit && displayAddOneTimeButton() && <div onClick={addClock} className="dark:bg-white bg-blue cursor-pointer rounded-full flex justify-center items-center w-10 h-10"><Plus /></div>}
                            <Button className="md:mb-0 mb-10" onClick={() => { validateClocks(currentCustomTimes, notationType) }}>{edit ? "Enregistrer" : "Modifier"}</Button>
                        </div>
                        {(workTotal || breakTotal) && <div className="w-screen -ml-[5.5%] md:hidden gap-10 border-y-blue flex flex-col py-10 border-y md:mb-0 mb-[60px]">
                            {workTotal && workTotal !== "0h00" && <div className="flex flex-col items-center">
                                <Title>{workTotal}</Title>
                                <Paragraph>de travail</Paragraph>
                            </div>}
                            {breakTotal && breakTotal !== "0h00" && <div className="flex flex-col items-center">
                                <Title>{breakTotal}</Title>
                                <Paragraph>de pause</Paragraph>
                            </div>}
                        </div>}
                    </>
                    :
                    <Notations pickedNotation={pickedNotation} notationSelected={notationSelected} initialNotation={initialNotation} setModal={setModal} specialDays={specialDays} />
            }
        </div>
    )
}