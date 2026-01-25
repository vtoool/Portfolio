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
    src: "/art/Me.png",
    alt: "Me - Clay Figurine",
    width: 400,
    height: 400,
    position: {
      top: "15%",
      left: "55%",
      zIndex: 3
    },
    scale: 1.2,
    animation: {
      initialX: 100,
      initialY: -50,
      delay: 0,
      direction: 'left',
      parallaxSpeed: 0.3
    }
  },
  {
    src: "/art/plane.png",
    alt: "Plane",
    width: 300,
    height: 300,
    position: {
      top: "5%",
      left: "70%",
      zIndex: 2
    },
    scale: 1.0,
    animation: {
      initialX: 150,
      initialY: 0,
      delay: 0.05,
      direction: 'right',
      parallaxSpeed: 0.4
    }
  },
  {
    src: "/art/guitar.png",
    alt: "Guitar",
    width: 350,
    height: 350,
    position: {
      top: "50%",
      left: "75%",
      zIndex: 2
    },
    scale: 1.0,
    animation: {
      initialX: 120,
      initialY: 100,
      delay: 0.1,
      direction: 'bottom',
      parallaxSpeed: 0.35
    }
  },
  {
    src: "/art/map.png",
    alt: "Map App Icon",
    width: 280,
    height: 280,
    position: {
      top: "35%",
      left: "65%",
      zIndex: 1
    },
    scale: 0.9,
    animation: {
      initialX: 0,
      initialY: -120,
      delay: 0.15,
      direction: 'up',
      parallaxSpeed: 0.25
    }
  },
  {
    src: "/art/gear.png",
    alt: "Gear",
    width: 220,
    height: 220,
    position: {
      top: "60%",
      left: "62%",
      zIndex: 1
    },
    scale: 0.8,
    animation: {
      initialX: -100,
      initialY: 80,
      delay: 0.2,
      direction: 'left',
      parallaxSpeed: 0.2
    }
  }
];
