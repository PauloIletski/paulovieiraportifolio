import {createClient} from "@supabase/supabase-js"

export function supabaseServer(){
    const url = process.env.SUPABASE_URL
    const serviceKey= process.env.SUPABASE_SERVICE_ROLE_KEY

    if(!url || !serviceKey){
        throw new Error("Supabase env vars not set")
    }

    return createClient(url,serviceKey)
}