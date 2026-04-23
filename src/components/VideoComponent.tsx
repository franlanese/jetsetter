"use client"
import { useRef } from "react"

export default function VideoComponent({ videoUrl }) {
    return (
        <div className="w-full overflow-hidden rounded-3xl shadow-xl">
            <video
                src={videoUrl}
                className="w-full h-auto object-cover"
                autoPlay
                muted
                loop
                controls={false}
                suppressHydrationWarning
            >
            </video>
        </div>

    )
}