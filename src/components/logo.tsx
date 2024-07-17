import Link from "next/link";
import { FC } from "react";

type Props = {
    isBoxStyle?: boolean
}

const Logo: FC<Props> = ({isBoxStyle}) => {
    return (
        <>
        {isBoxStyle ? (
            <Link href={"./"} className="bg-stone-700 text-white font-bold text-2xl py-4 px-8 inline-block">CUBE</Link>
        ) : (
            <Link href={"./"} className="text-black font-bold text-2xl py-4 px-8 inline-block">CUBE</Link>
        )}
        </>
    );
}
 


export default Logo;