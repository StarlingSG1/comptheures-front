import { BigDesktopCard, Card, CrossIcon, Paragraph, SmallDesktopCard, Title } from "../../atoms";
import { Footer } from "../../molecules";
import { MobileBurger } from "../Burger/MobileBurger";

export function Template({ children, comptheures = false }) {

    

    return (
        <div className="hidden py-[150px] md:flex dark:bg-blue-dark bg-blue w-screen justify-center items-center min-h-screen">
            <div className="w-full max-w-[1030px] grid grid-cols-12 gap-[50px] items-start gap-[50px]">
                <BigDesktopCard>
                    {children}
                </BigDesktopCard>
                {comptheures ?
                    <div className="col-span-4 flex gap-10 flex-col">
                        <SmallDesktopCard />
                        <div edit={true} className="shadow dark:bg-blue bg-white rounded-2xl py-5 px-[15px  ] flex flex-col items-center gap-[15px]" >
                            <div className="flex flex-col items-center">
                                <Title>8</Title>
                                <Paragraph>heures de travail</Paragraph>
                            </div>
                            <div className="flex flex-col items-center">
                                <Title>1</Title>
                                <Paragraph>heure de pause</Paragraph>
                            </div>
                        </div>
                    </div>
                    : <SmallDesktopCard />}
            </div>
        </div>
    )
}