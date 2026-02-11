"use client"

import { useState } from "react"
import type { ContactPayload } from "@/app/types/contactPayloadTypes"
import { sendContact } from "@/app/services/contactServices"

type Status = "idle" | "loading" | "success" | "error"

export function useContactForm() {
  const [values, setValues] = useState<ContactPayload>({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    const res = await sendContact(values)

    if (!res.ok) {
      setStatus("error")
      setError(res.error || "Erro ao enviar")
      return
    }

    setStatus("success")
    setValues({ name: "", email: "", message: "" })
  }

  return { values, status, error, handleChange, handleSubmit }
}
