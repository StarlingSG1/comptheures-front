import { useEffect, useState } from "react";
import { Button, Input, Paragraph, ParagraphLink } from "../components/atoms";
import { BigLogo, StraightLogo } from "../components/molecules";
import { MobileTemplate, Template } from "../components/organisms";
import { useUserContext } from "../context";

export default function Register() {

    const { setBurgerOpen, theme } = useUserContext()

    useEffect(() => { setBurgerOpen(false) }, [])

    return (
        <>
            <MobileTemplate>
                <div className="w-full h-full mt-20">
                    <BigLogo theme={theme} />
                    <div className="flex flex-col gap-[15px] mt-60">
                        <Input placeholder={"Prénom"} />
                        <Input placeholder={"Nom"} />
                        <Input type="email" placeholder={"Adresse email"} />
                        <Input type="password" placeholder={"Mot de passe"} />
                        <Input type="password" placeholder={"Confirmer mot de passe"} />
                    </div>
                    <Paragraph className="mt-[15px] mb-[60px]">En m’inscrivant, je consens à la <ParagraphLink>politique de confidentialité</ParagraphLink>. Vos informations ne seront pas partagés à un tiers.</Paragraph>
                    <Button>S'inscrire</Button>
                    <div className="flex items-center justify-center gap-1.5 mb-[100px] mt-[15px]">
                        <Paragraph>Déjà un compte ?</Paragraph>
                        <ParagraphLink href="/login">Se connecter</ParagraphLink>
                    </div>
                </div>
            </MobileTemplate>
            <Template>
                <StraightLogo className={"!mt-0 justify-center"} theme={theme} />
                <div className="flex flex-col gap-[15px] mt-10">
                    <Input placeholder={"Prénom"} />
                    <Input placeholder={"Nom"} />
                    <Input type="email" placeholder={"Adresse email"} />
                    <Input type="password" placeholder={"Mot de passe"} />
                    <Input type="password" placeholder={"Confirmer mot de passe"} />
                </div>
                <Paragraph className="mt-[15px] mb-10">En m’inscrivant, je consens à la <ParagraphLink>politique de confidentialité</ParagraphLink>. Vos informations ne seront pas partagés à un tiers.</Paragraph>
                <Button>S'inscrire</Button>
                <div className="flex items-center justify-center gap-1.5 mt-[15px]">
                    <Paragraph>Déjà un compte ?</Paragraph>
                    <ParagraphLink href="/login">Se connecter</ParagraphLink>
                </div>
            </Template>
        </>
    )
}
