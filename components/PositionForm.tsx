"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { ART_ASSETS, AssetConfig, AssetValues, getAssetDefaults, exportLayoutConfig } from "@/lib/assets";

interface PositionFormProps {
  onValuesChange?: (values: { [key: string]: AssetValues }) => void;
}

export function PositionForm({ onValuesChange }: PositionFormProps) {
  const [assetValues, setAssetValues] = useState<{ [key: string]: AssetValues }>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const initial: { [key: string]: AssetValues } = {};
    ART_ASSETS.forEach((asset) => {
      const key = `${asset.src}-${asset.alt}`;
      initial[key] = getAssetDefaults(asset, false);
    });
    setAssetValues(initial);
  }, []);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(assetValues);
    }
  }, [assetValues, onValuesChange]);

  const updateValue = (asset: AssetConfig, field: keyof AssetValues, value: number) => {
    const assetKey = `${asset.src}-${asset.alt}`;
    setAssetValues(prev => ({
      ...prev,
      [assetKey]: {
        ...(prev[assetKey] || getAssetDefaults(asset, false)),
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
    const fullConfig = exportLayoutConfig(ART_ASSETS, assetValues);
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
          const values = assetValues[assetKey] || getAssetDefaults(asset, false);

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
                      `x: ${values.x.toFixed(1)}, y: ${values.y.toFixed(1)}, scale: ${values.scale.toFixed(2)}`,
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
                  <label className="block text-xs font-medium text-zinc-400 mb-1">X Position (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={values.x}
                    onChange={(e) => updateValue(asset, 'x', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="45.0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Y Position (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={values.y}
                    onChange={(e) => updateValue(asset, 'y', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="20.0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Scale</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={values.scale}
                    onChange={(e) => updateValue(asset, 'scale', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="2.4"
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

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Breathing X</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    value={values.breathingX}
                    onChange={(e) => updateValue(asset, 'breathingX', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="8"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Breathing Y</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    value={values.breathingY}
                    onChange={(e) => updateValue(asset, 'breathingY', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="6"
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-700">
                <p className="text-xs text-zinc-500 font-mono">
                  X: {values.x.toFixed(1)}% | Y: {values.y.toFixed(1)}% | Scale: {values.scale.toFixed(2)} | Z: {values.zIndex}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-700">
        <p className="text-xs text-zinc-400 text-center">
          X/Y positioning as percentage (0-100) | Adjust values for fine-tuning asset positions
        </p>
      </div>
    </div>
  );
}

export default PositionForm;
