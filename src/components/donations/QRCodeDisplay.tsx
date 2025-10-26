'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  label?: string;
}

export function QRCodeDisplay({ value, size = 200, label }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) {
            console.error('Error generating QR code:', error);
          }
        }
      );
    }
  }, [value, size]);

  return (
    <div className="flex flex-col items-center space-y-2">
      {label && <p className="text-sm font-medium text-muted-foreground">{label}</p>}
      <div className="p-4 bg-white rounded-lg">
        <canvas ref={canvasRef} />
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-[200px] break-all">
        {value}
      </p>
    </div>
  );
}
