import { useEffect, useState } from "react"
import { useUserContext } from "../../../context"
import { Arrow, Button, Card, Paragraph, Plus, RealArrow, ReverseParagraph, SubTitle, Title } from "../../atoms"
import { SmallStraightLogo, StraightLogo, TimeBlock, TimeInput } from "../../molecules"
import { Calendar } from "../Calendar/Calendar"

export function Comptheures() {

    const [days, setDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    const [months, setMonths] = useState(['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'])

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

    const [today, setToday] = useState(months.indexOf(months[new Date().getMonth()]))

    const [edit, setEdit] = useState(true)

    const { setBurgerOpen } = useUserContext()

    useEffect(() => { setBurgerOpen(false) }, [])

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

    const [currentDay, setCurrentDay] = useState(new Date())
    const [currentNumber, setCurrentNumber] = useState("")

    const changeCurrentDay = (day) => {
        setCurrentDay(new Date(day.year, day.month, day.number));
        setEdit(true)
    }

    const getMonthByIndex = () => {
        return frenchMonths[currentDay.getMonth()].french
    }

    const getDayByIndex = () => {
        return frenchDays[currentDay.getDay()].french
    }


    return (
        <div>
            <SmallStraightLogo className={"md:hidden"} />
            <Title className="font-orbitron text-large font-bold text-center !font-base md:mt-0 mt-5 md:mb-0 mb-5">{currentDay.getFullYear()}</Title>
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
            <SubTitle className="text-center underline capitalize my-10">{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
            <div className="flex flex-col w-full items-center gap-10">
                <TimeBlock edit={edit} debut="10h00" fin="19h00">Journée de travail</TimeBlock>
                <TimeBlock edit={edit} debut="13h00" fin="14h00">Pause déjeuner</TimeBlock>
                {edit && <div className="dark:bg-white bg-blue cursor-pointer rounded-full flex justify-center items-center w-10 h-10"><Plus /></div>}
                <Button className="md:mb-0 mb-[60px]" onClick={() => { setEdit(!edit) }}>{edit ? "Enregistrer" : "Modifier"}</Button>
            </div>
        </div>
    )
}   