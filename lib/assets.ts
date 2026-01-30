export interface AssetPosition {
  x: number; // 0-100, horizontal position as percentage
  y: number; // 0-100, vertical position as percentage
}

export interface AssetConfig {
  src: string;
  alt: string;
  position: AssetPosition;
  scale: number;
  zIndexOverride?: number;
  animation: {
    delay: number;
    parallaxSpeedX: number;
    parallaxSpeedY: number;
    breathingAmplitude: {
      x: number;
      y: number;
      scale: number;
    };
  };
  mobile?: {
    position: AssetPosition;
    scale: number;
  };
}

// Desktop assets - positioned using X/Y percentages
export const ART_ASSETS: AssetConfig[] = [
  {
    src: "/art/Me.webp",
    alt: "Me - Clay Figurine",
    position: {
      x: 45,
      y: 20
    },
    scale: 2.4,
    animation: {
      delay: 0,
      parallaxSpeedX: 0.3,
      parallaxSpeedY: 0.25,
      breathingAmplitude: {
        x: 8,
        y: 6,
        scale: 0.004
      }
    }
  },
  {
    src: "/art/Guitar.webp",
    alt: "Guitar",
    position: {
      x: 20,
      y: 25
    },
    scale: 1.9,
    animation: {
      delay: 0.1,
      parallaxSpeedX: 0.35,
      parallaxSpeedY: 0.3,
      breathingAmplitude: {
        x: 6,
        y: 8,
        scale: 0.003
      }
    }
  },
  {
    src: "/art/Map.webp",
    alt: "Map App Icon",
    position: {
      x: 35,
      y: 10
    },
    scale: 1.4,
    animation: {
      delay: 0.15,
      parallaxSpeedX: 0.25,
      parallaxSpeedY: 0.2,
      breathingAmplitude: {
        x: 5,
        y: 5,
        scale: 0.005
      }
    }
  },
  {
    src: "/art/Plane.webp",
    alt: "Plane",
    position: {
      x: 75,
      y: 15
    },
    scale: 1.5,
    animation: {
      delay: 0.05,
      parallaxSpeedX: 0.4,
      parallaxSpeedY: 0.35,
      breathingAmplitude: {
        x: 6,
        y: 5,
        scale: 0.003
      }
    }
  },
  {
    src: "/art/Gear1.webp",
    alt: "Gear",
    position: {
      x: 80,
      y: 55
    },
    scale: 1.6,
    animation: {
      delay: 0.2,
      parallaxSpeedX: 0.2,
      parallaxSpeedY: 0.18,
      breathingAmplitude: {
        x: 5,
        y: 4,
        scale: 0.006
      }
    }
  },
  {
    src: "/art/Gear2.webp",
    alt: "Small Gear",
    position: {
      x: 90,
      y: 65
    },
    scale: 1.0,
    animation: {
      delay: 0.25,
      parallaxSpeedX: 0.18,
      parallaxSpeedY: 0.22,
      breathingAmplitude: {
        x: 5,
        y: 5,
        scale: 0.004
      }
    }
  }
];

