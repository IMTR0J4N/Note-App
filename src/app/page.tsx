import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";

export default async function MainRoutePage() {
    const session = await getSession();

    if(session) {
        return redirect("/app");
    }

    return redirect("/auth");
}