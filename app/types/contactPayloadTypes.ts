export type ContactPayload = {
  name: string
  email: string
  message: string
}

export type ContactResponse = {
  ok: boolean
  error?: string
}