// Mobile assets
export const MOBILE_ASSETS: AssetConfig[] = [
  {
    src: "/art/Me.webp",
    alt: "Me - Clay Figurine",
    position: {
      x: 50,
      y: 40
    },
    scale: 1.5,
    animation: {
      delay: 0,
      parallaxSpeedX: 0.15,
      parallaxSpeedY: 0.12,
      breathingAmplitude: {
        x: 2,
        y: 2,
        scale: 0.002
      }
    }
  },
  {
    src: "/art/Guitar.webp",
    alt: "Guitar",
    position: {
      x: 15,
      y: 55
    },
    scale: 1.2,
    animation: {
      delay: 0.1,
      parallaxSpeedX: 0.12,
      parallaxSpeedY: 0.1,
      breathingAmplitude: {
        x: 1.5,
        y: 1.5,
        scale: 0.002
      }
    }
  },
  {
    src: "/art/Map.webp",
    alt: "Map App Icon",
    position: {
      x: 20,
      y: 15
    },
    scale: 1.0,
    animation: {
      delay: 0.15,
      parallaxSpeedX: 0.1,
      parallaxSpeedY: 0.08,
      breathingAmplitude: {
        x: 1.5,
        y: 1.5,
        scale: 0.0015
      }
    }
  },
  {
    src: "/art/Plane.webp",
    alt: "Plane",
    position: {
      x: 80,
      y: 20
    },
    scale: 1.2,
    animation: {
      delay: 0.2,
      parallaxSpeedX: 0.15,
      parallaxSpeedY: 0.12,
      breathingAmplitude: {
        x: 2,
        y: 1.5,
        scale: 0.0015
      }
    }
  },
  {
    src: "/art/Gear1.webp",
    alt: "Gear",
    position: {
      x: 75,
      y: 60
    },
    scale: 1.0,
    animation: {
      delay: 0.25,
      parallaxSpeedX: 0.08,
      parallaxSpeedY: 0.1,
      breathingAmplitude: {
        x: 1.5,
        y: 1,
        scale: 0.002
      }
    }
  },
  {
    src: "/art/Gear2.webp",
    alt: "Small Gear",
    position: {
      x: 85,
      y: 75
    },
    scale: 0.7,
    animation: {
      delay: 0.3,
      parallaxSpeedX: 0.06,
      parallaxSpeedY: 0.08,
      breathingAmplitude: {
        x: 1.5,
        y: 1.5,
        scale: 0.001
      }
    }
  }
];

export const ASSET_CONFIGS = {
  mobile: {
    visible: true,
    assets: MOBILE_ASSETS
  },
  tablet: {
    visible: true,
    assets: ART_ASSETS
  },
  desktop: {
    visible: true,
    assets: ART_ASSETS
  }
};

export const getAssetsForBreakpoint = (breakpoint: 'mobile' | 'tablet' | 'desktop'): AssetConfig[] => {
  return ASSET_CONFIGS[breakpoint].assets;
};

export interface AssetValues {
  x: number;
  y: number;
  scale: number;
  zIndex: number;
  parallaxX: number;
  parallaxY: number;
  breathingX: number;
  breathingY: number;
  breathingScale: number;
}

export function getAssetDefaults(asset: AssetConfig, isMobile: boolean): AssetValues {
  const position = isMobile && asset.mobile ? asset.mobile.position : asset.position;
  const scale = isMobile && asset.mobile ? asset.mobile.scale : asset.scale;

  return {
    x: position.x,
    y: position.y,
    scale,
    zIndex: asset.animation.breathingAmplitude.x > 4 ? 3 : 1,
    parallaxX: asset.animation.parallaxSpeedX,
    parallaxY: asset.animation.parallaxSpeedY,
    breathingX: asset.animation.breathingAmplitude.x,
    breathingY: asset.animation.breathingAmplitude.y,
    breathingScale: asset.animation.breathingAmplitude.scale
  };
}

export function generateAssetConfig(asset: AssetConfig, values: AssetValues): string {
  return `  {
    src: "${asset.src}",
    alt: "${asset.alt}",
    position: {
      x: ${values.x.toFixed(1)},
      y: ${values.y.toFixed(1)}
    },
    scale: ${values.scale.toFixed(2)},
    animation: {
      delay: ${asset.animation.delay},
      parallaxSpeedX: ${values.parallaxX.toFixed(2)},
      parallaxSpeedY: ${values.parallaxY.toFixed(2)},
      breathingAmplitude: {
        x: ${values.breathingX},
        y: ${values.breathingY},
        scale: ${values.breathingScale.toFixed(3)}
      }
    }
  }`;
}

export function exportLayoutConfig(
  assets: AssetConfig[], 
  assetValues: { [key: string]: AssetValues }
): string {
  const config = assets.map((asset) => {
    const assetKey = `${asset.src}-${asset.alt}`;
    const values = assetValues[assetKey] || getAssetDefaults(asset, false);
    return generateAssetConfig(asset, values);
  }).join(",\n");

  return `export const ART_ASSETS: AssetConfig[] = [\n${config}\n];`;
}
