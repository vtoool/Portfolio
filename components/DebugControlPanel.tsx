"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Settings, ChevronDown, Monitor, Smartphone, Terminal } from "lucide-react";
import { getAssetsForBreakpoint, AssetConfig, AssetValues, getAssetDefaults } from "@/lib/assets";
import { useViewport } from "@/hooks/useViewport";

interface DebugControlPanelProps {
  onValuesChange: (values: { [key: string]: AssetValues }) => void;
}

const DebugControlPanel: React.FC<DebugControlPanelProps> = ({ onValuesChange }) => {
  const { breakpoint } = useViewport();
  const [isExpanded, setIsExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  const [assetValues, setAssetValues] = useState<{ [key: string]: AssetValues }>({});
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const assets = getAssetsForBreakpoint(viewMode === 'mobile' ? 'mobile' : 'desktop');

  const initializeValues = useCallback(() => {
    const initial: { [key: string]: AssetValues } = {};

    assets.forEach((asset) => {
      const key = `${asset.src}-${asset.alt}`;
      initial[key] = getAssetDefaults(asset, viewMode === 'mobile');
    });

    setAssetValues(initial);
    onValuesChange(initial);
  }, [assets, viewMode, onValuesChange]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      initializeValues();
    }
  }, [mounted, initializeValues]);

  useEffect(() => {
    setViewMode(breakpoint === 'mobile' ? 'mobile' : 'desktop');
  }, [breakpoint]);

  const updateValue = useCallback((assetKey: string, field: keyof AssetValues, value: number) => {
    const newValues = {
      ...assetValues,
      [assetKey]: {
        ...assetValues[assetKey],
        [field]: value
      }
    };
    setAssetValues(newValues);
    onValuesChange(newValues);
  }, [assetValues, onValuesChange]);

  const handleLogToConsole = useCallback(() => {
    console.log('\n========== ASSET CONFIGURATION ==========');
    console.log(`Mode: ${viewMode.toUpperCase()}`);
    console.log('=========================================\n');

    console.log(`export const ${viewMode.toUpperCase()}_ASSETS: AssetConfig[] = [`);
    assets.forEach((asset) => {
      const key = `${asset.src}-${asset.alt}`;
      const values = assetValues[key];
      if (values) {
        console.log(`  {`);
        console.log(`    src: "${asset.src}",`);
        console.log(`    alt: "${asset.alt}",`);
        console.log(`    position: {`);
        console.log(`      x: ${values.x.toFixed(1)},`);
        console.log(`      y: ${values.y.toFixed(1)}`);
        console.log(`    },`);
        console.log(`    scale: ${values.scale.toFixed(2)},`);
        console.log(`    animation: {`);
        console.log(`      delay: ${asset.animation.delay},`);
        console.log(`      parallaxSpeedX: ${values.parallaxX.toFixed(2)},`);
        console.log(`      parallaxSpeedY: ${values.parallaxY.toFixed(2)},`);
        console.log(`      breathingAmplitude: {`);
        console.log(`        x: ${values.breathingX},`);
        console.log(`        y: ${values.breathingY},`);
        console.log(`        scale: ${values.breathingScale.toFixed(3)}`);
        console.log(`      }`);
        console.log(`    }`);
        console.log(`  },`);
      }
    });
    console.log(`];`);

    console.log('\n=========================================');
    console.log('Values logged to console!');
    console.log('=========================================\n');

    alert('Configuration logged to console! Press F12 to view.');
  }, [assets, assetValues, viewMode]);

  const getAssetName = useCallback((key: string) => {
    return key.split('-').slice(1).join('-').replace(/\.webp$/, '');
  }, []);

  const formatPosition = useCallback((values: AssetValues) => {
    return `X:${values.x.toFixed(0)}% Y:${values.y.toFixed(0)}%`;
  }, []);

  if (!mounted) {
    return null;
  }

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

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {assets.map((asset) => {
          const key = `${asset.src}-${asset.alt}`;
          const values = assetValues[key] || getAssetDefaults(asset, viewMode === 'mobile');
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
                <span className="text-xs text-zinc-500">{formatPosition(values)}</span>
              </button>

              {isSelected && (
                <div className="mt-2 p-3 bg-zinc-800/50 rounded-lg space-y-4">
                  {/* Position Controls */}
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Position</div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">X (Left/Right)</span>
                        <span className="text-indigo-400">{values.x.toFixed(1)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={values.x}
                        onChange={(e) => updateValue(key, 'x', parseFloat(e.target.value))}
                        className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">Y (Up/Down)</span>
                        <span className="text-indigo-400">{values.y.toFixed(1)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={values.y}
                        onChange={(e) => updateValue(key, 'y', parseFloat(e.target.value))}
                        className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full"
                      />
                    </div>
                  </div>

                  {/* Size Control */}
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Size</div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">Scale</span>
                        <span className="text-indigo-400">{values.scale.toFixed(2)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.01"
                        value={values.scale}
                        onChange={(e) => updateValue(key, 'scale', parseFloat(e.target.value))}
                        className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

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
