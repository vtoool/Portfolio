"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X } from "lucide-react";
import { ART_ASSETS, AssetConfig, exportGridLayoutConfig } from "@/lib/assets";

interface GridAssetValue {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
  scale: number;
  zIndex: number;
  parallaxX: number;
  parallaxY: number;
  breathingX: number;
  breathingY: number;
  breathingScale: number;
}

interface LayoutModePanelProps {
  isVisible: boolean;
  onClose: () => void;
  assetValues: {
    [key: string]: GridAssetValue;
  };
}

export function LayoutModePanel({ isVisible, onClose, assetValues }: LayoutModePanelProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const exportAllConfiguration = () => {
    const fullConfig = exportGridLayoutConfig(ART_ASSETS, assetValues);
    copyToClipboard(fullConfig, -1);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-6 right-6 z-[9999] bg-zinc-900/95 border border-indigo-500/50 rounded-2xl p-6 backdrop-blur-xl shadow-2xl max-w-md w-[90%]"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Layout Mode</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-zinc-400 mb-2">
            Drag assets to move • Resize via corner handles
          </p>
          <p className="text-xs text-zinc-500">
            Values update in real-time • Use grid coordinates
          </p>
        </div>

        <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
          {ART_ASSETS.map((asset, index) => {
            const assetKey = `${asset.src}-${asset.alt}`;
            const values = assetValues[assetKey] || {
              rowStart: asset.position.rowStart,
              rowEnd: asset.position.rowEnd,
              colStart: asset.position.colStart,
              colEnd: asset.position.colEnd,
              scale: asset.scale,
              zIndex: asset.animation.breathingAmplitude.x > 4 ? 3 : 1,
              parallaxX: asset.animation.parallaxSpeedX,
              parallaxY: asset.animation.parallaxSpeedY,
              breathingX: asset.animation.breathingAmplitude.x,
              breathingY: asset.animation.breathingAmplitude.y,
              breathingScale: asset.animation.breathingAmplitude.scale
            };

            return (
              <motion.div
                key={asset.src}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">
                    {asset.alt}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `row: ${values.rowStart.toFixed(1)}/${values.rowEnd.toFixed(1)}, col: ${values.colStart.toFixed(1)}/${values.colEnd.toFixed(1)}, scale: ${values.scale.toFixed(2)}`,
                        index
                      )
                    }
                    className="p-1 hover:bg-zinc-700 rounded transition-colors"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-zinc-500">Row:</span>
                    <span className="text-white ml-1 font-mono">{values.rowStart.toFixed(1)}-{values.rowEnd.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Col:</span>
                    <span className="text-white ml-1 font-mono">{values.colStart.toFixed(1)}-{values.colEnd.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Scale:</span>
                    <span className="text-white ml-1 font-mono">{values.scale.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Z-Index:</span>
                    <span className="text-white ml-1 font-mono">{values.zIndex}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportAllConfiguration}
          className="w-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-xl hover:from-indigo-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
        >
          {copiedIndex === -1 ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Full Configuration
            </>
          )}
        </motion.button>

        <div className="mt-3 pt-3 border-t border-zinc-700">
          <p className="text-xs text-zinc-500 text-center">
            Remove <span className="font-mono bg-zinc-800 px-1">?layoutMode=true</span> to exit
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LayoutModePanel;
