import Link from "next/link";
import { useUserContext } from "../../../context";
import { Arrow, BurgerParagraph, House, LoginIcon, ProfileIcon, RegisterIcon } from "../../atoms";
import { ComptheuresIcon } from "../../atoms/Icons/ComptheuresIcon";
import { LogoutIcon } from "../../atoms/Icons/LogoutIcon";

export function BurgerItem({ children, icon = "home", href = "/" }) {

    const { user } = useUserContext();

    return (
        <Link href={href} className="flex items-center justify-between group hover:bg-blue dark:hover:bg-white duration-200 first:rounded-t-md last:rounded-b-md pr-[5px]">
            <div className={`flex items-center gap-5 ${user ? "py-10" : "md:py-[26.75px] py-10"}`}>
                <div className="w-6 pl-[5px]">
                    {icon === "home" ? <House className="group-hover:fill-white dark:group-hover:fill-blue duration-200" /> : icon === "login" ? <LoginIcon className="group-hover:fill-white dark:group-hover:fill-blue duration-200" /> : icon === "register" ? <RegisterIcon className="group-hover:fill-white dark:group-hover:fill-blue duration-200" /> : icon === "logout" ? <LogoutIcon className="group-hover:fill-white dark:group-hover:fill-blue duration-200" /> : icon === "profile" ? <ProfileIcon className="group-hover:fill-white dark:group-hover:fill-blue duration-200" /> : icon === "comptheures" && <ComptheuresIcon className="group-hover:fill-white dark:group-hover:fill-blue duration-200" />}
                </div>
                <BurgerParagraph className="group-hover:text-white dark:group-hover:text-blue duration-200">{children}</BurgerParagraph>
            </div>
            <Arrow className="group-hover:fill-white dark:group-hover:fill-blue duration-200" />
        </Link>
    )
}