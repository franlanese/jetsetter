'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function submitForm(formData: FormData) {
  // 1. Obtener la instancia de cookies esperando la promesa
  const cookieStore = await cookies()

  const TEN_YEARS = 60 * 60 * 24 * 365 * 10

  const nombre = formData.get('nombre')
  console.log("Procesando formulario para:", nombre)

  cookieStore.set('form_completed', 'true', { 
    httpOnly: true,
    path: '/',
    maxAge: TEN_YEARS 
  })

  // 3. Redirigir
  redirect('/demo')
}