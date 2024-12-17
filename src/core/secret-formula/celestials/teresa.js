export const teresa = {
  unlocks: {
    run: {
      id: 0,
      price: 1e14,
      description: () => `Unlock Teresa's ${player.options.naming.celestial?Teresa.RealityName:"Reality"}.`,
      onUnlock: () => Teresa.quotes.unlockReality.show(),
    },
    epGen: {
      id: 1,
      price: 1e18,
      description: "Unlock passive Eternity Point generation.",
      isDisabledInDoomed: true
    },
    shop: {
      id: 2,
      price: 1e21,
      description: "Unlock Teresa's Perk Shop.",
    },
    effarig: {
      id: 3,
      price: 1e24,
      description: "Unlock Effarig, Celestial of Ancient Relics.",
      onUnlock: () => Teresa.quotes.effarig.show(),
    },
    undo: {
      id: 4,
      price: 1e10,
      description: "Unlock \"Undo\" of equipping a Glyph.",
      isDisabledInDoomed: true
    },
    startEU: {
      id: 5,
      price: 1e6,
      description: "You start Reality with all Eternity Upgrades unlocked.",
      isDisabledInDoomed: true,
      onUnlock: () => {
        for (const id of [1, 2, 3, 4, 5, 6]) player.eternityUpgrades.add(id);
      },
    }
  }
};
