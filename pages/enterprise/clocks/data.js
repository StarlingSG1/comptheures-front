import Head from "next/head";
import { useEffect, useState } from "react";
import { OrbitronTitle } from "../../../components/atoms";
import { BackTitle } from "../../../components/molecules";
import { Infos, NewTemplate, Redirect } from "../../../components/organisms";
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
                <div>
                <OrbitronTitle className="text-center !font-normal">{"Maison de la Barbe à Papa"}</OrbitronTitle>
                <BackTitle>Récapulatif / Données</BackTitle>
                <table className="w-full border border-blue border-2">
                    <thead className="w-full text-left bg-blue dark:bg-blue-dark text-white">
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Rôle</th>
                            <th>Nb de jours à valider</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user, index) => (
                            <tr className="even:bg-blue odd:bg-transparent dark:even-blue-dark  even:text-white">
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                <td>{user.nbToValidate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                }
            </NewTemplate>
        </>

    )
}
