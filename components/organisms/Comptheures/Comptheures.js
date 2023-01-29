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

    const { frenchDays, getMonth, setTheDay, getPrevMonth, getNextMonth, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh, getWeekNumber, currentClocks, setCurrentClocks, clocks, setClocks, workTotal, breakTotal } = useCalendarContext();
    const { setBurgerOpen, user } = useUserContext()
    const [edit, setEdit] = useState(true)
    const [comptheuresSwitchState, setComptheuresSwitchState] = useState(false)
    const [modal, setModal] = useState(false)

    // selected item in blue
    const [notationSelected, setNotationSelected] = useState(null)
    const [notationType, setNotationType] = useState(null)
    const [customSelected, setCustomSelected] = useState(false)
    const [currentNumber, setCurrentNumber] = useState("")
    const [myStats, setMyStats] = useState([])

    const [specialDays, setSpecialDays] = useState([])
    const changeCurrentDay = (day) => {
        setCurrentDay(new Date(day.year, day.month, day.number));
        goodActualClock(new Date(day.year, day.month, day.number))
    }

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
                console.log(items)
                setNotationSelected(items)
                setNotationType("SPECIAL")
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setBurgerOpen(false); refresh(); getUserClocks();
        setSpecialDays(user?.userEnterprise?.enterprise?.configEnterprise.SpecialDays)
        getMyStats()
    }, [])

    useEffect(() => {
        goodActualClock(currentDay);
    }, [clocks])

    useEffect(() => {
        // goodActualClock(currentDay);
        getTimeOfTheDay(currentDay)
    }, [currentDay])

    useEffect(() => {
        getTimeOfTheDay(new Date)
    }, [myStats])

    const getTimeOfTheDay = async (day) => {
        setNotationSelected(null)
        setNotationType(null)
        const myStat = myStats.find(stat => stat.day === day.getDate() && stat.month === day.getMonth() && stat.year === day.getFullYear())
        console.log(myStat)
        if(myStat?.specialTime){
            // console.log(myStat?.specialTime?.specialDay)
            setNotationSelected(myStat?.specialTime?.specialDay)
            setNotationType("SPECIAL")
        }
        if(!myStat?.specialTime && myStat?.CustomTime?.length === 0){
            setNotationSelected("AUTO")
            setNotationType("AUTO")
        }
        if(!myStat?.specialTime && myStat?.CustomTime?.length > 0){
            setNotationSelected(myStat?.CustomTime)
            setCustomSelected(true)
            setNotationType("CUSTOM")
        }
    }

    useEffect(() => {
        console.log(notationSelected)
    }, [notationSelected])

    const getMyStats = async () => {
        const response = await statsList()
        if (response.error === false) {
            setMyStats(response.data)
        }
    }

    const getUserClocks = async () => {
        const response = await getClocks()
        if (response.error === false) {
            setClocks(response.data)
        }
    }

    const changeClockType = (index, type) => {
        const newClocks = [...currentClocks]
        if (type === "WORK") {
            newClocks[index].type = "BREAK"
            setCurrentClocks(newClocks)
        }
        if (type === "BREAK") {
            newClocks[index].type = "WORK"
            setCurrentClocks(newClocks)
        }
    }

    const goodActualClock = (date) => {
        const dayClocks = clocks.filter(clock => clock.year === date.getFullYear() && clock.month === date.getMonth() && clock.day === date.getDate())
        if (dayClocks.length === 1) {
            // replace first item of currentClocks with dayClocks[0]
            let newClocks = [...currentClocks]
            newClocks = []
            newClocks[0] = dayClocks[0]
            newClocks[1] = {
                name: "Pause déjeuner",
                year: currentDay?.getFullYear(),
                month: currentDay?.getMonth(),
                week: getWeekNumber(currentDay),
                day: currentDay?.getDate(),
                order: 2,
                type: "BREAK",
                start: "",
                end: "",
            }
            setCurrentClocks(newClocks)
        } else if (dayClocks.length > 1) {
            setCurrentClocks(dayClocks)
        } else {
            const newClocks = [{
                name: "Journée de travail",
                year: currentDay?.getFullYear(),
                month: currentDay?.getMonth(),
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
                order: 2,
                type: "BREAK",
                start: "",
                end: "",
            }
            ]
            setCurrentClocks(newClocks)
        }
        if (dayClocks.length > 0) {
            setEdit(false)
        } else {
            setEdit(true)
        }
    }

    const displayAddOneClockButton = () => {
        let canAdd = true
        currentClocks.forEach(clock => {
            if (clock.start === "" || clock.end === "") {
                canAdd = false
            }
        })
        return canAdd
    }

    const addClock = () => {
        const newClock = [...currentClocks]
        newClock.push({
            name: "Travail supplémentaire",
            year: currentDay?.getFullYear(),
            month: currentDay?.getMonth(),
            week: getWeekNumber(currentDay),
            day: currentDay?.getDate(),
            order: currentClocks?.length + 1,
            type: "WORK",
            start: "",
            end: "",
        })
        setCurrentClocks(newClock)
    }

    const validateClocks = async (item, type) => {
        if (edit) {
            const payload = 
                { type: type ,
                    data: {
                        ...item,
                        day: currentDay.getDate(),
                        month: currentDay.getMonth(),
                        year: currentDay.getFullYear(),
                        week: getWeekNumber(currentDay),
                    }
                }
            const response = await createTime(payload)
            if (response.error === false) {
                // getUserClocks()
                setEdit(false)
                setModal(false)
                toast.success(response.message)
            } else {
                setModal(false)
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
            <Calendar frenchDays={frenchDays} setCurrentNumber={setCurrentNumber} day={currentDay} currentNumber={currentNumber} changeCurrentDay={changeCurrentDay} />
            <ComptheuresSwitch comptheuresSwitchState={comptheuresSwitchState} setComptheuresSwitchState={setComptheuresSwitchState} />
            {comptheuresSwitchState ?
                <Recapitulatif />
                :
                customSelected ?
                    <>
                        <SubTitle className={`text-center font-orbitron underline capitalize  ${customSelected ? "mt-10 mb-5" : "my-10"}`}>{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
                        <div onClick={() => { setCustomSelected(false) }} className="flex items-center gap-1.5 mb-5 cursor-pointer">
                            <RealArrow className="min-w-[30px] rotate-180 min-h-[30px]" card={true} />
                            <Paragraph className="uppercase font-bold">Retour</Paragraph>
                        </div>
                        <div className="flex flex-col w-full items-center gap-10">
                            {notationSelected?.sort((a, b) => a.order > b.order ? 1 : -1).map((clock, index) => (
                                ((!edit && clock?.start.length > 0) || edit) && <div key={index} className={`flex flex-col w-full items-center gap-[15px]`}>
                                    <div className="flex w-full items-center justify-center gap-2.5">
                                        {clock.type === "WORK" ? <WorkIcon className={edit && "cursor-pointer"} onClick={() => edit && changeClockType(index, clock.type)} /> : clock.type === "BREAK" ? <CoffeeIcon className={edit && "cursor-pointer"} onClick={() => edit && changeClockType(index, clock.type)} /> : <WorkIcon onClick={() => changeClockType(key, clock.type)} />}
                                        {edit ? <input id="txt" type="text" defaultValue={clock.name} className="bg-transparent font-bold outline-none text-center text-blue dark:text-white w-[55px]" onChange={(e) =>
                                            setCurrentClocks(currentClocks.map((clock, i) =>
                                                i === index ? { ...clock, name: e.target.value } : clock
                                            ))}
                                            style={{ width: ((clock.name.length + 3) * 8) + 'px' }}
                                        /> : <Paragraph className={"font-bold"}>{clock.name}</Paragraph>
                                        }
                                    </div>
                                    <Card edit={edit} className="">
                                        <TimeInput index={index} defaultValue={clock.start} edit={edit}>{clock.start}</TimeInput>
                                        <div className={`h-full flex-col py-[5px] flex ${edit ? "justify-between" : "justify-center"} items-center`}>
                                            {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                                            </span>}
                                            <RealArrow edit={edit} className="min-w-[22px] min-h-[22px]" card={true} />
                                            {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                                            </span>}
                                        </div>
                                        <TimeInput index={index} defaultValue={clock.end} edit={edit} end={true}>{clock.end}</TimeInput>
                                    </Card>
                                </div>
                            ))}
                            {edit && displayAddOneClockButton() && <div onClick={addClock} className="dark:bg-white bg-blue cursor-pointer rounded-full flex justify-center items-center w-10 h-10"><Plus /></div>}
                            <Button className="md:mb-0 mb-10" onClick={() => { validateClocks() }}>{edit ? "Enregistrer" : "Modifier"}</Button>
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
                    <Notations pickedNotation={pickedNotation} notationSelected={notationSelected} setModal={setModal} specialDays={specialDays} />
            }
        </div>
    )
}