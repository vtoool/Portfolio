"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { ART_ASSETS } from "@/lib/assets";

interface AssetValue {
  top: string;
  left: string;
  scale: number;
  zIndex: number;
}

interface PositionFormProps {
  onValuesChange?: (values: { [key: string]: AssetValue }) => void;
}

export function PositionForm({ onValuesChange }: PositionFormProps) {
  const [assetValues, setAssetValues] = useState<{ [key: string]: AssetValue }>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(assetValues);
    }
  }, [assetValues, onValuesChange]);

  const updateValue = (asset: any, field: keyof AssetValue, value: string | number) => {
    // Create unique key using src and alt to handle duplicate src values
    const assetKey = `${asset.src}-${asset.alt}`;
    setAssetValues(prev => ({
      ...prev,
      [assetKey]: {
        ...prev[assetKey] || {
          top: asset.position.top,
          left: asset.position.left,
          scale: asset.scale,
          zIndex: asset.position.zIndex
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
    const config = ART_ASSETS.map((asset, index) => {
      const assetKey = `${asset.src}-${asset.alt}`;
      const values = assetValues[assetKey] || {
        top: asset.position.top,
        left: asset.position.left,
        scale: asset.scale,
        zIndex: asset.position.zIndex
      };

      return `  {
    src: "${asset.src}",
    alt: "${asset.alt}",
    width: ${asset.width},
    height: ${asset.height},
    position: {
      top: "${values.top}",
      left: "${values.left}",
      zIndex: ${values.zIndex}
    },
    scale: ${values.scale},
    animation: {
      initialX: ${asset.animation.initialX},
      initialY: ${asset.animation.initialY},
      delay: ${asset.animation.delay},
      direction: '${asset.animation.direction}',
      parallaxSpeed: ${asset.animation.parallaxSpeed}
    }
  }`;
    }).join(",\n");

    const fullConfig = `export const ART_ASSETS: AssetConfig[] = [\n${config}\n];`;
    copyToClipboard(fullConfig, -1);
  };

  return (
    <div className="bg-zinc-900/95 border border-indigo-500/50 rounded-2xl p-4 backdrop-blur-xl shadow-2xl max-w-4xl w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Position Form Editor</h3>
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
            top: asset.position.top,
            left: asset.position.left,
            scale: asset.scale,
            zIndex: asset.position.zIndex
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
                      `top: "${values.top}", left: "${values.left}", scale: ${values.scale}`,
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
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Top (%)</label>
                  <input
                    type="text"
                    value={values.top}
                    onChange={(e) => updateValue(asset, 'top', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="25%"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Left (%)</label>
                  <input
                    type="text"
                    value={values.left}
                    onChange={(e) => updateValue(asset, 'left', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="40%"
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
                    placeholder="1.0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Z-Index</label>
                  <input
                    type="number"
                    value={values.zIndex}
                    onChange={(e) => updateValue(asset, 'zIndex', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-700">
                <p className="text-xs text-zinc-500 font-mono">
                  Current: top: {values.top}, left: {values.left}, scale: {values.scale}, zIndex: {values.zIndex}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-700">
        <p className="text-xs text-zinc-400 text-center">
          💡 Tip: Adjust values and see changes instantly. Copy values when satisfied!
        </p>
      </div>
    </div>
  );
}

export default PositionForm;
