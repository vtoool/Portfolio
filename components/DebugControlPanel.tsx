"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Settings, ChevronUp, ChevronDown, Monitor, Smartphone, Terminal } from "lucide-react";
import { getAssetsForBreakpoint, AssetConfig } from "@/lib/assets";
import { useViewport } from "@/hooks/useViewport";

interface DebugAssetValue {
  top: number;
  left: number;
  scale: number;
  zIndex: number;
}

interface DebugControlPanelProps {
  onValuesChange: (values: { [key: string]: DebugAssetValue }) => void;
}

const DebugControlPanel: React.FC<DebugControlPanelProps> = ({ onValuesChange }) => {
  const { breakpoint } = useViewport();
  const [isExpanded, setIsExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [assetValues, setAssetValues] = useState<{ [key: string]: DebugAssetValue }>({});
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const assets = getAssetsForBreakpoint(viewMode === 'mobile' ? 'mobile' : 'desktop');

  const initializeValues = useCallback(() => {
    const initial: { [key: string]: DebugAssetValue } = {};
    assets.forEach((asset) => {
      const key = `${asset.src}-${asset.alt}`;
      const topValue = asset.position.top.includes('%')
        ? parseFloat(asset.position.top.replace('%', ''))
        : parseFloat(asset.position.top.replace('px', ''));
      const leftValue = parseFloat(asset.position.left.replace('%', '').replace('px', ''));

      initial[key] = {
        top: isNaN(topValue) ? 0 : topValue,
        left: isNaN(leftValue) ? 0 : leftValue,
        scale: asset.scale,
        zIndex: asset.position.zIndex
      };
    });
    setAssetValues(initial);
    onValuesChange(initial);
  }, [assets, onValuesChange]);

  useEffect(() => {
    initializeValues();
  }, [initializeValues]);

  useEffect(() => {
    setViewMode(breakpoint === 'mobile' ? 'mobile' : 'desktop');
  }, [breakpoint]);

  const updateValue = (assetKey: string, field: keyof DebugAssetValue, value: number) => {
    const newValues = {
      ...assetValues,
      [assetKey]: {
        ...assetValues[assetKey],
        [field]: value
      }
    };
    setAssetValues(newValues);
    onValuesChange(newValues);
  };

  const handleLogToConsole = () => {
    const configOutput: { [key: string]: { top: string; left: string; scale: number; zIndex: number } } = {};

    Object.entries(assetValues).forEach(([key, values]) => {
      const asset = assets.find((a) => `${a.src}-${a.alt}` === key);
      if (asset) {
        const isPixelValue = asset.position.top.includes('px');
        const topValue = isPixelValue ? `${values.top}px` : `${values.top}%`;
        const leftValue = asset.position.left.includes('%') ? `${values.left}%` : `${values.left}px`;

        configOutput[key] = {
          top: topValue,
          left: leftValue,
          scale: values.scale,
          zIndex: values.zIndex
        };
      }
    });

    console.log('\n========== ASSET CONFIGURATION ==========');
    console.log(`Mode: ${viewMode.toUpperCase()}`);
    console.log('=========================================\n');

    if (viewMode === 'mobile') {
      console.log('// Copy this to ASSET_CONFIGS.mobile.assets in lib/assets.ts');
      console.log('');
      assets.forEach((asset) => {
        const key = `${asset.src}-${asset.alt}`;
        const values = configOutput[key];
        if (values) {
          console.log(`  // ${asset.alt}`);
          console.log(`  {
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
      direction: '${asset.animation.direction}' as const,
      parallaxSpeed: ${asset.animation.parallaxSpeed}
    }
  },`);
        }
      });
    } else {
      console.log('// Copy this to ART_ASSETS in lib/assets.ts (desktop)');
      console.log('');
      assets.forEach((asset) => {
        const key = `${asset.src}-${asset.alt}`;
        const values = configOutput[key];
        if (values) {
          console.log(`  {
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
      direction: '${asset.animation.direction}' as const,
      parallaxSpeed: ${asset.animation.parallaxSpeed}
    }
  },`);
        }
      });
    }

    console.log('\n=========================================');
    console.log('Values logged to console. Copy the output above!');
    console.log('=========================================\n');

    alert('Configuration logged to console! Press F12 to view.');
  };

  const getAssetName = (key: string) => {
    return key.split('-').slice(1).join('-').replace(/\.webp$/, '');
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-4 right-4 z-[99999] flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all font-medium"
      >
        <Settings className="w-5 h-5" />
        <span>Edit Layout</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[99999] w-80 max-h-[70vh] bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/80 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-white">Debug Layout</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogToConsole}
            className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
            title="Log to Console"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <ChevronDown className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-1 p-3 border-b border-zinc-700">
        <button
          onClick={() => {
            setViewMode('mobile');
            setSelectedAsset(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'mobile'
              ? 'bg-indigo-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          Mobile
        </button>
        <button
          onClick={() => {
            setViewMode('desktop');
            setSelectedAsset(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'desktop'
              ? 'bg-indigo-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          <Monitor className="w-4 h-4" />
          Desktop
        </button>
      </div>

      {/* Asset List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {assets.map((asset) => {
          const key = `${asset.src}-${asset.alt}`;
          const values = assetValues[key] || { top: 0, left: 0, scale: 1, zIndex: 1 };
          const isSelected = selectedAsset === key;

          return (
            <div key={key}>
              <button
                onClick={() => setSelectedAsset(isSelected ? null : key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                  isSelected
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                    : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                <span className="truncate">{getAssetName(key)}</span>
                <span className="text-xs text-zinc-500">
                  {values.top.toFixed(0)}%, {values.left.toFixed(0)}%
                </span>
              </button>

              {isSelected && (
                <div className="mt-2 p-3 bg-zinc-800/50 rounded-lg space-y-3">
                  {/* Top */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Top</span>
                      <span className="text-indigo-400">{values.top.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="1"
                      value={values.top}
                      onChange={(e) => updateValue(key, 'top', parseFloat(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full"
                    />
                  </div>

                  {/* Left */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Left</span>
                      <span className="text-indigo-400">{values.left.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="1"
                      value={values.left}
                      onChange={(e) => updateValue(key, 'left', parseFloat(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full"
                    />
                  </div>

                  {/* Scale */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Scale</span>
                      <span className="text-indigo-400">{values.scale.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.05"
                      value={values.scale}
                      onChange={(e) => updateValue(key, 'scale', parseFloat(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full"
                    />
                  </div>

                  {/* Z-Index */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Z-Index</span>
                      <span className="text-indigo-400">{values.zIndex}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={values.zIndex}
                      onChange={(e) => updateValue(key, 'zIndex', parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-700 bg-zinc-800/50">
        <button
          onClick={handleLogToConsole}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
        >
          <Terminal className="w-4 h-4" />
          Log Config to Console
        </button>
      </div>
    </div>
  );
};

export default DebugControlPanel;
