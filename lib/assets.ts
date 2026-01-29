export interface AssetConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: {
    top: string;
    left: string;
    zIndex: number;
  };
  scale: number;
  animation: {
    initialX: number;
    initialY: number;
    delay: number;
    direction: 'up' | 'down' | 'left' | 'right' | 'center' | 'bottom';
    parallaxSpeed: number;
  };
}

export const ART_ASSETS: AssetConfig[] = [
  {
    src: "/art/Me.webp",
    alt: "Me - Clay Figurine",
    width: 400,
    height: 400,
    position: {
      top: "25%",
      left: "-20%",
      zIndex: 3
    },
    scale: 1.3,
    animation: {
      initialX: 80,
      initialY: -50,
      delay: 0,
      direction: 'left',
      parallaxSpeed: 0.3
    }
  },
  {
    src: "/art/Guitar.webp",
    alt: "Guitar",
    width: 350,
    height: 350,
    position: {
      top: "36%",
      left: "-43%",
      zIndex: 1
    },
    scale: 0.65,
    animation: {
      initialX: -100,
      initialY: 60,
      delay: 0.1,
      direction: 'left',
      parallaxSpeed: 0.35
    }
  },
  {
    src: "/art/Map.webp",
    alt: "Map App Icon",
    width: 280,
    height: 280,
    position: {
      top: "17%",
      left: "-30%",
      zIndex: 2
    },
    scale: 0.6,
    animation: {
      initialX: -120,
      initialY: -50,
      delay: 0.15,
      direction: 'left',
      parallaxSpeed: 0.25
    }
  },
  {
    src: "/art/Plane.webp",
    alt: "Plane",
    width: 300,
    height: 300,
    position: {
      top: "15%",
      left: "25%",
      zIndex: 2
    },
    scale: 0.52,
    animation: {
      initialX: 150,
      initialY: 80,
      delay: 0.05,
      direction: 'right',
      parallaxSpeed: 0.4
    }
  },
  {
    src: "/art/Gear1.webp",
    alt: "Gear",
    width: 220,
    height: 220,
    position: {
      top: "45%",
      left: "35%",
      zIndex: 1
    },
    scale: 0.65,
    animation: {
      initialX: 100,
      initialY: -30,
      delay: 0.2,
      direction: 'right',
      parallaxSpeed: 0.2
    }
  },
  {
    src: "/art/Gear2.webp",
    alt: "Small Gear",
    width: 180,
    height: 180,
    position: {
      top: "42.6%",
      left: "48%",
      zIndex: 1
    },
    scale: 0.55,
    animation: {
      initialX: 120,
      initialY: 40,
      delay: 0.25,
      direction: 'right',
      parallaxSpeed: 0.18
    }
  }
];

export function generateAssetConfig(asset: AssetConfig, values: { top: string; left: string; scale: number; zIndex: number }): string {
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
}

export function exportLayoutConfig(assets: AssetConfig[], assetValues: { [key: string]: { top: string; left: string; scale: number; zIndex: number } }): string {
  const config = assets.map((asset) => {
    // Create unique key using src and alt
    const assetKey = `${asset.src}-${asset.alt}`;
    const values = assetValues[assetKey] || {
      top: asset.position.top,
      left: asset.position.left,
      scale: asset.scale,
      zIndex: asset.position.zIndex
    };
    return generateAssetConfig(asset, values);
  }).join(",\n");

  return `export const ART_ASSETS: AssetConfig[] = [\n${config}\n];`;
}

