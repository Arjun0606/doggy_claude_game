export interface DogFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DogSpriteConfig {
  sprite: string;
  sheetWidth: number;
  sheetHeight: number;
  frames: DogFrame[];
}

type RawSpriteData = Record<string, DogSpriteConfig>;

export const rawDogSpriteData: RawSpriteData = {
  bark: {
    sprite: '/dog-sprites/__alsation_bark.png',
    sheetWidth: 3520,
    sheetHeight: 1226,
    frames: [
      { x: 5, y: 22, width: 699, height: 591 },
      { x: 716, y: 22, width: 692, height: 591 },
      { x: 1442, y: 22, width: 670, height: 591 },
      { x: 2156, y: 22, width: 660, height: 591 },
      { x: 2830, y: 22, width: 690, height: 591 },
      { x: 5, y: 635, width: 699, height: 591 },
      { x: 716, y: 635, width: 692, height: 591 },
      { x: 1442, y: 635, width: 670, height: 591 },
      { x: 2156, y: 635, width: 660, height: 591 },
      { x: 2830, y: 635, width: 690, height: 591 },
    ],
  },
  sleep: {
    sprite: '/dog-sprites/__alsation_die.png',
    sheetWidth: 4100,
    sheetHeight: 637,
    frames: [
      { x: 52, y: 0, width: 700, height: 597 },
      { x: 840, y: 0, width: 767, height: 597 },
      { x: 1643, y: 0, width: 805, height: 597 },
      { x: 2463, y: 0, width: 806, height: 597 },
      { x: 3301, y: 0, width: 765, height: 597 },
    ],
  },
  idle: {
    sprite: '/dog-sprites/__alsation_idle.png',
    sheetWidth: 3520,
    sheetHeight: 2280,
    frames: [
      { x: 5, y: 2, width: 699, height: 567 },
      { x: 709, y: 2, width: 699, height: 567 },
      { x: 1414, y: 2, width: 698, height: 567 },
      { x: 2118, y: 2, width: 698, height: 567 },
      { x: 2821, y: 2, width: 699, height: 567 },
      { x: 5, y: 572, width: 699, height: 567 },
      { x: 709, y: 572, width: 699, height: 567 },
      { x: 1414, y: 572, width: 698, height: 567 },
      { x: 2118, y: 572, width: 698, height: 567 },
      { x: 2821, y: 572, width: 699, height: 567 },
      { x: 5, y: 1142, width: 699, height: 567 },
      { x: 709, y: 1142, width: 699, height: 567 },
      { x: 1414, y: 1142, width: 698, height: 567 },
      { x: 2118, y: 1142, width: 698, height: 567 },
      { x: 2821, y: 1142, width: 699, height: 567 },
      { x: 5, y: 1712, width: 699, height: 567 },
      { x: 709, y: 1712, width: 699, height: 567 },
      { x: 1414, y: 1712, width: 698, height: 567 },
      { x: 2118, y: 1712, width: 698, height: 567 },
      { x: 2821, y: 1712, width: 699, height: 567 },
    ],
  },
  run: {
    sprite: '/dog-sprites/__alsation_run.png',
    sheetWidth: 4310,
    sheetHeight: 1803,
    frames: [
      { x: 9, y: 0, width: 821, height: 579 },
      { x: 871, y: 0, width: 834, height: 579 },
      { x: 1732, y: 0, width: 844, height: 579 },
      { x: 2594, y: 0, width: 845, height: 579 },
      { x: 3456, y: 0, width: 837, height: 579 },
      { x: 9, y: 611, width: 821, height: 589 },
      { x: 871, y: 611, width: 834, height: 589 },
      { x: 1732, y: 611, width: 844, height: 589 },
      { x: 2594, y: 611, width: 845, height: 589 },
      { x: 3456, y: 611, width: 837, height: 589 },
      { x: 9, y: 1205, width: 821, height: 575 },
      { x: 871, y: 1205, width: 834, height: 575 },
      { x: 1732, y: 1205, width: 844, height: 575 },
      { x: 2594, y: 1205, width: 845, height: 575 },
      { x: 3456, y: 1205, width: 837, height: 575 },
    ],
  },
  sit: {
    sprite: '/dog-sprites/__alsation_sit.png',
    sheetWidth: 4030,
    sheetHeight: 629,
    frames: [
      { x: 10, y: 0, width: 700, height: 596 },
      { x: 813, y: 0, width: 753, height: 596 },
      { x: 1624, y: 0, width: 779, height: 596 },
      { x: 2445, y: 0, width: 769, height: 596 },
      { x: 3268, y: 0, width: 737, height: 596 },
    ],
  },
  sitIdle: {
    sprite: '/dog-sprites/__alsation_sit_idle.png',
    sheetWidth: 3755,
    sheetHeight: 2408,
    frames: [
      { x: 9, y: 7, width: 737, height: 549 },
      { x: 760, y: 7, width: 736, height: 549 },
      { x: 1511, y: 7, width: 736, height: 549 },
      { x: 2262, y: 7, width: 736, height: 549 },
      { x: 3013, y: 7, width: 736, height: 549 },
      { x: 9, y: 607, width: 737, height: 551 },
      { x: 760, y: 607, width: 736, height: 551 },
      { x: 1511, y: 607, width: 736, height: 551 },
      { x: 2262, y: 607, width: 736, height: 551 },
      { x: 3013, y: 607, width: 736, height: 551 },
      { x: 9, y: 1208, width: 737, height: 552 },
      { x: 760, y: 1208, width: 736, height: 552 },
      { x: 1511, y: 1208, width: 736, height: 552 },
      { x: 2262, y: 1208, width: 736, height: 552 },
      { x: 3013, y: 1208, width: 736, height: 552 },
      { x: 9, y: 1812, width: 737, height: 550 },
      { x: 760, y: 1812, width: 736, height: 550 },
      { x: 1511, y: 1812, width: 736, height: 550 },
      { x: 2262, y: 1812, width: 736, height: 550 },
      { x: 3013, y: 1812, width: 736, height: 550 },
    ],
  },
  stand: {
    sprite: '/dog-sprites/__alsation_stand.png',
    sheetWidth: 4035,
    sheetHeight: 629,
    frames: [
      { x: 43, y: 0, width: 737, height: 592 },
      { x: 827, y: 0, width: 776, height: 592 },
      { x: 1622, y: 0, width: 773, height: 592 },
      { x: 2427, y: 0, width: 732, height: 592 },
      { x: 3237, y: 0, width: 699, height: 592 },
    ],
  },
  walk: {
    sprite: '/dog-sprites/__alsation_walk.png',
    sheetWidth: 3800,
    sheetHeight: 1740,
    frames: [
      { x: 8, y: 0, width: 713, height: 571 },
      { x: 768, y: 0, width: 695, height: 571 },
      { x: 1528, y: 0, width: 694, height: 571 },
      { x: 2288, y: 0, width: 721, height: 571 },
      { x: 3048, y: 0, width: 747, height: 571 },
      { x: 8, y: 584, width: 713, height: 569 },
      { x: 768, y: 584, width: 695, height: 569 },
      { x: 1528, y: 584, width: 694, height: 569 },
      { x: 2288, y: 584, width: 721, height: 569 },
      { x: 3048, y: 584, width: 747, height: 569 },
      { x: 8, y: 1161, width: 713, height: 576 },
      { x: 768, y: 1161, width: 695, height: 576 },
      { x: 1528, y: 1161, width: 694, height: 576 },
      { x: 2288, y: 1161, width: 721, height: 576 },
      { x: 3048, y: 1161, width: 747, height: 576 },
    ],
  },
};

export type DogAction = keyof typeof rawDogSpriteData;
