export interface GridPosition {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

export interface AssetConfig {
  src: string;
  alt: string;
  position: GridPosition;
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
    position: GridPosition;
    scale: number;
  };
}

export const ART_ASSETS: AssetConfig[] = [
  {
    src: "/art/Me.webp",
    alt: "Me - Clay Figurine",
    position: {
      rowStart: 0.5,
      rowEnd: 3.0,
      colStart: 5,
      colEnd: 9
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
      rowStart: 0.8,
      rowEnd: 3.0,
      colStart: 2.5,
      colEnd: 5
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
      rowStart: 0.2,
      rowEnd: 2.0,
      colStart: 4,
      colEnd: 6
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
      rowStart: 0.2,
      rowEnd: 2.0,
      colStart: 8.5,
      colEnd: 11
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
      rowStart: 2.0,
      rowEnd: 3.8,
      colStart: 9,
      colEnd: 11.5
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
      rowStart: 2.5,
      rowEnd: 3.8,
      colStart: 10.5,
      colEnd: 12
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

export const MOBILE_ASSETS: AssetConfig[] = [
  {
    src: "/art/Me.webp",
    alt: "Me - Clay Figurine",
    position: {
      rowStart: 1.2,
      rowEnd: 3.2,
      colStart: 1.8,
      colEnd: 3.8
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
      rowStart: 1.8,
      rowEnd: 3.5,
      colStart: 0.3,
      colEnd: 1.8
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
      rowStart: 0.5,
      rowEnd: 1.8,
      colStart: 0.5,
      colEnd: 1.8
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
      rowStart: 0.3,
      rowEnd: 1.6,
      colStart: 3.3,
      colEnd: 4.6
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
      rowStart: 2.0,
      rowEnd: 3.5,
      colStart: 3.5,
      colEnd: 4.7
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
      rowStart: 2.8,
      rowEnd: 3.8,
      colStart: 4,
      colEnd: 4.8
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

export function generateGridAssetConfig(asset: AssetConfig, values: {
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
}): string {
  return `  {
    src: "${asset.src}",
    alt: "${asset.alt}",
    position: {
      rowStart: ${values.rowStart.toFixed(2)},
      rowEnd: ${values.rowEnd.toFixed(2)},
      colStart: ${values.colStart.toFixed(2)},
      colEnd: ${values.colEnd.toFixed(2)}
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

export function exportGridLayoutConfig(assets: AssetConfig[], assetValues: { [key: string]: {
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
} }): string {
  const config = assets.map((asset) => {
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
    return generateGridAssetConfig(asset, values);
  }).join(",\n");

  return `export const ART_ASSETS: AssetConfig[] = [\n${config}\n];`;
}