// Responsive asset configurations for different breakpoints
export const ASSET_CONFIGS = {
  mobile: {
    visible: true,
    assets: [
      // Me - in headline area
      {
        src: "/art/Me.webp",
        alt: "Me - Clay Figurine",
        width: 100,
        height: 100,
        position: {
          top: "20%",
          left: "78%",
          zIndex: 60
        },
        scale: 0.7,
        animation: {
          initialX: 0,
          initialY: 0,
          delay: 0,
          direction: 'right' as const,
          parallaxSpeed: 0.04
        }
      },
      // Map - small accent above headline
      {
        src: "/art/Map.webp",
        alt: "Map App Icon",
        width: 32,
        height: 32,
        position: {
          top: "18%",
          left: "25%",
          zIndex: 55
        },
        scale: 1.0,
        animation: {
          initialX: 0,
          initialY: -10,
          delay: 0.1,
          direction: 'up' as const,
          parallaxSpeed: 0.05
        }
      },
      // Plane - top right
      {
        src: "/art/Plane.webp",
        alt: "Plane",
        width: 36,
        height: 36,
        position: {
          top: "22%",
          left: "80%",
          zIndex: 55
        },
        scale: 1.0,
        animation: {
          initialX: 15,
          initialY: -15,
          delay: 0.15,
          direction: 'right' as const,
          parallaxSpeed: 0.08
        }
      },
      // Guitar - below text card
      {
        src: "/art/Guitar.webp",
        alt: "Guitar",
        width: 50,
        height: 50,
        position: {
          top: "55%",
          left: "3%",
          zIndex: 55
        },
        scale: 0.5,
        animation: {
          initialX: -5,
          initialY: 3,
          delay: 0.2,
          direction: 'left' as const,
          parallaxSpeed: 0.06
        }
      },
      // Gear1 - near CTA button
      {
        src: "/art/Gear1.webp",
        alt: "Gear",
        width: 32,
        height: 32,
        position: {
          top: "75%",
          left: "85%",
          zIndex: 55
        },
        scale: 1.0,
        animation: {
          initialX: 10,
          initialY: 10,
          delay: 0.25,
          direction: 'right' as const,
          parallaxSpeed: 0.06
        }
      },
      // Gear2 - small accent bottom left
      {
        src: "/art/Gear2.webp",
        alt: "Small Gear",
        width: 24,
        height: 24,
        position: {
          top: "78%",
          left: "8%",
          zIndex: 55
        },
        scale: 1.0,
        animation: {
          initialX: -10,
          initialY: 10,
          delay: 0.3,
          direction: 'left' as const,
          parallaxSpeed: 0.04
        }
      }
    ]
  },
   tablet: {
     visible: true,
     assets: [
       {
         src: "/art/Me.webp",
         alt: "Me - Clay Figurine",
         width: 320,
         height: 320,
         position: {
           top: "25%",
           left: "-5%",
           zIndex: 3
         },
         scale: 1.0,
         animation: {
           initialX: 80,
           initialY: -50,
           delay: 0,
           direction: 'left' as const,
           parallaxSpeed: 0.3
         }
       },
      {
        src: "/art/Guitar.webp",
        alt: "Guitar",
        width: 280,
        height: 280,
        position: {
          top: "36%",
          left: "-20%",
          zIndex: 1
        },
        scale: 0.6,
        animation: {
          initialX: -100,
          initialY: 60,
          delay: 0.1,
          direction: 'left' as const,
          parallaxSpeed: 0.35
        }
      },
      {
        src: "/art/Map.webp",
        alt: "Map App Icon",
        width: 240,
        height: 240,
        position: {
          top: "17%",
          left: "-10%",
          zIndex: 2
        },
        scale: 0.55,
        animation: {
          initialX: -120,
          initialY: -50,
          delay: 0.15,
          direction: 'left' as const,
          parallaxSpeed: 0.25
        }
      },
      {
        src: "/art/Plane.webp",
        alt: "Plane",
        width: 250,
        height: 250,
        position: {
          top: "15%",
          left: "25%",
          zIndex: 2
        },
        scale: 0.5,
        animation: {
          initialX: 150,
          initialY: 80,
          delay: 0.05,
          direction: 'right' as const,
          parallaxSpeed: 0.4
        }
      },
      {
        src: "/art/Gear1.webp",
        alt: "Gear",
        width: 180,
        height: 180,
        position: {
          top: "45%",
          left: "35%",
          zIndex: 1
        },
        scale: 0.6,
        animation: {
          initialX: 100,
          initialY: -30,
          delay: 0.2,
          direction: 'right' as const,
          parallaxSpeed: 0.2
        }
      },
      {
        src: "/art/Gear2.webp",
        alt: "Small Gear",
        width: 150,
        height: 150,
        position: {
          top: "42.6%",
          left: "48%",
          zIndex: 1
        },
        scale: 0.5,
        animation: {
          initialX: 120,
          initialY: 40,
          delay: 0.25,
          direction: 'right' as const,
          parallaxSpeed: 0.18
        }
      }
    ]
  },
  desktop: {
    visible: true,
    assets: ART_ASSETS
  }
};

export const getAssetsForBreakpoint = (breakpoint: 'mobile' | 'tablet' | 'desktop'): AssetConfig[] => {
  return ASSET_CONFIGS[breakpoint].assets;
};
