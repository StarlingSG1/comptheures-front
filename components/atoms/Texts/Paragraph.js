import joinClasses from "../../../helpers/joinClasses";

export function Paragraph({ children, onClick, className }) {
  return <p onClick={onClick} className={joinClasses(className,"dark:text-white text-blue font-noto")}>{children}</p>;
}