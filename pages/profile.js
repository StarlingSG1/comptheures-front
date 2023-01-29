import Head from "next/head";
import { useEffect, useState } from "react";
import { getProfileClock } from "../api/clock/clock";
import { NewTemplate, Profile, Redirect } from "../components/organisms";
import { useUserContext } from "../context";
import { useCalendarContext } from "../context/calendar";

export default function ProfilePage() {

    const { setCurrentDay, currentDay } = useCalendarContext();
    const { setBurgerOpen, theme, user } = useUserContext()


    const [clocks, setClocks] = useState([])
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
        <>
            <Head>
                <title>Profil - Comptheures</title>
                <meta
                    name="description"
                    content="Avoir un récapitulatif de ses heures de travail grâce à un calendrier comptheures en ligne."
                />
            </Head>
            <NewTemplate>
                {!user ? <Redirect/> : <Profile clocks={clocks} setClocks={setClocks} />}
            </NewTemplate>
        </>

    )
}
