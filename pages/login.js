import { useEffect, useState } from "react";
import { Button, Input, Paragraph, ParagraphLink } from "../components/atoms";
import { BigLogo, StraightLogo } from "../components/molecules";
import { MobileTemplate, Template } from "../components/organisms";
import { useUserContext } from "../context";
export default function Login() {

    const { setBurgerOpen, theme } = useUserContext()

    useEffect(() => { setBurgerOpen(false) }, [])


    return (
        <>
            <MobileTemplate>
                <div className="w-full h-full mt-20">
                    <BigLogo theme={theme} />
                    <div className="flex flex-col gap-[15px] mt-60">
                        <Input type="email" placeholder={"Adresse email"} />
                        <Input type="password" placeholder={"Mot de passe"} />
                    </div>
                    <ParagraphLink className="text-right block mt-[15px]">mot de passe oublié</ParagraphLink>
                    <Button className="mt-60">Se connecter</Button>
                    <div className="flex items-center justify-center gap-1.5 mb-[100px] mt-[15px]">
                        <Paragraph>Pas de compte ?</Paragraph>
                        <ParagraphLink href="/register">S'inscrire</ParagraphLink>
                    </div>
                </div>
            </MobileTemplate>

            <Template>
                <StraightLogo className={"!mt-0 justify-center"} theme={theme} />
                <div className="flex flex-col gap-[15px] mt-10">
                    <Input type="email" placeholder={"Adresse email"} />
                    <Input type="password" placeholder={"Mot de passe"} />
                </div>
                <ParagraphLink className="text-right block mt-[15px]">mot de passe oublié</ParagraphLink>
                <Button className="mt-[30px]">Se connecter</Button>
                <div className="flex items-center justify-center gap-1.5 mt-[15px]">
                    <Paragraph>Pas de compte ?</Paragraph>
                    <ParagraphLink href="/register">S'inscrire</ParagraphLink>
                </div>

            </Template>
        </>
    )
}
