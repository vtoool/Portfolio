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
  // Me - Center, biggest, focal point
  {
    src: "/art/Me.png",
    alt: "Me - Clay Figurine",
    width: 400,
    height: 400,
    position: {
      top: "25%",
      left: "38%",
      zIndex: 3
    },
    scale: 1.5,
    animation: {
      initialX: 80,
      initialY: -50,
      delay: 0,
      direction: 'left',
      parallaxSpeed: 0.3
    }
  },
  // Guitar - Center left, slightly lower
  {
    src: "/art/guitar.png",
    alt: "Guitar",
    width: 350,
    height: 350,
    position: {
      top: "40%",
      left: "15%",
      zIndex: 2
    },
    scale: 0.55,
    animation: {
      initialX: -100,
      initialY: 60,
      delay: 0.1,
      direction: 'left',
      parallaxSpeed: 0.35
    }
  },
  // Map - Left of Me
  {
    src: "/art/map.png",
    alt: "Map App Icon",
    width: 280,
    height: 280,
    position: {
      top: "15%",
      left: "10%",
      zIndex: 2
    },
    scale: 0.65,
    animation: {
      initialX: -120,
      initialY: -50,
      delay: 0.15,
      direction: 'left',
      parallaxSpeed: 0.25
    }
  },
  // Airplane - Right, further and lower than map
  {
    src: "/art/plane.png",
    alt: "Plane",
    width: 300,
    height: 300,
    position: {
      top: "18%",
      left: "70%",
      zIndex: 2
    },
    scale: 0.85,
    animation: {
      initialX: 150,
      initialY: 80,
      delay: 0.05,
      direction: 'right',
      parallaxSpeed: 0.4
    }
  },
  // Gear Big - Right of middle of Me
  {
    src: "/art/gear.png",
    alt: "Gear",
    width: 220,
    height: 220,
    position: {
      top: "35%",
      left: "65%",
      zIndex: 1
    },
    scale: 0.7,
    animation: {
      initialX: 100,
      initialY: -30,
      delay: 0.2,
      direction: 'right',
      parallaxSpeed: 0.2
    }
  },
  // Gear Small - Slightly lower and to the right of big gear
  {
    src: "/art/gear.png",
    alt: "Small Gear",
    width: 180,
    height: 180,
    position: {
      top: "45%",
      left: "63%",
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
