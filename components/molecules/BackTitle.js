import { useRouter } from "next/router";
import { RealArrow, SubTitle } from "../atoms";

export function BackTitle({children, href="/enterprise"}) {

    const router = useRouter()

    return (
        <div className="flex items-center justify-between mt-[25px] mb-[50px]">
            <RealArrow onClick={() => router.push(href)} width={40} height={40} className="cursor-pointer rotate-180" />
            <SubTitle className="text-center ">{children}</SubTitle>
            <RealArrow width={40} height={40} className="invisible" />
        </div>
    )
}