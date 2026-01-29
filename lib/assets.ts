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
      top: "136%",
      left: "49%",
      zIndex: 3
    },
    scale: 1.25,
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
      top: "247%",
      left: "-75%",
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
      top: "107%",
      left: "-10%",
      zIndex: 2
    },
    scale: 0.5,
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
      top: "71%",
      left: "227%",
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
      top: "334%",
      left: "244%",
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
      top: "312%",
      left: "295%",
      zIndex: 1
    },
    scale: 0.65,
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
      // Me - Clay Figurine
      {
        src: "/art/Me.webp",
        alt: "Me - Clay Figurine",
        width: 250,
        height: 250,
        position: {
          top: "-54px",
          left: "30%",
          zIndex: 10
        },
        scale: 1,
        animation: {
          initialX: 0,
          initialY: 0,
          delay: 0,
          direction: 'center' as const,
          parallaxSpeed: 0.05
        }
      },
      // Map App Icon
      {
        src: "/art/Map.webp",
        alt: "Map App Icon",
        width: 90,
        height: 90,
        position: {
          top: "-6px",
          left: "43%",
          zIndex: 5
        },
        scale: 0.9,
        animation: {
          initialX: 0,
          initialY: -3,
          delay: 0.1,
          direction: 'up' as const,
          parallaxSpeed: 0.04
        }
      },
      // Plane
      {
        src: "/art/Plane.webp",
        alt: "Plane",
        width: 95,
        height: 95,
        position: {
          top: "-12px",
          left: "192%",
          zIndex: 5
        },
        scale: 1.1,
        animation: {
          initialX: 3,
          initialY: -4,
          delay: 0.15,
          direction: 'right' as const,
          parallaxSpeed: 0.06
        }
      },
      // Guitar
      {
        src: "/art/Guitar.webp",
        alt: "Guitar",
        width: 110,
        height: 110,
        position: {
          top: "59px",
          left: "30%",
          zIndex: 5
        },
        scale: 1,
        animation: {
          initialX: -4,
          initialY: 2,
          delay: 0.2,
          direction: 'left' as const,
          parallaxSpeed: 0.08
        }
      },
      // Gear
      {
        src: "/art/Gear1.webp",
        alt: "Gear",
        width: 70,
        height: 70,
        position: {
          top: "118px",
          left: "179%",
          zIndex: 5
        },
        scale: 1.1,
        animation: {
          initialX: 4,
          initialY: 2,
          delay: 0.25,
          direction: 'right' as const,
          parallaxSpeed: 0.06
        }
      },
      // Small Gear
      {
        src: "/art/Gear2.webp",
        alt: "Small Gear",
        width: 60,
        height: 60,
        position: {
          top: "101px",
          left: "202%",
          zIndex: 6
        },
        scale: 1,
        animation: {
          initialX: 3,
          initialY: 3,
          delay: 0.3,
          direction: 'right' as const,
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
