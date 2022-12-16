import { useEffect, useState } from "react"
import { useUserContext } from "../../../context"
import { Arrow, Button, OrbitronTitle, Paragraph, Plus, ReverseParagraph, SubTitle, Title } from "../../atoms"
import { SmallStraightLogo } from "../../molecules"
import { Calendar } from "../Calendar/Calendar"
import { TimeBlock } from "../../organisms";
import { useCalendarContext } from "../../../context/calendar"

export function Comptheures() {

    const { frenchDays, getPrevMonth, getMonth, getNextMonth, setTheDay, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh } = useCalendarContext();
    const { setBurgerOpen } = useUserContext()
    
    const [edit, setEdit] = useState(true)

    useEffect(() => { setBurgerOpen(false); refresh() }, [])

    const [currentNumber, setCurrentNumber] = useState("")

    const changeCurrentDay = (day) => {
        setCurrentDay(new Date(day.year, day.month, day.number));
        setEdit(true)
    }

    

    return (
        <div>
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