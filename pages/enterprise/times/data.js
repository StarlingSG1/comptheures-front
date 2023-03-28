import Head from "next/head";
import { useEffect, useState } from "react";
import { OrbitronTitle } from "../../../components/atoms";
import { BackTitle } from "../../../components/molecules";
import { AdminRedirect, Infos, NewTemplate, Redirect } from "../../../components/organisms";
import { useUserContext } from "../../../context";

export default function EnterpriseData() {

    const { setBurgerOpen, theme, user } = useUserContext()


    useEffect(() => {
        setBurgerOpen(false);
    }, [])

    const [usersData, setUsersData] = useState([
        {
            firstName: "John",
            lastName: "Doe",
            role: "Alternant",
            nbToValidate: "5"
        },
        {
            firstName: "John",
            lastName: "Doe",
            role: "Administrateur",
            nbToValidate: "5"
        },
        {
            firstName: "John",
            lastName: "Doe",
            role: "Employé",
            nbToValidate: "5"
        },
    ])



  

    return (
        <>
            <Head>
                <title>Données - Comptheures</title>
                <meta
                    name="description"
                    content="Avoir un récapitulatif de ses heures de travail grâce à un calendrier comptheures en ligne."
                />
            </Head>
            <NewTemplate>
            {!user ? <Redirect/> : 
            user?.userEnterprise?.role?.isAdmin > 0 ?
                <div>
                <OrbitronTitle className="text-center !font-normal">Ça arrive bientot...</OrbitronTitle>
                
            </div>
            : <AdminRedirect/>
                }
            </NewTemplate>
        </>

    )
}
