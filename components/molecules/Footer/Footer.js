import joinClasses from "../../../helpers/joinClasses";
import { Paragraph, ParagraphLink } from "../../atoms";

export function Footer({reverse = false, className = ""}) {

    return (
        <footer className={joinClasses(className,`flex items-center justify-between gap-2.5`)}>
            <div className="flex items-center gap-1.5">
                <Paragraph className={reverse && "!text-white"}>Made by</Paragraph>
                <a href="https://github.com/StarlingSG1" target="_blank" className={`${reverse && "!text-white"} dark:text-white text-blue underline font-noto`}>Jérémie Barrière</a>
            </div>
            <div className={`w-[2px] h-[24px] dark:bg-white bg-blue ${reverse && "!bg-white"} rounded-full`}></div>
            <ParagraphLink href="/mentions-legales" className={reverse && "!text-white"}>Mentions légales</ParagraphLink>
        </footer>
    )
}