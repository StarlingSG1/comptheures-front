import { BigDesktopCard, CrossIcon, SmallDesktopCard } from "../../atoms";
import { Footer } from "../../molecules";
import { MobileBurger } from "../Burger/MobileBurger";

export function MobileTemplate({ children }) {


    return (
        <>
            <CrossIcon />
            <MobileBurger />
            <div className="md:hidden w-screen py-10 flex flex-col justify-between px-[5%] min-h-screen dark:bg-blue md:dark:bg-blue-dark md:bg-blue bg-white">
                {children}
                <Footer/>
            </div>
            
        </>
    )

    
}