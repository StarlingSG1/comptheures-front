import { useRouter } from "next/router"
import { use, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getProfileClock } from "../../../api/clock/clock"
import { updateUserProfile } from "../../../api/users/user"
import { useUserContext } from "../../../context"
import { useCalendarContext } from "../../../context/calendar"
import { Arrow, Button, Card, OpenInput, OpenInputPassword, OrbitronTitle, Paragraph, PencilIcon, Plus, ProfileIcon, RealArrow, ReverseParagraph, SubTitle, Title } from "../../atoms"
import { SmallStraightLogo, StraightLogo, TimeBlock, TimeInput } from "../../molecules"
import { Calendar } from "../Calendar/Calendar"



export function Profile({ clocks, actualMonth, setActualMonth }) {

    const { setBurgerOpen, user, setUser } = useUserContext()
    const { frenchDays, frenchMonths, getPrevMonth, getMonth, getNextMonth, setTheDay, getMonthByIndex, getDayByIndex, currentDay, setCurrentDay, refresh, getWeekNumber } = useCalendarContext();

    const [edit, setEdit] = useState(true)
    const [currentNumber, setCurrentNumber] = useState("")
    const [isProfile, setIsProfile] = useState(false)
    const [currentWeekNumber, setCurrentWeekNumber] = useState(null)
    const [monthHours, setMonthHours] = useState(0)
    const [weekHours, setWeekHours] = useState(0)
    const [weekClocks, setWeekClocks] = useState([])
    const [workHourToday, setWorkHourToday] = useState(0)
    const [currentUser, setCurrentUser] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        password: {
            old: "",
            new: "",
            confirm: ""
        }
    })

    const totalWeekHours = () => {
        let totalH = 0
        let totalM = 0
        let hours = []
        let minutes = []
        if (weekClocks?.length > 0) {
            for (let i = 0; i < weekClocks?.length; i++) {
                const [h, m] = weekClocks[i].stats[0].work.split('h')
                hours.push(h)
                minutes.push(m)
            }
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

    const validateUpdateUser = async (e) => {
        e.preventDefault()
        if (currentUser.firstName === "" || currentUser.lastName === "" || currentUser.email === "") {
            toast.error("Veuillez remplir tous les champs")
        }
        else if (currentUser.password.new !== currentUser.password.confirm) {
            toast.error("Les mots de passe ne correspondent pas")
        }
        else if(currentUser.password.old === currentUser.password.new && currentUser.password.new === currentUser.password.confirm && currentUser.password.old !== "") {
            toast.error("Le nouveau mot de passe doit être différent de l'ancien")
        }
        else {
            const response = await updateUserProfile(currentUser)
            if (response.error === false) {
                setUser(currentUser)
                toast.success(response.message)
                const newUser = currentUser
                setCurrentUser({
                    firstName: newUser?.firstName,
                    lastName: newUser?.lastName,
                    email: newUser?.email,
                    password: {
                        old: "",
                        new: "",
                        confirm: ""
                    }
                })
                setIsProfile(false)
            }
        }
        (clocks)
    }

        

    


    useEffect(() => {
        getWorkOfTheDay(currentDay)
    }, [currentDay])

    useEffect(() => {
        getClocksOfTheWeek()
    }, [currentWeekNumber])

    useEffect(() => {
        getClocksOfTheWeek(), totalMonthHours(), getWorkOfTheDay(new Date())
    }, [clocks])

    useEffect(() => {
        totalWeekHours()
    }, [weekClocks])

    useEffect(() => {
        setBurgerOpen(false);
    }, [user])

    return (
        //  <div>
        //     <SmallStraightLogo className={"md:hidden"} />
        //     <div className="flex items-center justify-center w-full mb-5 md:mt-0 mt-5">
        //         <div className="flex flex-col items-center relative">
        //             <Title className="!font-normal">{user?.firstName}</Title>
        //             <Paragraph className="dark:text-gray text-gray">{user?.email}</Paragraph>
        //             <PencilIcon onClick={() => setIsProfile(true)} className="absolute -right-1/2 top-1/2 -translate-y-1/2 " />
        //         </div>
        //     </div>
        //     <OrbitronTitle className="text-center !font-base md:mt-0 mt-5 md:mb-0 mb-5">{currentDay.getFullYear()}</OrbitronTitle>
        //     <div className="w-full h-10 flex items-center justify-between px-[5px] md:mt-5">
        //         <Arrow onClick={() => {
        //             setTheDay(false); setActualMonth(currentDay.getMonth() - 1); setCurrentDay(
        //                 new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, currentDay.getDate()))
        //         }} className="rotate-180" />
        //         <div className="flex items-center justify-center gap-6 w-full ">
        //             <Paragraph onClick={() => {
        //                 setTheDay(false); setActualMonth(currentDay.getMonth() - 1); setCurrentDay(
        //                     new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, currentDay.getDate()))
        //             }} className={"!text-gray cursor-pointer"}>{getPrevMonth()}</Paragraph>
        //             <div className=" dark:bg-white bg-blue rounded">
        //                 <ReverseParagraph className={"px-4 z-10 py-2 font-bold"}>{getMonth()}</ReverseParagraph>
        //             </div>
        //             <Paragraph onClick={() => {
        //                 setTheDay(true); setActualMonth(currentDay.getMonth() + 1); setCurrentDay(
        //                     new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, currentDay.getDate()))
        //             }} className={"!text-gray cursor-pointer"}>{getNextMonth()}</Paragraph>
        //         </div>
        //         <Arrow onClick={() => {
        //             setTheDay(true); setActualMonth(currentDay.getMonth() + 1); setCurrentDay(
        //                 new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, currentDay.getDate()));
        //         }} />
        //     </div>
        //     <Calendar frenchDays={frenchDays} setCurrentNumber={setCurrentNumber} day={currentDay} currentNumber={currentNumber} changeCurrentDay={changeCurrentDay} />
        //     <div className="flex flex-col w-full items-center mt-10 gap-10">
        //         <div className="flex flex-col w-full items-center gap-[15px]">
        //             <SubTitle>{getMonthByIndex()}</SubTitle>
        //             <Card edit={true}>
        //                 <ReverseParagraph><strong>{clocks?.length}</strong> {clocks?.length < 2 ? "jour" : "jours"} | <strong>{monthHours}</strong> travaillées</ReverseParagraph>
        //             </Card>
        //         </div>
        //         <div className="flex flex-col w-full items-center gap-[15px]">
        //             <SubTitle>{"Semaine " + getWeekNumber(currentDay)}</SubTitle>
        //             <Card edit={true}>
        //                 <ReverseParagraph><strong>{weekClocks.length}</strong> {weekClocks.length < 2 ? "jour" : "jours"} | <strong>{weekClocks.length === 0 ? 0 : weekHours}</strong> {weekClocks.length === 0 && "heure"} travaillées</ReverseParagraph>
        //             </Card>
        //         </div>
        //         <div className="flex flex-col w-full items-center gap-[15px] md:mb-0 mb-60 ">
        //             <SubTitle>{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
        //             <Card edit={true}>
        //                 <ReverseParagraph><strong>{workHourToday}</strong> {workHourToday === 0 && "heure"} travaillées</ReverseParagraph>
        //             </Card>
        //         </div>
        //     </div>
        // </div> 
            <form onSubmit={validateUpdateUser} className="">
                <OrbitronTitle className="text-center !font-normal">Compte</OrbitronTitle>
                    <div className="flex flex-col mt-10 gap-[30px] wp-full">
                        <OpenInput onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })} defaultValue={user?.firstName} placeholder="Prénom" />
                        <OpenInput onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })} defaultValue={user?.lastName} placeholder="Nom" />
                        <OpenInput onChange={(e) => {}} defaultValue={"Maison de la Barbe à Papa"} placeholder="Entreprise" />
                        <OpenInput onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} defaultValue={user?.email} placeholder="Adresse email" />
                        <OpenInputPassword currentUser={currentUser} setCurrentUser={setCurrentUser} />
                    </div>
                <Button type="submit" className="mt-60 md:mb-0 mb-60">Enregistrer</Button>
            </form>
    )
}   