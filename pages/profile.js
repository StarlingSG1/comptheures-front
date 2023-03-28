import Head from "next/head";
import { useEffect, useState } from "react";
import { getProfileClock } from "../api/clock/clock";
import { NewTemplate, Profile, Redirect } from "../components/organisms";
import { useUserContext } from "../context";
import { useCalendarContext } from "../context/calendar";

export default function ProfilePage() {

    const { setBurgerOpen, theme, user, contentLoading, setContentLoading } = useUserContext()

    useEffect(() => {
        setBurgerOpen(false);
        setContentLoading(false);
    }, [])

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
            {contentLoading ? <div className="flex items-center justify-center h-full"><div className="loader"></div></div> : (user && !user) ? <Page404/>  :<Profile />}
            </NewTemplate>
        </>

    )
}
