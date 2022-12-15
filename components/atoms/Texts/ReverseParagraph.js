import joinClasses from "../../../helpers/joinClasses";

export function ReverseParagraph({ children, onClick, className }) {
  return <p onClick={onClick} className={joinClasses(className,"md:!text-white md:dark:!text-blue  text-white dark:text-blue font-noto")}>{children}</p>;
}