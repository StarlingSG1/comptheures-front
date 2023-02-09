import { useEffect, useState } from "react";
import { useUserContext } from "../../../context";
import { BurgerContent, SmallStraightLogo, StraightLogo, ThemePicker } from "../../molecules";
import { BurgerItem } from "../../molecules/BurgerMenu/BurgerItem";
import { BurgerSeparator } from "../Separators/BurgerSeparator";
import { Paragraph } from "../Texts/Paragraph";
import { ParagraphLink } from "../Texts/ParagraphLink";

export function SmallDesktopCard({ children }) {

    const { burgerOpen, setTheme, getLogo, user } = useUserContext()

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

    return <div className="hidden md:block col-span-4 relative shadow dark:bg-blue bg-white rounded-2xl py-5 px-[15px]">
        <ThemePicker item={selectTheme} setTheTheme={setTheTheme} className="absolute justify-end right-0 -translate-y-[65px]" />
        <SmallStraightLogo />
        {children}
        <div className='my-5'>
            <BurgerContent />
        </div>
        <div className="flex items-center gap-1.5 mb-5">
            <Paragraph>Made by</Paragraph>
            <a  href="https://github.com/StarlingSG1" target="_blank" className={`dark:text-white text-blue underline font-noto`}>Jérémie Barrière</a>
        </div>
        <ParagraphLink href="/mentions-legales">Mentions légales</ParagraphLink>
    </div>
}