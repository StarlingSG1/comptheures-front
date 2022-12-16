import joinClasses from "../../../helpers/joinClasses";

export function OrbitronTitle({ children, className = "" }) {
    return <p className={joinClasses(className,`dark:text-white text-blue font-orbitron text-large`)}>{children}</p>;
  }
  