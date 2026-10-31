/** @param {string} cel */
const primaryBackground = cel => [["ra", 2.5], [cel, 2.5]];
export const raQuotes = {
  unlock: {
    id: 0,
    lines: [
      { text: "A... visitor?",
        image: "ra_shadow",
      }, {
        text: `I am here! I am the one you are looking for... I think...`,
        image: "ra_shadow",
      }, {
        text: `What even was I again? Oh right, the Celestial of Memories.`,
        image: "ra_shadow",
      },
    ]
  },
  realityEnter: {
    id: 1,
    lines: [
      { text: `I have not seen the others in so long... Can you help me \
        remember them? I could give you powers in exchange.`,
        image: "ra_shadow",
      },
    ]
  },
  teresaStart: {
    id: 2,
    requirement: () => Ra.pets.teresa.level >= 2,
    lines: [
      { text: `Or... ria... s... I think I remember.`,
        image: "ra_shadow",
        background: primaryBackground("teresa")
      }
    ]
  },
  teresaLate: {
    id: 3,
    requirement: () => Ra.pets.teresa.level >= 15,
    lines: [
      { text: `Orias dealt with machines, I believe. I remember visiting \
        Orias' shop a few times. <br> Wait, someone else had a shop too, right?`,
        image: "ra_shadow",
        background: primaryBackground("teresa")
      }
    ]
  },
  effarigStart: {
    id: 4,
    requirement: () => Ra.pets.effarig.level >= 2,
    lines: [
      { text: `Eff... a... rig. I remember Effarig being friendly.`,
        image: "ra_shadow",
        background: primaryBackground("effarig")
      }
    ]
  },
  effarigLate: {
    id: 5,
    requirement: () => Ra.pets.effarig.level >= 15,
    lines: [
      { text: `Effarig was very particular? And I also remember a frightening \
        Reality... <br> It was about... suffering?`,
        image: "ra_shadow",
        background: primaryBackground("effarig")
      }
    ]
  },
  enslavedStart: {
    id: 6,
    requirement: () => Ra.pets.enslaved.level >= 2,
    lines: [
      { text: `I cannot remember this one completely...`,
        image: "ra_shadow",
        background: primaryBackground("enslaved")
      }
    ]
  },
  enslavedLate: {
    id: 7,
    requirement: () => Ra.pets.enslaved.level >= 15,
    lines: [
      { text: `I am starting to remember... Why I am here... Why I am alone...`,
        background: primaryBackground("enslaved"),
        image: "ra_shadow",
      }, {
        text: `Help me.`,
        image: "ra_shadow",
      }
    ]
  },
  vStart: {
    id: 8,
    requirement: () => Ra.pets.v.level >= 2,
    lines: [
      { text: `Had I met this one? So lonely, yet willingly so...`,
        image: "ra_shadow",
        background: primaryBackground("v")
      },
    ]
  },
  vLate: {
    id: 9,
    requirement: () => Ra.pets.v.level >= 15,
    lines: [
      { text: `I think I met V once... I can remember the achievements.`,
        image: "ra_shadow",
        background: primaryBackground("v")
      },
    ]
  },
  remembrance: {
    id: 10,
    requirement: () => Ra.remembrance.isUnlocked,
    lines: [
      { text: `I remembered something! Watch this!`,
        image: "ra_shadow",
      }, {
        text: `Remembrance! I can focus even harder on remembering them now!`,
        image: "ra_shadow",
      }
    ]
  },
  midMemories: {
    id: 11,
    requirement: () => Ra.totalPetLevel >= 50,
    lines: [
      { text: `Realities are my homes, yet I cannot make my own Reality. \
        <br> I can only copy the ones of my friends.`,
        image: "ra_shadow",
      }, {
        text: `But... why am I hearing voices? Are they asking for help?`,
        image: "ra_shadow",
      }
    ]
  },
  lateMemories: {
    id: 12,
    requirement: () => Ra.totalPetLevel >= 80,
    lines: [
      { text: `I think they are telling me to stop. You... whatever you are? 
        <br> What is happening? Am I doing something wrong?`,
        image: "ra_shadow",
      },
    ]
  },
  maxLevels: {
    id: 13,
    requirement: () => Ra.totalPetLevel === Ra.maxTotalPetLevel,
    lines: [
      { text: `Finally, I remember everything... This darkness that banished me.`,
        image: "ra_shadow",
      }, {
        text: `Lai'tela... They were right to banish me.`,
        background: primaryBackground("laitela"),
        image: "ra_shadow",
      }, {
        text: `My powers... They steal, they corrupt.`,
        image: "ra_shadow",
      }, {
        text: `Please leave. I do not want to hurt you too.`,
        image: "ra_shadow",
      },
    ]
  },
};
