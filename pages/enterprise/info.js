import Head from "next/head";
import { useEffect, useState } from "react";
import { Infos, NewTemplate, Profile, Redirect } from "../../components/organisms";
import { useUserContext } from "../../context";

export default function EnterpriseInfo() {

    const { setBurgerOpen, theme, user } = useUserContext()


    useEffect(() => {
        setBurgerOpen(false);
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
                {!user ? <Redirect/> : <Infos  />}
            </NewTemplate>
        </>

    )
}
