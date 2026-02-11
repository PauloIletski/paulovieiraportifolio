import { ContactPayload, ContactResponse } from "../types/contactPayloadTypes";

export async function sendContact(payload:ContactPayload):Promise<ContactResponse>{
    const res = await fetch("api/contact", {
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify(payload),
    })

    if(!res.ok){
        const data = (await res.json().catch(()=>null)) as ContactResponse |null
        return{ok:false,error:data?.error || "Error on sending"}
    }

    return (await res.json()) as ContactResponse
}