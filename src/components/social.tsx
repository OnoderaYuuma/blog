import {Github, Facebook, X} from "lucide-react";
import { Sarpanch } from "next/font/google";
import Link from "next/link";
const Social = () => {
    return (
        <ul className="flex flex-row justify-center items-center gap-x-6">
            <li>
                <Link href={"https://x.com/home?lang=ja"}>
                    <X size={24} />
                </Link>
                <span className="sr-only">X</span>
            </li>
            <li>
                <Link href={"https://www.facebook.com/?locale=ja_JP"}>
                    <Facebook size={24} />
                </Link>
                <span className="sr-only">Feceboox</span>
            </li>
            <li>
                <Link href={"https://github.co.jp/"}>
                    <Github size={24} />
                </Link>
                <span className="sr-only">Github</span>
            </li>
        </ul>
    );
}
 
export default Social;