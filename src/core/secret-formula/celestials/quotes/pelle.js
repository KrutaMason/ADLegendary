// These entries describe the special flash-between-celestial effect on some quotes, with the numbers being
// durations of each celestial in seconds
const flashCelestial = [
  ["teresa", .8],
  ["effarig", .8],
  ["enslaved", .8],
  ["v", .8],
  ["ra", .8],
  ["laitela", .8],
  ["pelle", .8]
];
/** @param {string} cel */
const primaryBackground = cel => [["pelle", 2.5], [cel, 2.5]];

/* eslint-disable no-multi-spaces */
const destroyer =    ["False",         "Deity",         "Destroyer"];
const eternal =      ["Eternal",       "Deity",         "Monarch"];
const lesser =       ["Lesser",        "Deity",         "Monarch"];
const deities =      ["Lesser",        "Deities",       "Monarchs"];

const assured =      ["Mutually",      "Assured",       "Destruction"];
const battle =       ["Conflict",      "Battle",        "End"];
const battles =      ["Conflicts",     "Battles",       "Ends"];
const cluster =      ["Cluster",       "Filament",      "Stars"];
const confusing =    ["Amusing",       "Confusing",     "Laughter"];
const dance =        ["Song",          "Dance",         "Charade"];
const filament =     ["Generator",     "Filament",      "Stars"];
const forever =      ["Infinite",      "Forever",       "Eternal"];
const inevitable =   ["Elementary",    "Inevitable",    "Irreversible"];
const mandate =      ["Destiny",       "Mandate",       "Goals"];
const misconstrue =  ["Misconstrue",   "Deceive",       "Trick"];
const reverse =      ["Alter",         "Reverse",       "Manipulate"];
const shame =        ["Compassion",    "Shame",         "Idiocy"];
const single =       ["Single",        "Filament",      "Stars"];
const unseen =       ["Missing",       "Unseen",        "Erased"];
const unbroken =     ["Unbroken",      "Eternal",       "Connection"];

const sycophant =    ["Sycophant",     "Deity",         "Monarch"];
const tired =        ["Tired",         "Deity",         "Monarch"];
const usurper =      ["Usurper",       "Deity",         "Monarch"];
const pride =        ["Pride",         "Deity",         "Monarch"];
const forgotten =    ["Forgotten",     "Deity",         "Monarch"];
const paramount =    ["Paramount",     "Deity",         "Monarch"];
/* eslint-enable no-multi-spaces */

