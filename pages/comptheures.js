import axios from "axios";
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

    useEffect(() => { setBurgerOpen(false);
         setCurrentDay(new Date()); 
        
        }, [])

    return (
        <>
            <NewTemplate comptheures={true}>
                {!user ? "" : <Comptheures />}
            </NewTemplate>
        </>
    )
}