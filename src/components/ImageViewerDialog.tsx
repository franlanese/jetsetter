"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageViewerDialogProps {
    src: string;
    alt: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ImageViewerDialog({ src, alt, open, onOpenChange }: ImageViewerDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] p-2 overflow-auto">
                <div className="flex items-center justify-center w-full h-full">
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-[90vh] object-contain"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
