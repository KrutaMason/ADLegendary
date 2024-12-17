export const vQuotes = {
  initial: {
    id: 0,
    lines: [
      { text: `How pathetic...`,
        //image: "v_initial.png"
      },
    ],
  },
  unlock: {
    id: 1,
    lines: [
      {
        text: `Welcome to my Reality!`,
        //image: "v_greet_0.png"
      }, {
        text: `I am surprised you could reach it. <br> This is my realm after all...`,
        //image: "v_greet_1.png"
      }, {
        text: `Not everyone is as great as me.`,
        //image: "v_greet_2.png"
      },
    ],
  },
  realityEnter: {
    id: 2,
    lines: [
      {
        text: "Good luck with that! You will need it. My reality is flawless. You will fail.",
        //image: "v_greet_1.png"
      },
    ],
  },
  realityComplete: {
    id: 3,
    lines: [
      {
        text: "So fast...",
        //image: "v_fast.png"
      }, {
        text: "Do not think so much of yourself. This is just the beginning. You will never be better than me.",
        //image: "v_greet_1.png"
      },
    ],
  },
  achievement1: {
    id: 4,
    requirement: () => V.spaceTheorems >= 1,
    lines: [
      {
        text: "Only one? Pathetic. Your accomplishments pale in comparison to mine.",
        //image: "v_one.png"
      },
    ],
  },
  achievement6: {
    id: 5,
    requirement: () => V.spaceTheorems >= 6,
    lines: [
      { text: "This is nothing! Do not be so full of yourself.",
        //image: "v_initial.png"
      },
    ],
  },
  hex1: {
    id: 6,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 1,
    lines: [
      { text: "Do not think it will get any easier from now on. You are awfully proud for such a little achievement.",
        //image: "v_initial.png"
      }, 
    ],
  },
  achievement12: {
    id: 7,
    requirement: () => V.spaceTheorems >= 12,
    lines: [
      {
        text: "How did you...",
        //image: "v_initial.png"
      }, {
        text: "This barely amounts to anything!",
        //image: "v_anger_1.png"
      }, {
        text: "You may keep those awards...",
        //image: "v_anger_2.png"
      }, {
        text: "But you will never complete them all!",
        //image: "v_anger_3.png"
      },
    ],
  },
  achievement24: {
    id: 8,
    requirement: () => V.spaceTheorems >= 24,
    lines: [
      { text: "Impossible... After how difficult it was for me...",
        //image: "v_realise_0.png"
      },
    ],
  },
  hex3: {
    id: 9,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 3,
    lines: [
      { text: "No... No... No... This cannot be...",
        //image: "v_realise_1.png"
      },
    ],
  },
  allAchievements: {
    id: 10,
    requirement: () => V.spaceTheorems >= 36,
    lines: [
      { 
        text: "I... how did you do it... I worked so hard to get them...",
        //image: "v_defeat_0.png"
      }, { 
        text: "I am the greatest!",
        //image: "v_defeat_1.png"
      }, { 
        text: "No one... no one... no on-",
        //image: "v_defeat_2.png"
      }, { 
        text: "",
        showCelestialName: false,
        //image: "v_defeat_3.png"
      },
    ],
  }
};
