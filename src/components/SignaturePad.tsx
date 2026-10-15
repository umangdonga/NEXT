import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw, PenTool, CheckCircle } from 'lucide-react';
import { audio } from '../audioService';

interface SignaturePadProps {
  initialSignature: string | null;
  onSave: (dataUrl: string | null) => void;
  clearLabel: string;
  sampleLabel: string;
  hintText: string;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  initialSignature,
  onSave,
  clearLabel,
  sampleLabel,
  hintText,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const getCanvasCoordinates = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: any) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoordinates(e.nativeEvent);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoordinates(e.nativeEvent);
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = '#1e3a8a'; // Deep navy bank signature ink
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL());
    }
  }, [isDrawing, onSave]);

  const clearCanvas = () => {
    audio.playTap();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onSave(null);
  };

  const drawSampleSignature = () => {
    audio.playTap();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw an artistic signature curve for Ramesh Patel
    ctx.beginPath();
    ctx.moveTo(60, 140);
    ctx.quadraticCurveTo(80, 50, 110, 60);
    ctx.quadraticCurveTo(120, 140, 140, 130);
    ctx.bezierCurveTo(160, 110, 180, 80, 210, 115);
    ctx.quadraticCurveTo(240, 140, 270, 100);
    ctx.quadraticCurveTo(300, 70, 330, 130);
    // Loop
    ctx.bezierCurveTo(360, 160, 420, 40, 450, 120);
    // Underline flourish
    ctx.moveTo(70, 155);
    ctx.quadraticCurveTo(250, 175, 480, 145);
    // Two dots
    ctx.moveTo(495, 150);
    ctx.arc(495, 150, 2.5, 0, Math.PI * 2);
    ctx.moveTo(515, 150);
    ctx.arc(515, 150, 2.5, 0, Math.PI * 2);

    ctx.stroke();
    setHasDrawn(true);
    onSave(canvas.toDataURL());
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (initialSignature) {
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          setHasDrawn(true);
        }
      };
      img.src = initialSignature;
    }
  }, [initialSignature]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-2xl bg-white border-2 border-dashed border-blue-400 rounded-2xl p-2 shadow-inner overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={220}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-48 sm:h-56 bg-slate-50/50 rounded-xl cursor-crosshair touch-none"
        />

        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-400 gap-2">
            <PenTool className="w-8 h-8 text-blue-300 animate-bounce" />
            <span className="text-base font-medium text-slate-400">{hintText}</span>
          </div>
        )}

        {hasDrawn && (
          <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Captured</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between w-full max-w-2xl mt-3 px-1">
        <button
          type="button"
          onClick={clearCanvas}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{clearLabel}</span>
        </button>

        <button
          type="button"
          onClick={drawSampleSignature}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 hover:border-blue-400 text-blue-700 hover:bg-blue-50 text-xs font-semibold transition-all cursor-pointer"
        >
          <PenTool className="w-3.5 h-3.5 text-blue-600" />
          <span>{sampleLabel}</span>
        </button>
      </div>
    </div>
  );
};
