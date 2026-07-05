import { useRef, useState, useEffect } from 'react';
import { X, Eraser, AlertCircle, Loader2, PenTool } from 'lucide-react';
import { CGV_URL, signCgvPdf } from '../../lib/signCgv';

interface CgvSignatureModalProps {
  fullName: string;
  onClose: () => void;
  onSigned: (file: File) => void;
}

export function CgvSignatureModal({ fullName, onClose, onSigned }: CgvSignatureModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Initialise le canevas (résolution nette, fond blanc)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = '#1F2937';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    drawingRef.current = true;
    lastPointRef.current = getPoint(e);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !lastPointRef.current) return;
    const point = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
    if (!hasSignature) setHasSignature(true);
    if (error) setError('');
  };

  const endDraw = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    const ratio = window.devicePixelRatio || 1;
    ctx.scale(ratio, ratio);
    setHasSignature(false);
    setError('');
  };

  const handleConfirm = async () => {
    if (!hasSignature) {
      setError('Votre signature est requise.');
      return;
    }
    setIsSaving(true);
    setError('');
    try {
      const dataUrl = canvasRef.current!.toDataURL('image/png');
      const file = await signCgvPdf({ fullName, signatureDataUrl: dataUrl });
      onSigned(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de générer le document signé.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0] dark:border-[#2A2A2A] shrink-0">
          <div>
            <h3 className="text-lg font-bold text-[#2D2D2D] dark:text-white">Conditions Générales de Vente et de Formation</h3>
            <p className="text-xs text-[#696969]">Lisez le document puis signez dans le cadre prévu ci-dessous.</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F0F0F0] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-all shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Lecture du PDF */}
          <div className="rounded-xl overflow-hidden border border-[#E0E0E0] dark:border-[#2A2A2A]">
            <iframe
              src={`${CGV_URL}#toolbar=1`}
              title="Conditions Générales de Vente et de Formation"
              className="w-full h-[45vh] bg-white"
            />
          </div>

          {/* Zone de signature */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#696969] uppercase tracking-wider">
                <PenTool className="h-3.5 w-3.5" /> Votre signature — « Lu et approuvé »
              </label>
              <button
                type="button"
                onClick={clearCanvas}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#696969] hover:text-red-500 transition-colors"
              >
                <Eraser className="h-3.5 w-3.5" /> Effacer
              </button>
            </div>
            <canvas
              ref={canvasRef}
              onPointerDown={startDraw}
              onPointerMove={draw}
              onPointerUp={endDraw}
              onPointerLeave={endDraw}
              className={`w-full h-40 rounded-xl border-2 touch-none cursor-crosshair bg-white ${
                error ? 'border-red-400' : 'border-dashed border-[#E0E0E0] dark:border-[#3A3A3A]'
              }`}
            />
            <p className="text-xs text-[#B0B0B0] mt-1.5">Signé pour : <strong className="text-[#696969]">{fullName || '—'}</strong></p>
            {error && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="h-3 w-3 shrink-0" /> {error}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E0E0E0] dark:border-[#2A2A2A] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#E0E0E0] dark:border-[#3A3A3A] text-[#696969] font-semibold text-sm hover:border-red-300 hover:text-red-500 transition-all"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1FAB89] hover:bg-[#15896B] disabled:opacity-60 text-white font-bold text-sm transition-all"
          >
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Génération…</> : 'Confirmer et signer'}
          </button>
        </div>
      </div>
    </div>
  );
}
