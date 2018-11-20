"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
class SharkMaxer {
    constructor(game) {
        this.game = game;
    }
    clickButton(buttonId) {
        var object = document.getElementById(buttonId);
        if (object) {
            // console.log("Clicking " + buttonId);
            object.click();
        }
        else {
            // console.log("Could not find a button with id " + buttonId);
        }
    }
    changeTab(tabId) {
        var valid_tabs = ["tab-home", "tab-lab", "tab-gate", "tab-lab", "tab-recycler"];
        var found_tabs = valid_tabs.find(x => x == tabId);
        if (!found_tabs || found_tabs.length == 0) {
            console.log("Could not find tab with id " + tabId + " as valid tab.");
            return;
        }
        var object = document.getElementById(tabId);
        if (object) {
            object.click();
        }
    }
    bulkRecycle() {
        return __awaiter(this, void 0, void 0, function* () {
            // Destroy all bulk items in recycler.
            this.changeTab("tab-recycler");
            yield delay(100);
            this.clickButton("buy--1");
            yield delay(10);
            var bulk_items = ["input-fish", "input-sponge", "input-jellyfish", "input-clam", "input-sand", "input-crystal", "input-kelp", "input-coral", "input-algae"];
            this.multiClickButton(bulk_items);
        });
    }
    burnResidue() {
        return __awaiter(this, void 0, void 0, function* () {
            // Consume residue in recycler.
            this.changeTab("tab-recycler");
            yield delay(100);
            this.clickButton("buy--3");
            yield delay(10);
            var bulk_items = ["output-crystalMiner", "output-sandDigger", "output-fishMachine", "output-spongeFarmer", "output-berrySprayer", "output-silentArchivist", "output-tirelessCrafter"];
            bulk_items = this.shuffleOrder(bulk_items);
            console.log('Burning residue in order ' + bulk_items);
            this.multiClickButton(bulk_items);
            yield delay(10);
            yield this.clickButton("buy--1");
            yield delay(10);
        });
    }
    doResearch() {
        return __awaiter(this, void 0, void 0, function* () {
            // Do any research available.
            this.changeTab('tab-lab');
            yield delay(10);
            var time_waited = 0;
            var buttonList = document.getElementById("buttonList");
            while (time_waited < 600 && !buttonList) {
                yield delay(10);
                time_waited += 10;
                var buttonList = document.getElementById("buttonList");
            }
            if (!buttonList || !buttonList.children) {
                console.log("Could not get upgrade list for research, got " + buttonList);
                return;
            }
            for (var i = buttonList.children.length - 1; i > 0; i--) {
                var child = buttonList.children[i];
                console.log("Got research button #" + i + " = " + child + " with ID " + child.id);
                this.clickButton(child.id);
            }
        });
    }
    shuffleOrder(items) {
        for (var i = 0; i < items.length; i++) {
            var x = i;
            var y = Math.floor(Math.random() * Math.floor(items.length));
            var z = Math.floor(Math.random() * Math.floor(items.length));
            var foo = items[x];
            items[x] = items[y];
            items[y] = items[z];
            items[z] = foo;
        }
        return items;
    }
    multiClickButton(buttons) {
        return __awaiter(this, void 0, void 0, function* () {
            for (var buttonId in buttons) {
                this.clickButton(buttons[buttonId]);
                yield delay(10);
            }
        });
    }
    stockProducers() {
        return __awaiter(this, void 0, void 0, function* () {
            // Buy producers. I.e. nurse sharks, eel pits etc.
            this.changeTab("tab-home");
            yield delay(100);
            this.clickButton("buttonTab-all");
            yield delay(10);
            this.clickButton("buy--3");
            yield delay(10);
            var buttons = ["getMaker",
                "getBrood",
                "getNurse",
                "getBerrier",
                "getBiologist", "getPit"];
            buttons = this.shuffleOrder(buttons);
            console.log('Button order is now ' + buttons);
            this.multiClickButton(buttons);
        });
    }
    stockJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            // Buy jobs. I.e. planter crabs etc.
            this.changeTab("tab-home");
            yield delay(100);
            this.clickButton("buttonTab-all");
            yield delay(10);
            this.clickButton("buy--3");
            yield delay(10);
            var buttons = ["getDiver", "getScientist",
                "getLaser",
                "getPlanter", "getHarvester", "getTechnician", "getSifter", "getTransmuter", "getExplorer", "getCollector", "getScavenger", "getPhilosopher", "getTreasurer"];
            buttons = this.shuffleOrder(buttons);
            console.log('Button order is now ' + buttons);
            this.multiClickButton(buttons);
        });
    }
    stockFrenzy() {
        return __awaiter(this, void 0, void 0, function* () {
            // Buy jobs. I.e. planter crabs etc.
            this.changeTab("tab-home");
            yield delay(100);
            this.clickButton("buttonTab-all");
            yield delay(10);
            this.clickButton("buy--3");
            yield delay(10);
            var buttons = ["getShark", "getManta", "getCrab", "getDolphin", "getWhale", "getEel", "getChimaera", "getLobster", "getOctopus"];
            this.multiClickButton(buttons);
        });
    }
    stockSafeMachines() {
        return __awaiter(this, void 0, void 0, function* () {
            /// Stock safe machines. I.e. machines which do not do any conversions.
            this.changeTab("tab-home");
            yield delay(100);
            this.clickButton("buttonTab-all");
            yield delay(10);
            this.clickButton("buy--3");
            yield delay(10);
            var buttons = ["getCrystalMiner", "getSandDigger", "getFishMachine", "getSilentArchivist", "getBerrySprayer", "getSpongeFarmer"];
            this.multiClickButton(buttons);
        });
    }
    clickSafes() {
        return __awaiter(this, void 0, void 0, function* () {
            // Safe buttons are any buttons which do not create any negative asset drain.
            // Example: Any type of conversion item is not safe.
            ;
            yield this.doResearch();
            yield this.stockProducers();
            yield this.stockSafeMachines();
            yield this.stockJobs();
            yield this.stockFrenzy();
            yield this.bulkRecycle();
            yield this.burnResidue();
        });
    }
    clickEcoSafes() {
        return __awaiter(this, void 0, void 0, function* () {
            // Safe buttons, but none which generate tar.
            yield this.doResearch();
            yield this.stockProducers();
            yield this.stockSafeMachines();
            yield this.stockJobs();
            yield this.stockFrenzy();
            // bulkRecycle(); Tar!
            yield this.burnResidue();
        });
    }
}
exports.SharkMaxer = SharkMaxer;
// var sm = new SharkMaxer(SharkGame) ; sm.clickSafes();
