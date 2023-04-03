import { useEffect, useState } from "react";
import { useUserContext } from "../../../context";
import joinClasses from "../../../helpers/joinClasses";
import { BurgerSeparator, DarkLogo, Logo, OrbitronSubTitle, Paragraph, SystemIcon } from "../../atoms";
import { MoonIcon } from "../../atoms/Icons/MoonIcon";
import { SunIcon } from "../../atoms/Icons/SunIcon";
import { BurgerContent, Footer, StraightLogo, ThemePicker } from "../../molecules";
import { BurgerItem } from "../../molecules/BurgerMenu/BurgerItem";

export function MobileBurger({ className = "" }) {

    const { burgerOpen, theme, setTheme, getLogo, user } = useUserContext()



    const [selectTheme, setSelectTheme] = useState("system");

    useEffect(() => {
        onLoadTheme()
        getLogo()
    }, []);

    const setTheTheme = (value) => {
        if (value === 'dark') {
            localStorage.setItem('comptheuresTheme', 'dark')
            document.documentElement.classList.add('dark')
            setTheme(true)
            setSelectTheme("dark")
        } else if (value === 'light') {
            localStorage.setItem('comptheuresTheme', 'light')
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
            setTheme(false)
            setSelectTheme("light")
        } else if (value === 'system') {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.remove('light')

            if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
                localStorage.removeItem('comptheuresTheme')
                document.documentElement.classList.add('dark')
                setTheme(true)
                setSelectTheme("system")
            } else {
                localStorage.removeItem('comptheuresTheme')
                setTheme(false)
                setSelectTheme("system")
            }
        }
    }

    const onLoadTheme = () => {
        const theme = localStorage.getItem("comptheuresTheme");
        if (theme === 'dark') {
            setSelectTheme("dark")
        } else if (theme === 'light') {
            setSelectTheme("light")
        } else if (!theme) {
            setSelectTheme("system")
        }
    }




    return (
        <div className={joinClasses(className, `fixed md:hidden z-20 top-0 left-0 w-screen h-screen md:dark:bg-blue-dark md:bg-blue dark:bg-blue bg-white py-10 px-[30px] duration-200 ${burgerOpen ? "translate-x-0" : "translate-x-full"} `)}>
            <div className='h-full w-full flex flex-col justify-between'>
                <div>
                    <div className='w-full h-10 flex items-center'>
                        <ThemePicker item={selectTheme} setTheTheme={setTheTheme} />
                    </div>
                    <StraightLogo />
                    <div className='mt-60'>
                        <BurgerContent />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}