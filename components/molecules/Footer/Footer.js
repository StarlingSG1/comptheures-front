import { Paragraph, ParagraphLink } from "../../atoms";

export function Footer({reverse = false}) {

    return (
        <footer className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5">
                <Paragraph className={reverse && "!text-white"}>Made by</Paragraph>
                <ParagraphLink className={reverse && "!text-white"}>Jérémie Barrière</ParagraphLink>
            </div>
            <div className={`w-[2px] h-[24px] dark:bg-white bg-blue ${reverse && "!bg-white"} rounded-full`}></div>
            <ParagraphLink className={reverse && "!text-white"}>Mentions légales</ParagraphLink>
        </footer>
    )
}