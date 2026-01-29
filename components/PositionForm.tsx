"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
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

interface PositionFormProps {
  onValuesChange?: (values: { [key: string]: GridAssetValue }) => void;
}

export function PositionForm({ onValuesChange }: PositionFormProps) {
  const [assetValues, setAssetValues] = useState<{ [key: string]: GridAssetValue }>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const initial: { [key: string]: GridAssetValue } = {};
    ART_ASSETS.forEach((asset) => {
      const key = `${asset.src}-${asset.alt}`;
      initial[key] = {
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
    });
    setAssetValues(initial);
  }, []);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(assetValues);
    }
  }, [assetValues, onValuesChange]);

  const updateValue = (asset: AssetConfig, field: keyof GridAssetValue, value: number) => {
    const assetKey = `${asset.src}-${asset.alt}`;
    setAssetValues(prev => ({
      ...prev,
      [assetKey]: {
        ...prev[assetKey] || {
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
        },
        [field]: value
      }
    }));
  };

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

  return (
    <div className="bg-zinc-900/95 border border-indigo-500/50 rounded-2xl p-4 backdrop-blur-xl shadow-2xl max-w-4xl w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Position Form Editor (Grid-Based)</h3>
        <button
          onClick={exportAllConfiguration}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-emerald-600 transition-all flex items-center gap-2"
        >
          {copiedIndex === -1 ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy All Values</>}
        </button>
      </div>

      <div className="space-y-4">
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
              key={assetKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{asset.alt}</h4>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `row: ${values.rowStart.toFixed(1)}/${values.rowEnd.toFixed(1)}, col: ${values.colStart.toFixed(1)}/${values.colEnd.toFixed(1)}, scale: ${values.scale.toFixed(2)}`,
                      index
                    )
                  }
                  className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Row Start</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="12"
                    value={values.rowStart}
                    onChange={(e) => updateValue(asset, 'rowStart', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Row End</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="12"
                    value={values.rowEnd}
                    onChange={(e) => updateValue(asset, 'rowEnd', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="6.0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Col Start</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="12"
                    value={values.colStart}
                    onChange={(e) => updateValue(asset, 'colStart', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="4.0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Col End</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="12"
                    value={values.colEnd}
                    onChange={(e) => updateValue(asset, 'colEnd', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="8.0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Scale</label>
                  <input
                    type="number"
                    step="0.01"
                    value={values.scale}
                    onChange={(e) => updateValue(asset, 'scale', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="0.65"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Z-Index</label>
                  <input
                    type="number"
                    value={values.zIndex}
                    onChange={(e) => updateValue(asset, 'zIndex', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Parallax X</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={values.parallaxX}
                    onChange={(e) => updateValue(asset, 'parallaxX', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="0.30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Parallax Y</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={values.parallaxY}
                    onChange={(e) => updateValue(asset, 'parallaxY', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="0.25"
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-700">
                <p className="text-xs text-zinc-500 font-mono">
                  Grid: {values.rowStart.toFixed(1)}/{values.rowEnd.toFixed(1)} × {values.colStart.toFixed(1)}/{values.colEnd.toFixed(1)} | Scale: {values.scale.toFixed(2)} | Z: {values.zIndex}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-700">
        <p className="text-xs text-zinc-400 text-center">
          Grid-based positioning: rowStart/rowEnd × colStart/colEnd | Use decimal values for fine-tuning (e.g., 2.004 / 5.84)
        </p>
      </div>
    </div>
  );
}

export default PositionForm;
