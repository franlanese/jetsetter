import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Verificar si la cookie existe
  const hasCompletedForm = request.cookies.get('form_completed')

  // 2. Si NO tiene la cookie, redirigir al formulario
  if (!hasCompletedForm) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 3. Si tiene la cookie, permitir el paso
  return NextResponse.next()
}

// Configuración: El middleware solo se ejecutará en estas rutas
export const config = {
  matcher: '/demo/:path*', // Protege /demo y cualquier subruta (/demo/video, etc.)
}