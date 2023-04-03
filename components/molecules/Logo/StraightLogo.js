import Link from "next/link";
import { useUserContext } from "../../../context";
import joinClasses from "../../../helpers/joinClasses";
import { DarkLogo, Logo, OrbitronSubTitle, Paragraph, SubTitle } from "../../atoms";

export function StraightLogo({ className }) {

    const { theme } = useUserContext()

    return (
        <div className={joinClasses(className, "w-full mt-10 flex items-center gap-3")}>
            <Link href="/">
                {theme ? <DarkLogo /> : <Logo />}
            </Link>
            <div className='flex flex-col'>
            <h1 className="dark:text-white text-blue text-bigger font-orbitron">Comptheures</h1>
                <h2 className="dark:text-white text-blue font-noto">Compter ses heures en ligne</h2>
            </div>
        </div>
    );
}