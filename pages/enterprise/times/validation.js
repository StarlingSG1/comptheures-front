import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usersList } from "../../../api/enterprise/users";
import { validateStatStatus } from "../../../api/time/time";
import { OrbitronTitle, Paragraph, RealArrow, SubTitle } from "../../../components/atoms";
import { BackTitle } from "../../../components/molecules";
import { Infos, NewTemplate, Redirect } from "../../../components/organisms";
import { useUserContext } from "../../../context";

export default function enterpriseValidation() {

    const { setBurgerOpen, theme, user } = useUserContext()
    const [enterpriseId, setEnterpriseId] = useState(null)
    const [usersData, setUsersData] = useState([])
    const [details, setDetails] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [allChecked, setAllChecked] = useState(false)
    const [userTimes, setUserTimes] = useState([])

    const users = async () => {
        const response = await usersList(enterpriseId)
        if (response.error === false) {
            const list = response.data
            list.forEach((item, index) => {
                let total = 0
                item.Stats.forEach((item, index) => {
                    if (item.realisationStatus === "IN_VALIDATION") {
                        total += 1
                    }
                })
                item.total = total
            })
            setUsersData(list)
        } else {
            toast.error(response.message)
        }
    }

    // get in_validation times for the selected user
    const getTimes = () => {
        const timesOfTheUser = selectedUser?.Stats
        const list = []
        timesOfTheUser?.forEach((item, index) => {
            if (item.realisationStatus === "IN_VALIDATION") {
                item.checked = false
                list.push(item)
            }
        })
        setUserTimes(list)
    }

    const checkAllTimes = () => {
        let list = userTimes
        const isChecked = allChecked
        if (isChecked === false) {
            list.forEach((item, index) => {
                item.checked = true
            })
            setUserTimes(list)
            setAllChecked(true)
        } else {
            list?.forEach((item, index) => {
                item.checked = false
            })
            setUserTimes(list)
            setAllChecked(false)
        }
    }

    const checkOneTime = (item, index) => {
        const items = { ...userTimes, [index]: { ...userTimes[index], checked: !item.checked } }
        let array = []
        Object.keys(items).forEach((key) => {
            array.push(items[key])
        })
        setUserTimes(array)
    }

    const verifyAllIsChecked = () => {
        // if all items in userTimes are checked, set allChecked to true, but if only one is not checked, set allChecked to false
        let total = 0
        userTimes?.forEach((item, index) => {
            if (item.checked === true) {
                total += 1
            }
        }
        )
        if (total === userTimes?.length) {
            setAllChecked(true)
        }
        if (total !== userTimes?.length) {
            setAllChecked(false)
        }
    }

    const handleSelection = async (option) => {
        let checkedItems = []

        userTimes.forEach((item, index) => {
            if (item.checked === true) {
                checkedItems.push(item)
            }
        })
        if (checkedItems.length === 0) {
            toast.error("Vous devez sélectionner au moins un horaire")
            return
        }

        const response = await validateStatStatus({ data: checkedItems, option: option })
        if (response.error === false) {
            await users()
            if (response.data.filter((item) => item.userEnterpriseId === selectedUser.id).length === 0) {
                setDetails(false)
                setSelectedUser({})
            }else{
                setUserTimes(response.data)
            }
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
    }

    const checkUsersData = () => {
        // check if an item in usersData as total > 0  
        let total = 0
        usersData.forEach((item, index) => {
            if (item.total > 0) {
                total += 1
            }
        })
        if (total > 0) {
            return true
        } else {
            return false
        }
    }

    const onHoverTimeCustom = (index) => {
        const modal = document.querySelector(`#time-modal-${index}`)
        if(modal){
            modal.classList.add("!block")
        }
        // return list
    }

    const onLeaveTimeCustom = (index) => {
        const modal = document.querySelector(`#time-modal-${index}`)
        if(modal){
            modal.classList.remove("!block")
        }
    }



    useEffect(() => {
        setBurgerOpen(false);
    }, [])

    useEffect(() => {
        setEnterpriseId(user?.userEnterprise?.enterprise?.id)
    }, [user])

    useEffect(() => {
        users()
    }, [enterpriseId])

    useEffect(() => {
        getTimes()
        checkUsersData()
    }, [selectedUser])

    useEffect(() => {
        verifyAllIsChecked()
    }, [checkOneTime])

    const handleDetails = (item) => {
        setDetails(true)
        setSelectedUser(item)
    }

    return (
        <>
            <Head>
                <title>Horaires à valider - Comptheures</title>
                <meta
                    name="description"
                    content="Avoir un récapitulatif de ses heures de travail grâce à un calendrier comptheures en ligne."
                />
            </Head>
            <NewTemplate>
                {!user ? <Redirect /> :
                    !details ?
                        <div>
                            <OrbitronTitle className="text-center !font-normal">{user?.userEnterprise?.enterprise?.name}</OrbitronTitle>
                            <BackTitle>Horaires à valider</BackTitle>
                            {checkUsersData() ? <table className="w-full border border-blue dark:border-white border-2">
                                <thead className="w-full text-left bg-blue dark:bg-blue-dark text-white">
                                    <tr className="h-10">
                                        <th className="pl-2.5 text-sm sm:text-base">Nom</th>
                                        <th className="pl-2.5 text-sm sm:text-base">Prénom</th>
                                        <th className="pl-2.5 text-sm sm:text-base">Rôle</th>
                                        <th className="pl-2.5 text-sm sm:text-base">Horaires à valider</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData?.map((item, index) => (
                                        item.total > 0 &&
                                        <tr key={index} onClick={() => handleDetails(item)} className="cursor-pointer dark:hover:bg-blue-selected hover:bg-blue-selected hover:text-white dark:hover:text-white dark:even:bg-blue-dark even:bg-blue odd:bg-transparent even:text-white dark:odd:text-white h-10 ">
                                            <td className="pl-2.5 text-sm sm:text-base">{item.user.lastName}</td>
                                            <td className="pl-2.5 text-sm sm:text-base">{item.user.firstName}</td>
                                            <td className="pl-2.5 text-sm sm:text-base">{item.role.label}</td>
                                            <td className="pl-2.5 text-sm sm:text-base">{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> : <Paragraph className="text-center">Aucun horaire à valider !</Paragraph>}
                        </div>
                        :
                        <div>
                            <OrbitronTitle className="text-center !font-normal">{user?.userEnterprise?.enterprise?.name}</OrbitronTitle>
                            <div className="flex items-center justify-between mt-[25px] mb-10">
                                <RealArrow onClick={() => setDetails(false)} width={40} height={40} className="cursor-pointer rotate-180" />
                                <SubTitle className="text-center ">{selectedUser?.user?.firstName}{" "}{selectedUser?.user?.lastName}</SubTitle>
                                <RealArrow width={40} height={40} className="invisible" />
                            </div>
                            <div className="flex items-center gap-5 mb-5 flex-wrap">
                                <Paragraph>Actions sur les éléments sélectionnés :</Paragraph>
                                <div className="flex items-center gap-5 ">
                                    <button className="py-1 dark:bg-white rounded-full dark:text-blue font-noto capitalize font-bold bg-blue px-4 text-white" onClick={() => handleSelection("VALIDATED")}>Valider</button>
                                    <button className="py-1 rounded-full dark:text-white font-noto capitalize font-bold outline dark:outline-white outline-blue bg-transparent px-4 text-blue" onClick={() => handleSelection("REFUSED")}>Refuser</button>
                                </div>
                            </div>
                            <table className="w-full border border-blue dark:border-white border-2">
                                <thead className="w-full text-left bg-blue dark:bg-blue-dark text-white">
                                    <tr className="h-10">
                                        <th className="pl-2.5 text-sm sm:text-base">Date</th>
                                        <th className="pl-2.5 text-sm sm:text-base">Nombre d'heures</th>
                                        <th className="pl-2.5 text-sm sm:text-base">Type de journée</th>
                                        <th className="pl-2.5 pr-2.5 text-center flex items-center justify-center h-10"><input type="checkbox" defaultChecked={allChecked} checked={allChecked} onChange={checkAllTimes} className="w-4 h-4 dark:bg-white accent-blue-selected bg-blue" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userTimes?.map((item, index) => (
                                        <tr key={index} className="dark:hover:text-white dark:even:bg-blue-dark even:bg-blue odd:bg-transparent even:text-white dark:odd:text-white h-10 ">
                                            <td className="pl-2.5 text-sm sm:text-base">{item.day}/{item.month + 1}/{item.year}</td>
                                            <td className="pl-2.5 text-sm sm:text-base relative" onMouseLeave={() => {onLeaveTimeCustom(index)}} onMouseEnter={() => {onHoverTimeCustom(index)}} >{item.work}
                                            {item?.CustomTime?.length > 0 && <div className="hidden z-10 shadow w-full bg-white absolute top-full" id={`time-modal-${index}`}>
                                                {item?.CustomTime?.map((time, index) => (
                                                    <div key={index} className="bg-white flex flex-col last:mb-1 first:mt-1 mt-2 items-center">
                                                        <Paragraph className="text-center">{time.name}</Paragraph>
                                                        <div className="flex items-center sm:flex-row flex-col gap-1 sm:mt-0 mt-1 sm:gap-3">
                                                        <Paragraph>{time.start}</Paragraph>
                                                        <Paragraph>à</Paragraph>
                                                        <Paragraph>{time.end}</Paragraph>
                                                        </div>

                                                    </div>
                                                ))}
                                                </div>}
                                            </td>
                                            <td className="pl-2.5 text-sm sm:text-base">{item?.CustomTime?.length > 0 ? "Personnalisé" : item?.specialTime?.name ? item?.specialTime?.name : "Automatique"}</td>
                                            <td className="pl-2.5 pr-2.5 flex items-center h-10 justify-center"><input type="checkbox" defaultChecked={allChecked} checked={item.checked} value={item.checked} onChange={() => { checkOneTime(item, index) }} className="w-4 h-4 dark:bg-white accent-blue-selected bg-blue" /></td>
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