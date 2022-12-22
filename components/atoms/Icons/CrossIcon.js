import { useEffect, useState } from "react";
import { useUserContext } from "../../../context";
import joinClasses from "../../../helpers/joinClasses";

export function CrossIcon({onClick}){


    const { burgerOpen, setBurgerOpen = () => {}} = useUserContext()


    const closeOpen = () => {
        setBurgerOpen(!burgerOpen)
    }

    return (
                <div
                    className={`${burgerOpen ? "fixed" : "absolute"} top-[47px] right-[5%] z-50 block cursor-pointer md:hidden`}
                    onClick={() => {closeOpen()}}
                >
                    <span
                        className={joinClasses(
                            "mb-2 block h-[3px] w-[15px] rounded-full dark:bg-white bg-blue transition duration-300 ease-in-out",
                            burgerOpen && "translate-y-[6px] translate-x-[2px] rotate-45 transform"
                        )}
                    />
                    <span
                        className={joinClasses(
                            "mb-2 block h-[3px] w-[30px] rounded-full dark:bg-white bg-blue transition duration-300 ease-in-out",
                            burgerOpen && "-rotate-45  transform"
                        )}
                    />
                    <span
                        className={joinClasses(
                            "block h-[3px] w-[15px] rounded-full dark:bg-white bg-blue transition translate-x-full duration-300 ease-in-out",
                            burgerOpen && " -translate-y-[5.5px] translate-x-[12.5px] rotate-45 transform"
                        )}
                    />
                </div>
    )
}