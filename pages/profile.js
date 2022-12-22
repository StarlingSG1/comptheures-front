import { useEffect, useState } from "react";
import { getProfileClock } from "../api/clock/clock";
import { NewTemplate, Profile } from "../components/organisms";
import { useUserContext } from "../context";
import { useCalendarContext } from "../context/calendar";

export default function ProfilePage() {

    const { setCurrentDay, currentDay } = useCalendarContext();
    const { setBurgerOpen, theme, user } = useUserContext()

    
    const [clocks, setClocks ] = useState([])
    const [actualMonth, setActualMonth] = useState(new Date().getMonth())

    useEffect(() => {
        setBurgerOpen(false);
        setCurrentDay(new Date())
        getClockForProfile(new Date())
    }, [])

    useEffect(() => {
        getClockForProfile(currentDay)
    }, [actualMonth])

    const getClockForProfile = async (date) => {
        const response = await getProfileClock({ year: date.getFullYear(), month: date.getMonth() })
        if (response.error === false) {
            setClocks(response.data)
        }
    }

    return (
            <NewTemplate>
                {!user ? "" : <Profile clocks={clocks} setClocks={setClocks} actualMonth={actualMonth} setActualMonth={setActualMonth} /> }
            </NewTemplate>
        
    )
}
