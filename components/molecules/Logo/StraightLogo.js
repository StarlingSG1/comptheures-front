import joinClasses from "../../../helpers/joinClasses";
import { DarkLogo, Logo, OrbitronSubTitle, Paragraph, SubTitle } from "../../atoms";

export function StraightLogo({ className, theme }) {
    return (
        <div className={joinClasses(className,"w-full mt-10 flex items-center gap-3")}>
            {theme ? <DarkLogo /> : <Logo />}
            <div className='flex flex-col'>
                <SubTitle className={"font-orbitron"}>Mon Compt'heures</SubTitle>
                <Paragraph>Parce que chaque heure compte</Paragraph>
            </div>
        </div>
    );
}