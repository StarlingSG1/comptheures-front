import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BigDesktopCard, Button, SmallDesktopCard, SubTitle } from '../components/atoms'
import { BigLogo, Footer } from '../components/molecules'
import { BurgerItem } from '../components/molecules/BurgerMenu/BurgerItem'
import { MobileTemplate, NewTemplate, Template } from '../components/organisms'
import { useUserContext } from '../context'


export default function Home() {

  const { theme, setBurgerOpen, user } = useUserContext()
  const [homeOpen, setHomeOpen] = useState(false);

  const router = useRouter()

  const goToLogin = () => {
    router.push('/login')
  }

  const goToRegister = () => {
    router.push('/register')
  }

  const goToComptheures = () => {
    router.push('/comptheures')
  }

  useEffect(() => { setHomeOpen(false); setBurgerOpen(false); }, [])

  return (
    <>
      <Head>
        <title>Comptheures.fr - Compter ses heures en ligne</title>
        <meta
          name="description"
          content="Compter ses heures en ligne, c'est possible avec Comptheures.fr. Créez votre compte et commencez à compter vos heures dès maintenant."
          key="desc"  
        />
        <link rel="canonical" href="https://comptheures.fr/" />
        <meta property="og:title" content="Comptheures en ligne" />
        <meta
          property="og:description"
          content="Compter ses heures sur un calendrier en ligne rapidement et gratuitement."
        />
      </Head>
      <NewTemplate>

        {/* MOBILE */}
        <span className="h-[0px] w-full dark:bg-blue bg-white"></span>
        <div className='block md:hidden h-full flex flex-col justify-between'>
          <span className="h-[0px] w-full dark:bg-blue bg-white"></span>
          <div className="w-full flex flex-col items-center gap-20">
            <BigLogo theme={theme} className={homeOpen && " -translate-y-[45%] "} />
            <Button onClick={() => { user ? goToComptheures() : setHomeOpen(true) }}>Commencer à compter</Button>
          </div>
          {!user && <div className={`fixed bottom-0 left-0 w-full px-[30px] py-8 dark:bg-blue-dark bg-blue h-1/2  rounded-t-[32px] duration-200 flex flex-col justify-between  ${homeOpen ? "" : "translate-y-full "}`}>
            <SubTitle className="font-bold text-center dark:text-white">Bienvenue</SubTitle>
            <div className='w-full flex flex-col gap-8'>
              <Button onClick={() => { goToRegister() }} className='!bg-white !text-blue'>Se créer un compte</Button>
              <Button onClick={() => { goToLogin() }} className='bg-blue-dark dark:!bg-blue dark:!text-white text-white'>J'ai déjà un compte</Button>
            </div>
            <Footer reverse={true} />
          </div>}
          <div onClick={() => { setHomeOpen(false) }} className={`fixed top-0 w-full bg-transparent h-1/2 z-[100] -translate-x-[30px]  duration-200 ${homeOpen ? "" : "-translate-y-full "}`}></div>
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:flex flex-col relative  h-full duration-200 overflow-hidden  ${!homeOpen && "justify-end"}`}>
          <BigLogo theme={theme} />
          {!user ? <><Button className={homeOpen ? "mt-20 mb-10" : "mt-[100px]"} onClick={() => { !homeOpen ? setHomeOpen(true) : goToRegister() }} >{homeOpen ? "Se créer un compte" : "Commencer à compter"}</Button>
            <Button className={` ${!homeOpen && "absolute -bottom-[40px] translate-y-full"} duration-200 !dark:bg-blue-dark dark:!text-white !bg-blue-dark`} onClick={() => { goToLogin() }}>J'ai déjà un compte</Button></> :
            <Button className={homeOpen ? "mt-20 mb-10" : "mt-[100px]"} onClick={() => { goToComptheures() }} >Commencer à compter</Button>}
        </div>
      </NewTemplate>
    </>
  )
}
