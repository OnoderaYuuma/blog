import { FC } from "react";

type  Props = {
    children: React.ReactNode
}
const TwoColumnLayout: FC<Props> = ({children}) => {
    return (
        <div className="flex justify-center items-center py-16">
            <div className="container flex flex-col lg:flex-row max-w-5xl gap-12  px-8">
                {children}
            </div>
        </div>
    );
}
 
export default TwoColumnLayout;