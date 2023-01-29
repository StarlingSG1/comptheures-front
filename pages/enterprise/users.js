import Head from "next/head";
import { useEffect, useState } from "react";
import { OrbitronTitle } from "../../components/atoms";
import { BackTitle } from "../../components/molecules";
import { Infos, NewTemplate, Profile, Redirect } from "../../components/organisms";
import { useUserContext } from "../../context";
import { usersList } from "../../api/enterprise/users";
import { toast } from "react-toastify";

export default function EnterpriseUsers() {

    const { setBurgerOpen, theme, user } = useUserContext()

    const users = async () => {
        const response = await usersList("09a7b31f-2445-47b1-bda3-54674772b3ec")
        if(response.error === false){
            console.log(response.data)
            setUsersData(response.data)
        }else{
            toast.error(response.message)
        }
    }

    useEffect(() => {
        setBurgerOpen(false);
        users()
    }, [])



    const [usersData, setUsersData] = useState([])

    return (
        <>
            <Head>
                <title>Liste des utilisateurs - Comptheures</title>
                <meta
                    name="description"
                    content="Avoir un récapitulatif de ses heures de travail grâce à un calendrier comptheures en ligne."
                />
            </Head>
            <NewTemplate>
                {!user ? <Redirect /> :
                    <div>
                        <OrbitronTitle className="text-center !font-normal">{"Maison de la Barbe à Papa"}</OrbitronTitle>
                        <BackTitle>Liste des utilisateurs</BackTitle>
                        <table className="w-full border border-blue dark:border-white border-2">
                            <thead className="w-full text-left bg-blue dark:bg-blue-dark text-white">
                                <tr className="h-10">
                                    <th className="pl-2.5">Nom</th>
                                    <th className="pl-2.5">Prénom</th>
                                    <th className="pl-2.5">Email</th>
                                    <th className="pl-2.5">Rôle</th>
                                    <th className="pl-2.5">Date d'arrivée</th>
                                    {/* <th>Comptheures</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {usersData.map((item, index) => (
                                    <tr className="dark:even:bg-blue-dark even:bg-blue odd:bg-transparent even:text-white dark:odd:text-white h-10 ">
                                         <td className="pl-2.5">{item?.user?.lastName}</td>
                                        <td className="pl-2.5">{item?.user?.firstName}</td>
                                        <td className="pl-2.5">{item?.user?.email}</td>
                                        <td className="pl-2.5">{item?.role?.label}</td>
                                        <td className="pl-2.5">{item?.createdAt.split("T")[0].split("-").reverse().join("/")}</td>
                                        {/* <td>{user.comptheuresLink}</td> */}
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
