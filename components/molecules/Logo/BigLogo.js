import Link from "next/link";
import { useUserContext } from "../../../context";
import joinClasses from "../../../helpers/joinClasses";
import { DarkLogo, Logo, OrbitronSubTitle, Paragraph, SubTitle } from "../../atoms";

export function BigLogo({ className }) {

    const { theme } = useUserContext()

    return (
        <div className={joinClasses(className, 'duration-200 w-full flex flex-col items-center gap-5')}>
            <Link href="/">
                {theme ? <DarkLogo height={133} width={133} /> : <Logo height={133} width={133} />}
            </Link>
            <div className='flex flex-col items-center'>
                <h1 className="dark:text-white text-blue text-bigger font-orbitron">Comptheures</h1>
                <h2 className="dark:text-white text-blue font-noto">Compter ses heures en ligne</h2>
            </div>
        </div>
    );
}