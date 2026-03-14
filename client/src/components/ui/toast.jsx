import { useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

let toastCounter = 0;
let globalAddToast = null;

export function useToast() {
  const toast = useCallback((opts) => {
    if (globalAddToast) globalAddToast(opts);
  }, []);
  return { toast };
}

export function ToastProvider() {
  const [toasts, setToasts] = useState([]);

  globalAddToast = (opts) => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, ...opts }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), opts.duration || 4000);
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-cyan-500" />,
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-start gap-3 pointer-events-auto min-w-[300px] max-w-sm",
            "bg-card border border-border rounded-2xl p-4 shadow-xl",
            "animate-in slide-in-from-right duration-300"
          )}
        >
          {icons[t.type || "info"]}
          <div className="flex-1 min-w-0">
            {t.title && <p className="text-sm font-semibold">{t.title}</p>}
            {t.description && <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>}
          </div>
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
