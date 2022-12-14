import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getClocks } from "../api/clock/clock";
import { Button, Input, Paragraph, ParagraphLink } from "../components/atoms";
import { BigLogo, StraightLogo } from "../components/molecules";
import { Comptheures, MobileTemplate, NewTemplate, Template } from "../components/organisms";
import { useUserContext } from "../context";
import { useCalendarContext } from "../context/calendar";

export default function ComptheuresPage() {

    const { setCurrentDay } = useCalendarContext();
    const { setBurgerOpen, user } = useUserContext()

    useEffect(() => {
        setBurgerOpen(false);
        setCurrentDay(new Date());

    }, [])

    return (
        <>
            <Head>
                <title>Mon comptheures - Comptheures</title>
                <meta
                    name="description"
                    content="Compter ses heures de travail dans un calendrier comptheures en ligne."
                />
            </Head>
            <NewTemplate comptheures={true}>
                {!user ? "" : <Comptheures />}
            </NewTemplate>
        </>
    )
}