import { useUserContext } from "../../../context";
import joinClasses from "../../../helpers/joinClasses";
import { DarkLogo, Logo, OrbitronSubTitle, Paragraph, SubTitle } from "../../atoms";

export function SmallStraightLogo({ className }) {
    const { setBurgerOpen, theme } = useUserContext()

    return (
        <div className={joinClasses(className, "w-full flex items-center gap-3")}>
            {theme ? <DarkLogo height={56} width={56} /> : <Logo height={56} width={56} />}
            <div className='flex flex-col'>
                <Paragraph className={"font-orbitron"}>Mon Compt'heures</Paragraph>
            </div>
        </div>
    );
}