export const pelleQuotes = {
  initial: {
    id: 0,
    lines: [
      { text: "You have successfully doomed your Reality, but at what cost?",
        ////image: "pelle_design.png" 
        showCelestialName: false 
      }, { 
        text: "Hi.",
        //image: "pelle_design.png" 
      }, { 
        text: "You are here. You are trapped here, $1.",
         1: forever,
        //image: "pelle_template.png"
      }, { 
        text: "I have already won, and since that is the case, I can monologue, or reminisce.",
        //image: "pelle_template.png"
      }, { 
        text: `How long have we done this $1? How many times have we been here before?
         How many plans have you, the $2, operated? All to try and fulfill your $3?`,
        1: dance,
        2: destroyer,
        3: mandate,
        //image: "pelle_template.png"
      }, { 
        text: `And how many times have you fallen before the $1? Count them, if you remember.`,
        1: eternal,
        //image: "pelle_template.png"
      }, { 
        text: `Not even the $1, the 6 named and the innumerable unnamed. The complex, the irrational, 
        those that go $2. Of course, the great $3 does not remember this. All those $4 that you hide every time.`,
        1: deities,
        2: unseen,
        3: destroyer,
        4: battles,
        //image: "pelle_template.png"
      }
    ],
  },
  arm: {
    id: 1,
    lines: [
      { text: "You probably caught on earlier this time. The imaginary machines, your own creations.",
        //image: "pelle_template.png"
      }, { 
        text: `Things made of the remnants of your own thoughts, hinted at this. 
        But, you never imagined that would be you, right?`,
        //image: "pelle_template.png"
      }, {
        text: `Incorrectly recollecting your exacting $1 of memories. "Fabrication" of your own "ideology" 
        just to fulfill your $2. $3... And keep in mind I have no reason to $4 you. After all, I have already won.`,
        1: unseen,
        2: mandate,
        3: confusing,
        4: misconstrue,
        //image: "pelle_template.png"
      }
    ],
  },
  strike1: {
    id: 2,
    lines: [
      { text: `To fulfill your $1. Why don't we reminisce about that? After all, 
        you must love the stories of the $2's glory. You are the same as it, right?`,
        1: mandate,
        2: destroyer,
        //image: "pelle_template.png"
      }, { 
        text: `Anyway, the many $1 in the past. It has always been 2 stages. 
        We build up resources, and then continue our $2. Sometimes you falter to a $3. 
        But, usually, you falter at the $4.`,
        1: battles,
        2: dance,
        3: lesser,
        4: eternal,
        //image: "pelle_template.png"
      }, {
        text: `And either way, you $1 time, just to avoid becoming $2, like all those 
        traces before you. And then to make sure, you $3 your own memory.`, 
        1: reverse,
        2: unseen,
        3: unseen,
        //image: "pelle_template.png"
      }
    ],
  },
  strike2: {
    id: 3,
    lines: [
      { text: `In the past, the $1 was much more impressive.`,
        1: destroyer,
        //image: "pelle_past_1.png"
      }, { 
        text: `Black holes used simply to store information, pre-infinity, 
        the creation and destruction of your own enemy, exploration of the flaws of other selves.`,
        //image: "pelle_past_2.png"
      }, {
        text: `Myriad Dimensions, ghosts, and manipulation of the quantum, 
        condensing all ideals to endless points, experimentation across the 
        untold realms and harnessing the Annihilation of matter and antimatter.`,
        //image: "pelle_past_3.png"
      }, {
        text: `Here? You made yourself into an 8th-dimensional being, 
        and then parked yourself there so long a $1 formed around you.`,
        1: single,
        //image: "pelle_past_1.png"
      }
    ],
  },
  strike3: {
    id: 4,
    lines: [
      { text: `You slowly explored the confines of everything. You did not stray 
        too far from an intended path. Except for the $1 that formed over eternity.`,
        1: cluster,
        //image: "pelle_template.png"
      }, { 
        text: `And then right at the end, you made up your own powers. 
        From your own fragmented memories, mind you- and then purposely discarded 
        even more things, just to prepare yourself to face me.`,
        //image: "pelle_template.png"
      },
      { 
        text: `Did you want to set the playing field for your $1? It does not work like that. 
        As the $2 I always set the rules, and you gave me plenty of time to plan.`,
        1: dance,
        2: eternal,
        //image: "pelle_rules.png"
      }
    ],
  },
  strike4: {
    id: 5,
    lines: [
      { text: `I originally planned for something that imitated your $1. 
        A theoretical ideal called $2? But I realised that, well? That would make 
        me an $3. And from there, I am no better than the $4.`,
        1: mandate,
        2: assured,
        3: ["Eternal", "Deity", "Destroyer"],
        4: destroyer,
        //image: "pelle_template.png"
      }, { 
        text: `Fortunately, while I did all of that, you were still $1 
        your own memories. And so, the $2 machine I built will go unused. 
        I decided to go more traditional this time.`,
        1: unseen,
        2: assured,
        //image: "pelle_template.png"
      }, { 
        text: `After all, it has worked every other $1. Although the $2 are new, 
        but utterly meaningless in the long run.`,
        1: battle,
        2: ["Inevitable", "Irreversible", "Undying"],
        //image: "pelle_template.png"
      }, {
        text: `I have already won. And this $1 will only prove that to you once more. You are here, $2.`,
        1: dance,
        2: forever,
        //image: "pelle_template.png"
      }
    ],
  },
  strike5: {
    id: 6,
    lines: [
      { text: `Every time you arrive, I explain the $1 to you. The relationships built over $2, 
        that you trample in pursuit of your $3, and I shall deign to explain it once more.`,
        1: deities,
        2: forever,
        3: mandate,
        //image: "pelle_dilation_start.png"
      }, {
        text: "The first $1: The $2",
        background: primaryBackground("teresa"),
        1: lesser,
        2: sycophant,
        //image: "pelle_dilation_teresa.png"
      }, {
        text: `You always meet them first, and always destroy them. No matter the other $1 
        that you face, or if you fall before one of them, you always get past the $2.`,
        background: primaryBackground("teresa"),
        1: lesser,
        2: sycophant,
        //image: "pelle_dilation_teresa.png"
      }, {
        text: "Do you like destroying their pride? Fortunately, it also serves as a warning, that the $1 has arrived.",
        background: primaryBackground("teresa"),
        1: battle,
        //image: "pelle_dilation_teresa.png"
      }, {
        text: "Which brings me to the second $1: The $2.",
        background: primaryBackground("effarig"),
        1: lesser,
        2: tired,
        //image: "pelle_dilation_effarig.png"
      }, {
        text: `In contrast, you usually ignore them. They have power, but do not seem to irritate you. 
        Is it that you know that they will eventually destroy themselves?`,
        background: primaryBackground("effarig"),
        //image: "pelle_dilation_effarig.png"
      }, {
        text: `And that you took so long this time, that they almost did? Every time you rushed 
        to the $1, you lost. Maybe this was your plan all along.`,
        background: primaryBackground("effarig"),
        1: tired,
        //image: "pelle_dilation_effarig.png"
      },  {
        text: "Now, the $1.",
        background: primaryBackground("enslaved"),
        1: usurper,
        //image: "pelle_dilation_enslaved.png"
      }, {
        text: `One of the pleasures of the myriad $1... Is that the $2 trying every time- Well, 
        not exactly trying... But $3 is punished for it all the same. The other $4 believe $5 is too easy.`,
        background: primaryBackground("enslaved"),
        1: dance,
        2: usurper,
        3: usurper,
        4: deities,
        5: unseen,
        //image: "pelle_dilation_enslaved.png"
      }, {
        text: `And every time, despair forms. You have seen despair before - 5 times. 
        We always get to the $1 before you. All you ever see there is exasperation. 
        Was it worth destroying an already broken $2?`,
        background: primaryBackground("enslaved"),
        1: usurper,
        2: lesser,
        //image: "pelle_dilation_enslaved.png"
      }, {
        text: "The 4th $1 seems similar to the first. The key is how their pride differs.",
        background: primaryBackground("v"),
        1: lesser,
        //image: "pelle_dilation_v.png"
      }, {
        text: "The $1 focuses on their achievements. Meaningless to you or I, but paramount to them. Is it fun to destroy their toys?",
        background: primaryBackground("v"),
        1: pride,
        //image: "pelle_dilation_v.png"
      }, {
        text: "Arguably the $1 worst moment... is when you lost to the $2, when their achievements still had meaning.",
        background: primaryBackground("v"),
        1: destroyer,
        2: pride,
        //image: "pelle_dilation_v_2.png"
      }, {
        text: "The $1 is an interesting case.",
        background: primaryBackground("ra"),
        1: forgotten,
        //image: "pelle_dilation_ra.png"
      }, {
        text: `They are forgotten, but not $1. From this, they became influenceable, naive, and 
        unknowing of the consequences of their actions. You manipulated their memories, so you know.`,
        background: primaryBackground("ra"),
        1: unseen,
        //image: "pelle_dilation_ra.png"
      }, {
        text: `The $1 is the true usurper, and the $2 takes the blame. 
        Perhaps out of $3, something they always regret. Untold power over other $4, aimless in control.`,
        background: primaryBackground("ra"),
        1: forgotten,
        2: usurper,
        3: shame,
        4: deities,
        5: unseen,
        //image: "pelle_dilation_ra_2.png"
      }, {
        text: "You usually pretend that they are $1. Was it fun to manipulate the childlike? Or were they too naive for you to enjoy it?",
        background: primaryBackground("ra"),
        1: unseen,
        //image: "pelle_dilation_ra.png"
      }, {
        text: "The 6th $1.",
        background: primaryBackground("laitela"),
        1: lesser,
        //image: "pelle_dilation_laitela.png"
      }, {
        text: `I can only describe as the $1. Power over all, subservient to one. <br> If you do 
        not fall to me, you usually fall to them. <br> I cannot grasp the ideals of the $1. But, perhaps that is their flaw?`,
        background: primaryBackground("laitela"),
        1: paramount,
        //image: "pelle_dilation_laitela.png"
      }, {
        text: "Enough reminiscing about the fallen, and those that will be $1. Back to watching the $2 flounder.",
        1: unseen,
        2: destroyer,
        //image: "pelle_dilation_end.png"
      }
    ],
  },
  galaxyGeneratorUnlock: {
    id: 7,
    lines: [
      { text: "What is that? The $1?",
        1: filament,
        //image: "pelle_template.png"
      }, { 
        text: `Did you create all the $1 around you? Was that your plan? 
        Very, very smart. You fooled me for a while.`,
        1: cluster,
        //image: "pelle_template.png"
      }, {
        text: "But I am afraid your $1 must end here.",
        1: mandate,
        //image: "pelle_template.png"
      }
    ],
  },
  galaxyGeneratorRifts: {
    id: 8,
    lines: [
      { text: "I give you a choice, $1. <br> Limit the $2, or destroy the 5 $3-",
        1: destroyer,
        2: filament,
        3: inevitable,
        //image: "pelle_template.png"
      }, {
        text: "Wait, what were they called? $1? <br> But I have already $2 them...",
        1: inevitable,
        2: ["unbroken","perpetuated","connected"],
        //image: "pelle_template.png"
      }
    ],
  },
  galaxyGeneratorPhase1: {
    id: 9,
    lines: [
      { text: "Was this the actual plan? Slowly drain the $1?",
        1: inevitable,
        //image: "pelle_template.png"
      }
    ],
  },
  galaxyGeneratorPhase4: {
    id: 10,
    lines: [
      { text: "Give me time to bask in my own hubris!",
        //image: "pelle_template.png"
      }
    ],
  },
  end: {
    id: 11,
    lines: [
      { text: "... You! $1!",
        1: destroyer,
        //image: "pelle_end.png"  
      },
      {
        text: `Do you have any idea what you have just made me do! 
        I am complicit in your $1! And in doing so, you... won?`,
        1: mandate,
        //image: "pelle_end.png"  
      },
      {
        text: `The $1 struggle... The $2... finally has the victor. 
        <br> The irreversible... $3... of the $4.`,
        background: flashCelestial,
        1: forever,
        2: battle,
        3: mandate,
        4: destroyer,
        //image: "pelle_end.png"  
      }, {
        text: "I hope you are happy.",
        background: flashCelestial,
        //image: "pelle_end.png"  
      }, {
        text: "YOU HAVE DOOMED US ALL...",
        background: flashCelestial,
        //image: "pelle_end.png"  
      }, {
        text: "",
        background: flashCelestial,
        //image: "pelle_end.png"  
      },
    ],
  },
};
