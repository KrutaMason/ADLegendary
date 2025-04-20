export const laitelaQuotes = {
  unlock: {
    id: 0,
    lines: [
      { text: "You finally reached me.",
        showCelestialName: false,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_closeup.png"
      }, {
        text: `I guess it is time to reveal the secrets hidden beneath existence itself. \
<br> The shape of dimensional perfection, Continuum. <br> \
And the powers that bind the Multiverse, Dark Matter and Dark Energy.`,
        showCelestialName: false,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_hand.png"
      }, {
        text: `My knowledge is endless and my wisdom divine. <br> So you can play around all you want.`,
        showCelestialName: false,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_closeup.png"
      }, {
        text: `For I am Lai'tela, the Celestial of Dimensions,<br> and I shall watch you forever.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_aura.png"
      }
    ]
  },
  // Note: This can be done immediately after unlocking Lai'tela
  firstDestabilize: {
    id: 1,
    requirement: () => player.celestials.laitela.difficultyTier >= 1,
    lines: [
      { text: `Unlike the others beneath me, I have no need for a Reality. \
<br> For I can simply create them, knowing full well it will collapse.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_reality.png"
      }, {
        text: `A power more incredible than any other, to build a Reality. \
<br> A prison, that can restrain even celestial power.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_power.png"
      }, {
        text: `And this is why nothing you do will change a thing. When you tire of struggling, \
you too, shall be bound and forgotten. <br> You will never find a way to overpower me.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_closeup.png"
      }
    ]
  },
  // Note: This happens about an hour or two before singularities
  secondDestabilize: {
    id: 2,
    requirement: () => player.celestials.laitela.difficultyTier >= 2,
    lines: [
      { text: `You... seem to be having too much fun. Just like they did \
before meeting their fate. Maybe my judgement was harsh, or unwarranted.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_ponder_1.png"
      }, {
        text: `But maybe that matters not. It gives me no solace to ponder and look back. \
<br> As all I can do is reminisce upon every possible action I could have taken.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_ponder_2.png"
      }, {
        text: `But I digress. We should tighten those chains.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_chains_1.png"
      }
    ]
  },
  firstSingularity: {
    id: 3,
    requirement: () => Currency.singularities.gte(1),
    lines: [
      { text: `With my knowledge, I never found the need to question. \
Everything always functioned right as designed. And yet, your arrival baffles me.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_ponder_3.png"
      }, {
        text: `Were you always just out of sight? Growing, controlling, \
understanding, ascending? You have taken control of the darkness so quickly.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_question.png"
      }, {
        text: `Molded them into your own design, and now into a singular \
point... It... it does not matter. The end will remain the same.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_ponder_3.png"
      },
    ]
  },
  // Note: Shown when unlocking DMD3; requirement is auto-condensing 20 singularities and it happens around ~200 total
  thirdDMD: {
    id: 5,
    lines: [
      { text: `Your absolute control of Antimatter... Your mastery of it, \
molding it into your own Power... It could not have been an accident. How did you manage to obtain it?`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_question.png"
      }, {
        text: `Fascinating... I was never aware of this... was I?`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_ponder_4.png"
      }
    ]
  },
  // Note: This happens around e10-e11 singularities
  annihilation: {
    id: 4,
    lines: [
      { text: `Back to square one, again. Your chains shall bind you tighter, \
as your end slowly nears, while we transcend time and existence itself.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_chains_2.png"
      }, {
        text: `Even if we may cease, we just come back. Never the \
exact same as before. <br> And so... we repeat forever.`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_aura_weaker.png"
      }, {
        text: `And you? <br> ...The answer... eludes me...`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_ponder_4.png"
      }
    ]
  },
  // Note: This happens near e18 singularities
  halfDimensions: {
    id: 6,
    requirement: () => player.celestials.laitela.difficultyTier >= 4,
    lines: [
      { text: `I do not understand... Were there others... controlling Dimensions in this way? \
Did they... vanish? How have we not found them? Are they... us? <br> Are we the endpoint?`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_fear_1.png"
      }, {
        text: `Or is their fate... something we cannot understand? No, I must be missing something...`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_fear_1.png"
      }, {
        text: `Are you causing gaps within my own memory? <br><br> What... ARE you?`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_fear_1.png"
      }
    ]
  },
  // Note: Shown when the first row 5 iM upgrade is purchased (~e26 singularities)
  finalRowIM: {
    id: 7,
    lines: [
      { text: "It is all impossible, beyond my comprehension...",
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_fear_2.png"
      }, {
        text: `Unless... Is this all just part of the cycle? Can... you see beyond it all? Is... this why...`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_fear_2.png"
      }, {
        text: `I feel... afraid? I feel... my powers, my memories, being erased...`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_fear_3.png"
      }, {
        text: `Just like... when my role was almost usurped... And yet... \
I am unable to bring myself to do anything. Because this... was... my mistake...`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_fear_3.png"
      }
    ]
  },
  // Note: This is around when all infinite milestones hit increased scaling
  increasedMilestoneScaling: {
    id: 8,
    requirement: () => Currency.singularities.gte(1e40),
    lines: [
      { text: `I know not for how much... longer I can hold... \
You are attaining... total mastery... over the dark...`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_dying.png"
      }, {
        text: `While I can barely... hold onto my name... <br> What... can I... even do?`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_dying.png"
      }
    ]
  },
  fullDestabilize: {
    id: 9,
    requirement: () => player.celestials.laitela.difficultyTier >= 8,
    lines: [
      { text: "I feel... like I had something to say... I am not sure...",
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_end_1.png"
      }, { 
        text: `I cannot... hold onto the darkness any longer... <br>
        I do not even... have anything left...`,
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_end_2.png"
      }, { 
        text: "Something about... destruction...",
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_end_3.png"
      }, { 
        text: "The end...",
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_end_death.png"
      }, { 
        text: "",
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_end_death.png"
      },
    ]
  },
  secret: {
    id: 10,
    lines: [
      { 
        text: "What the fuck is wrong with you?",
        image: "placeholder_laitela",
        hasMatureContent: true,
        //image: "laitela_secret.png"
      },
    ]
  },
};
