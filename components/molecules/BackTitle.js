import { useRouter } from "next/router";
import joinClasses from "../../helpers/joinClasses";
import { RealArrow, SubTitle } from "../atoms";

export function BackTitle({children, href="/enterprise", onClick, state = false, className = ""}) {

    const router = useRouter()

    return (
        <div className={joinClasses(className, "flex items-center justify-between mt-[25px] mb-[50px]")}>
            <RealArrow onClick={state ? onClick : () => router.push(href)} width={40} height={40} className="cursor-pointer rotate-180"  />
            <SubTitle className="text-center ">{children}</SubTitle>
            <RealArrow width={40} height={40} className="invisible" />
        </div>
    )
}