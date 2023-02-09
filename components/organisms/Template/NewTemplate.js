import Head from "next/head";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context";
import { useCalendarContext } from "../../../context/calendar";
import joinClasses from "../../../helpers/joinClasses";
import { BigDesktopCard, CrossIcon, Paragraph, SmallDesktopCard, Title } from "../../atoms";
import { Footer } from "../../molecules";
import { MobileBurger } from "../Burger/MobileBurger";

export function NewTemplate({ children, comptheures = false, className = "" }) {

    const { times, currentDay } = useCalendarContext()
    const { user } = useUserContext()
    const [todayStatus, setTodayStatus] = useState(null)

    const isComptheures = () => {

    }

    const checkTimeToday = () => {
        const today = times.find(time => time.day === currentDay.getDate() && time.month === currentDay.getMonth() && time.year === currentDay.getFullYear())
        if (today?.realisationStatus) {
            switch (today.realisationStatus) {
                case "IN_VALIDATION":
                    setTodayStatus("En attente de validation")
                    break;
                case "VALIDATED":
                    setTodayStatus("Validé par l'administateur")
                    break;
                case "REFUSED":
                    setTodayStatus("Refusé par l'administateur")
                    break;
                default:
            }
        } else {
            setTodayStatus(null)
        }
    }

    useEffect(() => {
        checkTimeToday()
    }, [times, currentDay])

    return (
        <>
            <div className="md:py-[150px] md:flex md:dark:bg-blue-dark md:bg-blue md:w-screen md:justify-center md:items-center md:min-h-screen">
                <div className="md:w-full md:max-w-[1030px] md:grid md:grid-cols-12 md:gap-[50px] md:items-start md:gap-[50px]">
                    <CrossIcon />
                    <MobileBurger className="md:hidden" />
                    <div className={`w-screen py-10 flex flex-col justify-between px-[5%] min-h-screen dark:bg-blue bg-white relative   md:w-auto md:block md:col-span-8 md:min-h-[520px] md:h-full md:shadow md:px-[30px] md:rounded-2xl`}>
                        {children}
                        <Footer className="md:hidden" />
                    </div>
                    {comptheures
                        ?
                        <div className="hidden col-span-4 md:flex gap-10 flex-col">
                            <SmallDesktopCard />
                            <div className="shadow dark:bg-blue bg-white rounded-2xl py-5 px-[15px] flex flex-col items-center gap-[15px]" >
                                <Paragraph className="text-center"><strong>Automatique : </strong>{user?.userEnterprise?.enterprise?.configEnterprise?.workHourADay}</Paragraph>
                                {todayStatus && <Paragraph className="text-center"><strong>Statut : </strong>{todayStatus}</Paragraph>}
                            </div>
                        </div>
                        : <SmallDesktopCard />}
                </div>
            </div>
        </>
    )
}