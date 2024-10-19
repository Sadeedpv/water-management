import { ClimbingBoxLoader } from "react-spinners";

export default function Loading(){
    return (
        <div className="flex items-center justify-center min-h-screen">
            <ClimbingBoxLoader color="#c8c8c8" size={25}/>
        </div>
    )
}