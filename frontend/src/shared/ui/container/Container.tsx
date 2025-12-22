import { ContainerInterface } from "@/shared/lib";

export default function Container({ children }: ContainerInterface) {
    return (
        <div className="container">
            {children}
        </div>
    )
}