import { useEffect, useState } from "react"
import { useUserContext } from "../../../context"
import { useCalendarContext } from "../../../context/calendar"
import { Arrow, Button, Card, OpenInput, OpenInputPassword, OrbitronTitle, Paragraph, PencilIcon, Plus, ProfileIcon, RealArrow, ReverseParagraph, SubTitle, Title } from "../../atoms"
import { SmallStraightLogo, StraightLogo, TimeBlock, TimeInput } from "../../molecules"
import { Calendar } from "../Calendar/Calendar"

export function Profile() {

    const { frenchDays, getPrevMonth, getMonth, getNextMonth, setTheDay, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh } = useCalendarContext();
    const { setBurgerOpen } = useUserContext()

    const [edit, setEdit] = useState(true)

    useEffect(() => { setBurgerOpen(false); refresh() }, [])

    const [currentNumber, setCurrentNumber] = useState("")
    const [isProfile, setIsProfile] = useState(false)

    const changeCurrentDay = (day) => {
        setCurrentDay(new Date(day.year, day.month, day.number));
        setEdit(true)
    }

    const getWeekNumber = (currentDay) => {
        let startDate = new Date(currentDay.getFullYear(), 0, 1);
        var days = Math.floor((currentDay - startDate) /
            (24 * 60 * 60 * 1000));

        var weekNumber = Math.ceil(days / 7);

        // Display the calculated result       
        return weekNumber;
    }

    useEffect(() => {
        setCurrentDay(new Date())
    }, [])

    return (
        !isProfile ? <div>
            <SmallStraightLogo className={"md:hidden"} />
            <div className="flex items-center justify-center w-full mb-5">
                <div className="flex flex-col items-center relative">
                    <Title className="!font-normal">John</Title>
                    <Paragraph className="dark:text-gray text-gray">email@email.fr</Paragraph>
                    <PencilIcon onClick={() => setIsProfile(true)} className="absolute -right-1/2 top-1/2 -translate-y-1/2 " />
                </div>
            </div>
            <OrbitronTitle className="text-center !font-base md:mt-0 mt-5 md:mb-0 mb-5">{currentDay.getFullYear()}</OrbitronTitle>
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
            <div className="flex flex-col w-full items-center mt-10 gap-10">
                <div className="flex flex-col w-full items-center gap-[15px]">
                    <SubTitle>{getMonthByIndex()}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>23</strong> jours | <strong>170</strong> heures</ReverseParagraph>
                    </Card>
                </div>
                <div className="flex flex-col w-full items-center gap-[15px]">
                    <SubTitle>{"Semaine " + getWeekNumber(currentDay)}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>5</strong> jours | <strong>35</strong> heures</ReverseParagraph>
                    </Card>
                </div>
                <div className="flex flex-col w-full items-center gap-[15px] md:mb-0 mb-60 ">
                    <SubTitle>{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
                    <Card edit={true}>
                        <ReverseParagraph><strong>8</strong> heures travaillés</ReverseParagraph>
                    </Card>
                </div>
            </div>
        </div> : <div className="">
            <OrbitronTitle className="text-center !font-normal">Informations personnelles</OrbitronTitle>
            <div className=" flex mt-10 flex-col">
                <RealArrow onClick={() => setIsProfile(false)} width={40} height={40} className="cursor-pointer rotate-180" />
                <div className="flex flex-col mt-10 gap-[30px] wp-full">
                    <OpenInput placeholder="Prénom" />
                    <OpenInput placeholder="Nom" />
                    <OpenInput placeholder="Adresse email" />
                    <OpenInputPassword />
                </div>
            </div>
            <Button className="mt-60 md:mb-0 mb-60">Enregistrer</Button>
        </div>
    )
}   