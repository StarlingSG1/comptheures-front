import { useEffect, useState } from "react";
import { Button, Input, Paragraph, ParagraphLink } from "../components/atoms";
import { BigLogo, StraightLogo } from "../components/molecules";
import { Comptheures, MobileTemplate, Profile, Template } from "../components/organisms";
import { useUserContext } from "../context";

export default function ComptheuresPage() {

    const { setBurgerOpen, theme } = useUserContext()

    useEffect(() => { setBurgerOpen(false) }, [])

    return (
        <>
            <MobileTemplate>
                <Profile/>
            </MobileTemplate>
            <Template>
                <Profile/>
            </Template>
        </>
    )
}
