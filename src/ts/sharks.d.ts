export interface SharkGame {
  PlayerResources: PlayerResources;
}

export interface PlayerResources {
  fish: PlayerResource;
  seaApple: PlayerResource;
  sponge: PlayerResource;
  jellyfish: PlayerResource;
  clam: PlayerResource;
  sharkonium: PlayerResource;
  coralglass: PlayerResource;
  delphinium: PlayerResource;
  spronge: PlayerResource;
  sand: PlayerResource;
  crystal: PlayerResource;
  kelp: PlayerResource;
  coral: PlayerResource;
  algae: PlayerResource;
}

export interface PlayerResource {
  amount : number;
  totalAmount : number;

}


export const SharkGame : SharkGame;
