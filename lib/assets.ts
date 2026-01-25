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
      top: "30%",
      left: "41%",
      zIndex: 3
    },
    scale: 1.15,
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
      top: "48%",
      left: "10%",
      zIndex: 2
    },
    scale: 0.6,
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
      top: "10%",
      left: "3%",
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
  // Airplane - Right, further and lower than map
  {
    src: "/art/plane.png",
    alt: "Plane",
    width: 300,
    height: 300,
    position: {
      top: "12%",
      left: "75%",
      zIndex: 2
    },
    scale: 0.8,
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
      top: "38%",
      left: "55%",
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
  // Gear Small - Slightly lower and to the right of big gear
  {
    src: "/art/gear.png",
    alt: "Small Gear",
    width: 180,
    height: 180,
    position: {
      top: "47%",
      left: "54%",
      zIndex: 1
    },
    scale: 0.5,
    animation: {
      initialX: 120,
      initialY: 40,
      delay: 0.25,
      direction: 'right',
      parallaxSpeed: 0.18
    }
  }
];
