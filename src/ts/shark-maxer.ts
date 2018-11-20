import { SharkGame, PlayerResource } from "./sharks";


async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export class SharkMaxer {
  game : SharkGame;

  constructor(game : SharkGame) {
    this.game = game;
  }

  clickButton(buttonId : string) {
      var object = document.getElementById(buttonId);
      if (object) {
          // console.log("Clicking " + buttonId);
          object.click();
      } else {
        // console.log("Could not find a button with id " + buttonId);
      }
  }

  changeTab(tabId : string) {
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

  async bulkRecycle() {
    // Destroy all bulk items in recycler.
    this.changeTab("tab-recycler");
    await delay(100);
    this.clickButton("buy--1");
    await delay(10);
    var bulk_items = ["input-fish", "input-sponge", "input-jellyfish", "input-clam", "input-sand", "input-crystal", "input-kelp", "input-coral", "input-algae"];
    this.multiClickButton(bulk_items);

  }

  async burnResidue() {
    // Consume residue in recycler.
    this.changeTab("tab-recycler");
    await delay(100);
    this.clickButton("buy--3");
    await delay(10);
    var bulk_items = [ "output-crystalMiner", "output-sandDigger", "output-fishMachine", "output-spongeFarmer", "output-berrySprayer", "output-silentArchivist", "output-tirelessCrafter"];
    bulk_items = this.shuffleOrder(bulk_items);
    console.log('Burning residue in order ' + bulk_items);
    this.multiClickButton(bulk_items);

    await delay(10);
    await this.clickButton("buy--1");
    await delay(10);
  }

  async doResearch() {
    // Do any research available.
    this.changeTab('tab-lab');
    await delay(10);

    var time_waited = 0;
    var buttonList = document.getElementById("buttonList");
    while (time_waited < 600 && !buttonList) {
      await delay(10);
      time_waited += 10;
      var buttonList = document.getElementById("buttonList");
    }

    if (!buttonList || !buttonList.children) {
      console.log("Could not get upgrade list for research, got " + buttonList);
      return;
    }

    for (var i = buttonList.children.length - 1 ; i > 0 ; i--) {
      var child = buttonList.children[i];
      console.log("Got research button #" + i + " = " + child + " with ID " + child.id);
      this.clickButton(child.id);
    }
  }

  shuffleOrder(items : string[]) {
    for (var i = 0 ; i < items.length ; i++) {
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


  async multiClickButton(buttons : string[]) {
    for(var buttonId in buttons) {
      this.clickButton(buttons[buttonId]);
      await delay(10);
    }
  }

  async stockProducers() {
    // Buy producers. I.e. nurse sharks, eel pits etc.
    this.changeTab("tab-home");
    await delay(100);
    this.clickButton("buttonTab-all");
    await delay(10);
    this.clickButton("buy--3");
    await delay(10);

    var buttons : string[] = ["getMaker",
                  "getBrood",
                  "getNurse" ,
                  "getBerrier",
                  "getBiologist", "getPit" ];
    buttons = this.shuffleOrder(buttons);
    console.log('Button order is now ' + buttons);
    this.multiClickButton(buttons);

  }

  async stockJobs() {
    // Buy jobs. I.e. planter crabs etc.
    this.changeTab("tab-home");
    await delay(100);
    this.clickButton("buttonTab-all");
    await delay(10);
    this.clickButton("buy--3");
    await delay(10);

    var buttons : string[] = ["getDiver", "getScientist",
                  "getLaser",
                  "getPlanter", "getHarvester", "getTechnician", "getSifter", "getTransmuter", "getExplorer", "getCollector", "getScavenger", "getPhilosopher", "getTreasurer" ];
    buttons = this.shuffleOrder(buttons);
    console.log('Button order is now ' + buttons);
    this.multiClickButton(buttons);

  }

  async stockFrenzy() {
    // Buy jobs. I.e. planter crabs etc.
    this.changeTab("tab-home");
    await delay(100);
    this.clickButton("buttonTab-all");
    await delay(10);
    this.clickButton("buy--3");
    await delay(10);

    var buttons : string[] = ["getShark", "getManta", "getCrab", "getDolphin", "getWhale", "getEel", "getChimaera", "getLobster", "getOctopus" ];
    this.multiClickButton(buttons);


  }

  async stockSafeMachines() {
    /// Stock safe machines. I.e. machines which do not do any conversions.
    this.changeTab("tab-home");
    await delay(100);
    this.clickButton("buttonTab-all");
    await delay(10);
    this.clickButton("buy--3");
    await delay(10);

    var buttons : string[] = ["getCrystalMiner", "getSandDigger", "getFishMachine", "getSilentArchivist", "getBerrySprayer", "getSpongeFarmer"];
    this.multiClickButton(buttons);

  }

  async clickSafes() {
    // Safe buttons are any buttons which do not create any negative asset drain.
    // Example: Any type of conversion item is not safe.
    ;
    await this.doResearch();
    await this.stockProducers();
    await this.stockSafeMachines();
    await this.stockJobs();
    await this.stockFrenzy();
    await this.bulkRecycle();
    await this.burnResidue();
  }

  async clickEcoSafes() {
    // Safe buttons, but none which generate tar.
    await this.doResearch();
    await this.stockProducers();
    await this.stockSafeMachines();
    await this.stockJobs();
    await this.stockFrenzy();
    // bulkRecycle(); Tar!
    await this.burnResidue();

  }
}

// var sm = new SharkMaxer(SharkGame) ; sm.clickSafes();
