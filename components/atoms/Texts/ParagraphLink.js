import Link from "next/link";
import joinClasses from "../../../helpers/joinClasses";

export function ParagraphLink({ children,  href = "/", className = "" }) {
  return <Link href={href} className={joinClasses(className,"dark:text-white text-blue underline font-noto")}>{children}</Link>;
}