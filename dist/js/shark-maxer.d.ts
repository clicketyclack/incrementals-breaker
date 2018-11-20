import { SharkGame } from "./sharks";
export declare class SharkMaxer {
    game: SharkGame;
    constructor(game: SharkGame);
    clickButton(buttonId: string): void;
    changeTab(tabId: string): void;
    bulkRecycle(): Promise<void>;
    burnResidue(): Promise<void>;
    doResearch(): Promise<void>;
    shuffleOrder(items: string[]): string[];
    multiClickButton(buttons: string[]): Promise<void>;
    stockProducers(): Promise<void>;
    stockJobs(): Promise<void>;
    stockFrenzy(): Promise<void>;
    stockSafeMachines(): Promise<void>;
    clickSafes(): Promise<void>;
    clickEcoSafes(): Promise<void>;
}
//# sourceMappingURL=shark-maxer.d.ts.map