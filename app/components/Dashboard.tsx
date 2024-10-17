import { baseUrl } from "@/lib/constants";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";


export default () => {
    const { data: session } = useSession()
    const [loading, setloading] = useState(true);
    console.log(session);
    useEffect(() => {
        const PostUser = async () => {
            const req = await fetch(`${baseUrl}/api/Postdata`, {
                method: 'POST',
                body: JSON.stringify({
                    name: session?.user?.name,
                    email: session?.user?.email
                })
            });
            console.log(req.status);
        }
        PostUser().then(() => {
            setloading(false);
        });
    }, [])
    return loading ? (
      <div className="flex items-center justify-center min-h-screen">
        <ReactLoading type="bars" color="#c8c8c8" />
      </div>
    ) : (
      <div className="flex flex-row min-h-screen">
        <div className="flex-auto w-14">SIDEPANEL</div>
        <div className="flex-auto w-28">DATA</div>
      </div>
    );
}