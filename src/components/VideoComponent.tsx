"use client"
import { useRef, useEffect } from "react"

export default function VideoComponent({ videoUrl }: { videoUrl: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Función para forzar la reproducción
        const tryPlay = () => {
            if (video.paused) {
                video.play().then(() => {
                    // Si funcionó, ya no necesitamos escuchar interacciones
                    removeListeners();
                }).catch((err) => {
                    console.log("Autoplay bloqueado temporalmente", err);
                });
            }
        };

        const removeListeners = () => {
            window.removeEventListener('touchstart', tryPlay);
            window.removeEventListener('scroll', tryPlay);
            window.removeEventListener('click', tryPlay);
        };

        // 1. Intentar apenas carga
        tryPlay();

        // 2. Si el navegador lo bloqueó, reintentar al primer scroll, toque o clic
        window.addEventListener('touchstart', tryPlay, { passive: true });
        window.addEventListener('scroll', tryPlay, { passive: true });
        window.addEventListener('click', tryPlay, { passive: true });

        return () => removeListeners();
    }, [videoUrl]);

    return (
        <div className="w-full overflow-hidden rounded-3xl shadow-xl">
            <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-auto object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                suppressHydrationWarning
            >
            </video>
        </div>
    )
}