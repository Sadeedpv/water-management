import { baseUrl } from "@/lib/constants";
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react";

export default () => {
    const { data: session } = useSession()
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
        PostUser();
    }, [])
    return (
        <div className="flex flex-row min-h-screen">
            <div className="flex-auto w-14">
                SIDEPANEL
            </div>
            <div className="flex-auto w-28">
                DATA
            </div>
        </div>
    )
}