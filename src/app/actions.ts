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

export async function submitDemoRequest(formData: FormData) {
  // Datos para Laravel
  const rawData = {
    nombre: formData.get('nombre'),
    email: formData.get('email'),
    empresa: formData.get('empresa'),
  };

  // Intentar guardar en Laravel
  try {
    const res = await fetch(`${process.env.LARAVEL_API_URL}/usuarioFormulario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': process.env.LARAVEL_API_KEY || '', 
      },
      body: JSON.stringify(rawData),
    });

    const data = await res.json();

    // Si Laravel dice error (ej: duplicado), devolvemos el error al front para que lo muestre
    if (!res.ok) {
        return { 
            success: false, 
            message: data.message || 'Error al procesar la solicitud.' 
        };
    }

  } catch (error) {
    return { success: false, message: 'No se pudo conectar con el servidor.' };
  }

  // 3. SI LARAVEL DIO OK: Ejecutamos la lógica del frontender (Cookies + Redirect)
  
  const cookieStore = await cookies()
  const TEN_YEARS = 60 * 60 * 24 * 365 * 10

  cookieStore.set('form_completed', 'true', { 
    httpOnly: true,
    path: '/',
    maxAge: TEN_YEARS 
  })

  // Esto lanza un error interno de Next.js para cambiar de página, así que va al final
  redirect('/demo')
}