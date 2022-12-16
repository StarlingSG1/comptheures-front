import { useEffect, useState } from "react";
import { Button, Input, Paragraph, ParagraphLink } from "../components/atoms";
import { BigLogo, StraightLogo } from "../components/molecules";
import { Comptheures, MobileTemplate, Template } from "../components/organisms";
import { useUserContext } from "../context";
import { useCalendarContext } from "../context/calendar";

export default function ComptheuresPage() {
    
    const { setCurrentDay } = useCalendarContext();
    const { setBurgerOpen, theme } = useUserContext()

    useEffect(() => { setBurgerOpen(false); setCurrentDay(new Date()) }, [])

    return (
        <>
            <MobileTemplate>
                < Comptheures />
            </MobileTemplate>
            <Template comptheures={true}>
                <Comptheures />
            </Template>
        </>
    )
}
