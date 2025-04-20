import wordShift from "../word-shift";
export const resourceGallery = {
    /**
   * @template
   * { Internal name for the tab entry
   *  @property {Number} id     Unique ID for each entry (generated in-game, not explicitly stated)
   *  @property {function: @return String} info         Text body of information for the entry
   *  @property {function: @return Boolean} isUnlocked  Condition for when the entry is visible and searchable
   * }
   */
    resources:[{
        id: 0,
        name: "Antimatter",
        symbol: '<i class="fas fa-atom"/>',
        isUnlocked: () => true,
        formatClass: "o-resource--antimatter",
        formatValue: () => format(Currency.antimatter.value, 2, 1),
        related: [7,9,15,33],
        info: () => `Antimatter is a type of matter composed of the antiparticles. That means they have opposite physical charges. <br><br>
        It is the main resource of your journey, and is used 
        throughout the entire game for purchasing various things as you progress.<br><br>
        Antimatter is exclusively produced by the first Dimension${
        PlayerProgress.realityUnlocked() || PlayerProgress.eternityUnlocked() || Currency.infinities.gte(16) ? 
        `, but can also be produced by the second Dimension in 
        <b><i>Subsequent Assembly / C12</i></b>.`:`.`}`,
    },
    {
        id: 1,
        name: "Tickspeed",
        symbol: '<i class="fa-solid fa-clock"/>',
        isUnlocked: () => true,
        formatClass: "o-resource--antimatter",
        formatValue: () => `${format(Tickspeed.perSecond, 2, 3)} / sec`,
        related: [13,23,4],
        info: () => `Production in Antimatter Dimensions happen on each "tick", which initially occurs once per second. <br><br>
        By buying Tickspeed Upgrades, you can make your Antimatter Dimensions produce faster, as if multiple ticks occur in each second.`,
    },
    {
        id: 2,
        name: "Dimension Boost",
        symbol: '<i class="fas fa-angles-up"/>',
        isUnlocked: () => true,
        formatClass: "o-resource--antimatter",
        formatValue: () => formatInt(DimBoost.purchasedBoosts),
        related: [32],
        info: () => `Dimension Boosts are capable of amplifying the dimension multipliers  
        and unlocking new dimensions up to the 8th. <br><br>
        Dimension Boosts are the first prestige mechanic, meaning that using them resets your progress.`,
    },
    {
        id: 3,
        name: "Sacrificed Dimensions",
        symbol: '<i class="fas fa-turn-down"/>',
        isUnlocked: () => true,
        formatClass: "o-resource--antimatter",
        formatValue: () => formatX(Sacrifice.totalBoost, 2, 2),
        related: [36],
        info: () => `The power of Dimensional Sacrifice comes with a price of the other dimensions <br><br>
        Unlocked at the 5th Dimension Boost, you can sacrifice all non-Eighth Dimensions for a nice boost of
        the polyzettonic multiplier. <br><br> The more dimensions you sacrifice, the better its effect can become. 
        The sacrifice multiplier is initially based on the amount of your 1st Dimensions.`,
    },
    {
        id: 4,
        name: 'Antimatter Galaxy',
        symbol: ['<i class="fas fa-bahai"/>','Ω'],
        isUnlocked: () => true,
        formatClass: "o-resource--antimatter",
        formatValue: () => formatInt(player.galaxies),
        related: [10,17,39],
        info: () => `A galaxy is a huge collection of gas, dust, and billions of stars and their solar systems, all held together by gravity. 
        This variant of a galaxy contains the remnants of the antimatter you have harvested from your multidimensional progress.<br><br>
        At the cost of your progress and dimension boosts, Galaxies can boost tickspeed in a way 
        that the increase per purchase is improved; like a Compound interest with a higher rate.`,
    },
    {
        id: 5,
        name: 'Infinity Points',
        symbol: ['<i class="fa-solid fa-layer-group"/>','∞'],
        isUnlocked: () => true,
        formatClass: "o-resource--infinity",
        formatValue: () => format(Currency.infinityPoints.value.floor(), 2),
        related: [11,18,37],
        info: () => `Infinity point is a byproduct of the Big Crunch event, 
        and the main currency of the first main prestige layer; Infinty.
        Made by condensing at least ${formatPostBreak(Number.MAX_VALUE, 2)} Antimatter, 
        this material is infinitely dense.<br><br>
        As such, it has many different uses, like buying upgrades and improving your autobuyers.<br><br>
        Infinity Points can be passively gained via a specific infinity upgrade. 
        ${PlayerProgress.realityUnlocked() || PlayerProgress.eternityUnlocked() ? 
        `However, with the knowledge from <b><i>Time Study 181</i></b>, you can  
        harvest a fraction of Infinity Points you would otherwise gain from collapsing a universe.`:``}`,
    },
    {
        id: 6,
        name: 'Infinities',
        symbol: ['<i class="fa-solid fa-arrows-rotate"/>','∞'],
        isUnlocked: () => true,
        formatClass: "o-resource--infinity",
        formatValue: () => `${format(Currency.infinities.value, 2)} ${Currency.infinitiesBanked.value.gt(0)?`+ ${format(Currency.infinitiesBanked.value, 2)} banked`:""}`,
        related: [12,19,35],
        info: () => `Every time you perform a big crunch, the amount of "Infinities" you have increases.
        They are intangible, but can benefit various things with upgrades. 
        In statistics, Infinities show how many times you have crunched.<br><br>
        You gain a single Infinity in normal circumstances. 
        However, this can be improved by different upgrades and achievements 
        that give you the ability to earn multiple Infinities in one collapse, and passively generate them.
        ${PlayerProgress.realityUnlocked() || PlayerProgress.eternityUnlocked() ? 
            `<br><br>Going eternal removes your infinities, but with 
            <b><i>Time Study 191 and Achievement 131</i></b>, 
            a fraction of them can be spared as "Banked Infinities"; they work the same as regular Infinities.`:``}
        ${PlayerProgress.realityUnlocked() ? 
            `<br><br>With <b><i>The Boundless Flow</i></b>, you can gain tenth of 
            the Infinites you would normally get every second.`:``}`,
    },
    {
        id: 7,
        name: 'Matter',
        symbol: ['<i class="fas fa-atom"/>','Ʊ'],
        isUnlocked: () => PlayerProgress.realityUnlocked() || 
        PlayerProgress.eternityUnlocked() || 
        Currency.infinities.gte(16),
        formatClass: "o-resource--special",
        formatValue: () => `${format(Currency.matter.value, 2)}`,
        related: [0,9,15,33],
        info: () => `Matter is the opposite of Antimatter, having regular physical charges. 
        Matter having contact with Antimatter will result in both being annihilated, creating pure energy.<br><br>
        It poses a danger to your antimatter realm. Fortunately, 
        it can only be found in <b><i>Subatomic Renegade / C11</i></b> 
        ${PlayerProgress.realityUnlocked() || 
         PlayerProgress.eternityUnlocked() || 
         InfinityChallenge(6).isUnlocked ? `and <b><i>Subatomic Heresy / IC6</i></b> .` : "."}`,
    },
    {
        id: 8,
        name: 'Infinity Power',
        symbol: '<span class="fas fa-bolt"/>',
        isUnlocked: () => 
        PlayerProgress.realityUnlocked() ||
        PlayerProgress.eternityUnlocked() ||
        InfinityDimension(1).isUnlocked,
        formatClass: "o-resource--infinity",
        formatValue: () => format(Currency.infinityPower.value, 2, 1),
        related: [13],
        info: () => `With the intoduction of a new type of Dimensions, 
        comes a new resource that strengthens the old type. 
        Infinity power is a resource generated by the ${player.options.naming.dimensions ? `Infinity ${InfinityDimension(1).uniqueName}`
       : "1st Infinity Dimension"}.<br><br>
        Its effect is to give a powerful boost to all Antimatter Dimensions.
        The quantity of the power corresponds to 
        an exponentiation of a multiplier, usually to the power of 7. 
        Unlike Antimatter, Infinity Power can't be spent.`,
    },
    {
        id: 9,
        name: 'Replicanti',
        symbol: 'Ξ',
        isUnlocked: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--replicanti",
        formatValue: () => format(Replicanti.amount,2),
        related: [10,0,7,15,33,9],
        info: () => `Replicanti is an extraordinary material that 
        can replicate themselves and offer a boost to all Infinity Dimensions. <br><br>
        You can make the replication process more efficient by buying various Replicanti Upgrades. 
        Eventually Replicanti will reach its capacity, but you can 
        reset them back to one for a Replicanti Galaxy.<br><br>
        ${PlayerProgress.realityUnlocked() || PlayerProgress.eternityUnlocked() ?
        `You can remove the Replicanti limit with <b><i>Time Study 192</i></b>, 
        but its growth slows down at higher amounts. <br><br> Later on, 
        you can make the Replicanti input more efficient, adding more outputs.`:``}`,
    },
    {
        id: 10,
        name: 'Replicanti Galaxy',
        symbol: ['<i class="fas fa-bahai"/>','Ξ'],
        isUnlocked: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--replicanti",
        formatValue: () => formatInt(Replicanti.galaxies.total),
        related: [4,17,39],
        info: () => `Once you reach ${formatPostBreak(Number.MAX_VALUE, 2)} Replicanti, 
        you can get rid of them in exchange for a "free" Replicanti Galaxy.
        These galaxies work the same as antimatter galaxies, and thus give an extra push to tickspeed increase.<br><br>
        What replicanti galaxies consist of, are the sacrificed 
        replicanti, that eventually turned into stars, dust, etc.`,
    },
    {
        id: 11,
        name: 'Eternity Points',
        symbol: ['<i class="fa-solid fa-layer-group"/>','Δ'],
        isUnlocked: () => PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--eternity",
        formatValue: () => format(Currency.eternityPoints.value.floor(), 2),
        related: [5,18,37],
        info: () => `Eternity Points are the main currency of the Eternity Layer. 
        They encompass all of time you had in an Eternity, 
        requiring at least ${formatPostBreak(Number.MAX_VALUE, 2)} Infinity Points.<br><br>
        Eternity Points can be used on bite-sized eternity upgrades and Time Dimensions.
        ${Teresa.isUnlocked ? 
            `<br><br>Having at least ${format(TeresaUnlocks.epGen.price, 2)} Reality 
            Machines filled into Teresa's container results in a 
            passive generation of EP that works similarly to TS181.`:``}`,
    },
    {
        id: 12,
        name: 'Eternities',
        symbol: ['<i class="fa-solid fa-arrows-rotate"/>','Δ'],
        isUnlocked: () => PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--eternity",
        formatValue: () => format(Currency.eternities.value, 2),
        related: [6,19,35],
        info: () => `Similar to Infinities, you get "Eternities" from going eternal  
        can get more than 1 from various sources.
        It is the reset counter for the 2nd main layer, which also has uses the more you have.<br><br>
        The main focus of Eternities is to acquire the eternity milestones, 
        a set of goals that give you Quality of Life as an reward.
        Eternities are not spent from reaching the milestones.
        ${PlayerProgress.realityUnlocked() ? 
        `With <b><i>The Eternal Flow</i></b>, you can gain tenth of 
        the Eternities you would normally get every second.`:``}`,
    },
    {
        id: 13,
        name: 'Time Shards',
        symbol: ['<i class="fa-solid fa-shapes"></i>','Δ'],
        isUnlocked: () => PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--eternity",
        formatValue: () => format(Currency.timeShards.value, 2, 1),
        related: [1,8],
        info: () => `The Infinity layer has its own Dimensions and resources, so does Eternity. 
        In Time Dimensions, the lowest tier produces the fragments of time, 
        which offer you additional Tickspeed Upgrades<br><br>
        Time Shards' effect do not increase the cost of the Tickspeed Upgrades purchased with antimatter. 
        How many free Tickspeed Upgrades you get is dependent on how much Time Shards you have.`,
    },
    {
        id: 14,
        name: 'Time Theorems',
        symbol: '<i class="fas fa-graduation-cap"/>',
        isUnlocked: () => PlayerProgress.eternityUnlocked() || PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--eternity",
        formatValue: () => `${Currency.timeTheorems.value.gte(1e6)?format(Currency.timeTheorems.value,2,3):formatInt(Currency.timeTheorems.value)}`,
        related: [27],
        info: () => `Time Theorems are the theorems you achieve in your eternities, 
        mainly focusing on the concept of time.<br><br> 
        Time Theorems can be used as a currency to invest in the Time Studies from its tree.
        With them, you have better knowledge of your Eternity and others. 
        They can be bought with Antimatter, Infinity Points or Eternity Points.<br><br>
        The expensive studies require higher understanding and qualification from your theorems.`,
    },
    {
        id: 15,
        name: 'Tachyons',
        symbol: '<i class="fas fa-meteor"/>',
        isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--dilation",
        formatValue: () => format(Currency.tachyonParticles.value,2),
        related: [16],
        info: () => `Tachyons are particles that always travel faster than light.
        They are gained from exiting Time Dilation with a certain amount of Antimatter.<br><br>
        However, they cannot be farmed and require you to get a higher amount
        of antimatter in a Dilated Eternity in order to increase your amount.<br><br>
        Because of the properties of Tachyons, they produce Dilated Time, which have their own Entry.
        ${Ra.pets.teresa.isCapped?`<br><br>Maximizing Teresa's memories allows 
            you to gain Tachyons outside of Dilation, 
            but will only work if you aren't in any Celestial Reality.`:""}`,
    },
    {
        id: 16,
        name: 'Dilated Time',
        symbol: 'Ψ',
        isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--dilation",
        formatValue: () => format(Currency.dilatedTime.value,2),
        related: [15,17],
        info: () => `Dilated Time is the result of Tachyon's properties interfering with the laws of physics.
        They are produced from Tachyons and are translated to Tachyonic Galaxies by reaching thresholds, 
        similarly to the Tickspeed Upgrades gained from Time Dimensions.<br><br>
        Dilated Time can be used as a currency to buy upgrades from the Time Dilation subtab.`,
    },
    {
        id: 17,
        name: 'Tachyonic Galaxies',
        symbol: ['<i class="fas fa-bahai"/>','Ψ'],
        isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--dilation",
        related: [4,10,39,16],
        formatValue: () => formatInt(player.dilation.totalTachyonGalaxies),
        info: () => `Tachyonic Galaxy is yet another galactic variant that 
        boosts Tickspeed Upgrades.<br><br>
        They are gained from Dilated time that have their amount reached a certain threshold, 
        which can be lowered from a specific dilation upgrade.<br><br>
        A tachyonic galaxy is composed primarily of Tachyons, 
        like how the 2 other types are composed of their resources.`,
    },
    {
        id: 18,
        name: 'Reality Machines',
        symbol: ['<i class="fas fa-cog"/>','Ϟ'],
        isUnlocked: () => PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--reality",
        formatValue: () => format(Currency.realityMachines.value,2),
        related: [5,11,31,37,38],
        info: () => `Instead of being Points like the previous two layers, 
        the final layer has the main currency of Machines. Constructing a new 
        Reality gives you these powerful tools that you can use on
        the reality-bending upgrades, or improve the Black Hole that can make time pass faster.<br><br>
        ${Teresa.isUnlocked?`With the introduction of Teresa, you can  
            fill your Reality Machines to the container for higher gains 
            and unlocking new things.`:""}
        ${MachineHandler.isIMUnlocked?`<br><br>Unlike Infinity and Eternity Points, 
            Reality machines have a limit on the amount. Machines gained in excess of 
            that limit will give you a new type of machines.`:""}`,
    },
    {
        id: 19,
        name: 'Realities',
        symbol: ['<i class="fa-solid fa-arrows-rotate"/>','Ϟ'],
        isUnlocked: () => PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--reality",
        formatValue: () => formatInt(Currency.realities.value),
        related: [6,12,35],
        info: () => `Similar to the first two layer's resets, you get a "Reality" for making a new one. 
        But unlike Infinity and Eternity's quantity, Realities are the most important thing in your journey, 
        thus have more quality.<br><br>
        The amount of Realities you have can affect the Automator, 
        a device that lets you fully automate them in detail.
        ${AlchemyResource.multiversal.isUnlocked?`
            <br><br>The <b><i>Multiversal</i></b> resource can make every construction of 
            Reality simulate extra Realities, giving you more Glyphs and Perk Points.
            `:""}`,
    },
    {
        id: 20,
        name: 'Glyphs',
        symbol: '<i class="fas fa-clone"/>',
        isUnlocked: () => PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--reality",
        formatValue: () => `${Glyphs.inventoryList.length} in Inventory${Glyphs.activeList.length>=1?`, ${Glyphs.activeList.length} equipped`:""}`,
        related: [30,24],
        info: () => `For every new reality you have constructed, 
        you get a glyph that gives you various powers.<br><br>
        They come in many types with their own diacritics. 
        However, Glyphs have various qualities and degrees, 
        which means you have to think which Glyph is best to choose.<br><br>
        With <b><i>Scour to Empower</i></b>, the Glyphs can be 
        sacrificed in exchange for extra powers that grow in the quantity. 
        ${Ra.unlocks.unlockGlyphAlchemy.canBeApplied?`In addition, they can be refined into alchemy resources.`:""}`,
    },
    {
        id: 21,
        name: 'Perk Points',
        symbol: '<i class="fas fa-project-diagram"/>',
        isUnlocked: () => PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--reality",
        formatValue: () => formatInt(Currency.perkPoints.value),
        related: [19],
        info: () => `Perk Points help you make Realities easier 
        by allocating them into the Perk tree. 
        ${TeresaUnlocks.shop.isUnlocked?`<br><br>With the introduction of Teresa's Perk Shop, you can also 
            spend your Perk Points on various upgrades e.g. enhancing your autobuyers.`:""} 
        ${VUnlocks.shardReduction.isUnlocked?`Additionally, Perk Points can be used to 
            reduce the goal requirement of all tiers of each V-Achievements.`:""}
        <br><br> You usually gain one Perk Point every Reality, but with 
        <b><i>Achievement 154</i></b>, you have a chance to get 2.
        ${AlchemyResource.uncountability.isUnlocked?`<br><br>Perk Points can be earned 
            without the need to make a new reality, thanks to your alchemic <b><i>Uncountability</i></b>.`:""}`,
    },
    {
        id: 22,
        name: 'Automator Points',
        symbol: '<i class="fas fa-code"/>',
        isUnlocked: () => PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--reality",
        formatValue: () => `${formatInt(AutomatorPoints.totalPoints)} / 100`,
        info: () => `Before you can earn the device that can automate your Realities, 
        you must get at least 100 Automator Points.
        <br><br>These Automator Points are given when you:<br>
        <ul>
        <li>Purchase various Perks</li>
        <li>Purchase Reality Upgrades</li>
        <li>Unlock the Black Hole</li>
        <li>Simply complete more Realities</li>
        </ul>
        <br>You will still continue to gain Automator points after unlocking the Automator, but they will no longer serve any purpose.`,
    },
    {
        id: 23,
        name: 'Game Speed',
        symbol: '<i class="fa-solid fa-clock"/>',
        isUnlocked: () => PlayerProgress.realityUnlocked(),
        formatClass: "o-resource--reality",
        related: [1,25],
        formatValue: () => `${formatX(getGameSpeedupFactor(),2,2)} ${(getGameSpeedupFactor() !== getGameSpeedupForDisplay())
             && Enslaved.canRelease(true)?`(<i class="fas fa-expand-arrows-alt u-fa-padding"></i>${format(getGameSpeedupForDisplay(),2,2)})`:""}`,
        info: () => `After unlocking Reality, time can be manipulated, 
        unlike the whole Eternity's themes about time. 
        That means all productions from small to big, are affected by Game speed unless stated otherwise.<br><br>
        With Time Glyphs and the Black Hole, Game speed can be increased, making time pass faster than normal.
        Faster gamespeed also benefits upgrade effects that are based on how long you have existed.`,
    },
    {
        id: 24,
        name: 'Relic Shards',
        symbol: ['<i class="fa-solid fa-shapes"/>','Ϙ'],
        isUnlocked: () => TeresaUnlocks.effarig.isUnlocked,
        formatClass: "o-resource--celestial",
        formatValue: () => format(Currency.relicShards.value, 2),
        related: [20,30],
        info: () => `Relic Shards are the shards of the rejected Glyphs. 
        They can empower the qualities of new Glyphs. How much shards you gain from 
        reality is based on how unique your glyph set is.<br><br>
        The Holder of Glyphs, Effarig, has been collecting them for 
        the bounty of their realm. Effarig has a 
        small shop where you can spend those shards on. 
        In exchange, you get mechanics that improves your sortability on Glyphs.`,
    },
    {
        id: 25,
        name: 'Stored Time',
        symbol: '<i class="fas fa-history"/>',
        isUnlocked: () => EffarigUnlock.eternity.isUnlocked,
        formatClass: "o-resource--celestial",
        related: [23],
        formatValue: () => `${timeDisplayShort(player.celestials.enslaved.stored)}${player.celestials.enslaved.storedReal? ` + ${timeDisplayShort(player.celestials.enslaved.storedReal)}`:""}`,
        info: () => `The Celestials are transcendent of time. 
        With that kind of power, you can store it like it's a resource. <br><br>
        You can store 2 kinds of Times: <br>
        <ul>
        <li>The Game Time, which you have an advanced perception on, thanks to the black holes.</li>
        <li>The <i>Real</i> Time, which is transcendent of Game Time  
        and works like time in real life. When being stored, all productions halt completely.</li>
        </ul>
        <br> You can release them, however, they are different for the 2 types. <br><br>
        For Game-Time, you can discharge for a spontaneous boost to 
        all kinds of productions that are affected by it. <br><br>
        For the real one, you can "amplify" a Reality, simulating 
        repeated runs of it. Amplified Realities give all the rewards that normal Realities do.
        `,
    },
    {
        id: 26,
        name: 'Tesseracts',
        symbol: '<i class="fa-solid fa-cube"/>',
        isUnlocked: () => Enslaved.isCompleted,
        formatClass: "o-resource--celestial",
        formatValue: () => `${formatInt(Tesseracts.bought)}${Tesseracts.extra? ` + ${format(Tesseracts.extra,2,2)}`:""}`,
        info: () => `A four-dimensional shape of a cube, capable of extending the limits of the infinity dimensions. 
        Used as a tool of the imprisoning of the Nameless, they have given you these to use on your power.<br><br>
        At the astronomical cost of infinity points, these things lets you purchase more infinity dimensions for higher multipliers. <br><br>
        Come to think of it, you are already an eight-dimensional being. Why did it have to so hard to obtain a thing that is infinitesimally inferior to you?`,
    },
    {
        id: 27,
        name: 'Space Theorems',
        symbol: ['<i class="fas fa-graduation-cap"/>','⌬'],
        isUnlocked: () => VUnlocks.vAchievementUnlock.isUnlocked,
        formatClass: "o-resource--celestial",
        formatValue: () => `${formatInt(V.spaceTheorems)}`,
        related: [14],
        info: () => `When you complete a V-Achievement, you will be rewarded with the secondary type of theorems. 
        These kind of theorems have the themes of space instead of time.
        <br><br> Space Theroems can be used to purchase the normally locked studies
        ${Ra.unlocks.unlockHardV.canBeApplied||Pelle.isDoomed?
        ` and V's powerful Triad Studies,`:","} finally allowing you to complete the full set 
        and achieve full mastery of the Time Study tree.`,
    },
    {
        id: 28,
        name: 'Memory Chunks',
        symbol: '<i class="fas fa-dice-d6"/>',
        isUnlocked: () => Ra.isUnlocked,
        formatClass: "o-resource--forgotten",
        related: [29,31],
        info: () => `Upon entering Ra's Reality on a quest to bring back Ra's memories, 
        you collect the memory chunks of the 4 celestials. 
        These chunks produce the celestial memories for the forgotten.<br><br>
        Memory chunks can be more efficient on production with Ra upgrades. 
        ${Ra.remembrance.isUnlocked?`With Remembrance, Ra can focus 
            harder on remembring a celestial at a price of the other 
            ones being remembered less. This makes Memory Chunk production vary.`:","}`,
    },
    {
        id: 29,
        name: 'Memories',
        symbol: '<i class="fas fa-brain"/>',
        isUnlocked: () => Ra.isUnlocked,
        formatClass: "o-resource--forgotten",
        related: [28,31],
        info: () => `Memories are the main objective for making Ra remember their former friends. 
        They can be currency in which you can improve the production 
        of both Chunks and Memories, and even level up for different Rewards.<br><br>
        Milestones for celestial levels vary from a small boost to unlocking entire mechanics.`,
    },
    {
        id: 30,
        name: 'Alchemy Resources',
        symbol: '<i class="fas fa-vial"/>',
        isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
        formatClass: "o-resource--forgotten",
        related: [20,24],
        info: () => `Given as a gift from Ra, The Effarig's Alchemy Lab has various structures for resources.
        Each Alchemy Resource has a reaction and can improve different things.
        The lower tier resources can be transformed into a higher tier, exhanging effects.<br><br>
        ${Ra.pets.effarig.isCapped?`At Effarig level 25, you can use all 
            6 alchemy resources of the 4th tier to create the 
            Philosopher's Glyph; the new type that is reality`:""}`,
    },
    {
        id: 31,
        name: 'Imaginary Machines',
        symbol: ['<i class="fas fa-cog"/>','<i class="far fa-lightbulb"/>'],
        isUnlocked: () => MachineHandler.isIMUnlocked,
        formatClass: "o-resource--forgotten",
        formatValue: () => format(Currency.imaginaryMachines.value,2),
        related: [18],
        info: () => `Through the power of imagination, you can generate a new type of machines. 
        After the excess of ${format(MachineHandler.hardcapRM)} Reality Machines, Imaginary Machines are to be collected. <br><br> 
        They have become the new main currency of Reality and can be spent on the more 
        powerful set of Imaginary upgrades, ranging from boosts and to unlocking more Celestials.
        ${Pelle.quotes.arm.isUnlocked?`
            <br><br>The Imaginary machines are the remnants of 
            your own thoughts, your memories incorrectly recollected.`:""}
        `,
    },
    {
        id: 32,
        name: 'Imaginary Boosts',
        symbol: ['<i class="fas fa-angles-up"/>','<i class="far fa-lightbulb"/>'],
        isUnlocked: () => ImaginaryUpgrade(12).isBought,
        formatClass: "o-resource--forgotten",
        formatValue: () => formatInt(DimBoost.imaginaryBoosts),
        related: [2,31],
        info: () => `Once you purchased the imaginary upgrade 
        <b><i>Consequences of Illusions</i></b>, you gain Imaginary Boosts. <br><br>
        They behave like regular Dimboosts, but you can make them stronger 
        with <b><i>Consecrated Calamity</i></b>.`,
    },
    {
        id: 33,
        name: 'Dark Matter',
        symbol: ['<i class="fas fa-atom"/>','ᛝ'],
        isUnlocked: () => Laitela.isUnlocked,
        formatClass: "o-resource--laitela",
        formatValue: () => format(Currency.darkMatter.value, 2),
        related: [0,7,9,15,34],
        info: () => `Dark Matter is one of the 2 powers that bind the Multiverse,
        and is a currency produced by Dark Matter dimensions.
        Dark matter is matter that emits no detectable radiation, 
        but whose presence can be inferred from gravitational effects.<br><br>
        With it, they empower the shape of dimensional perfection, Continuum. 
        They provide a multiplier to Continuum's effect based 
        on the highest amount of Dark Matter you have ever had.<br><br>
        It can be assured that Lai'tela is the holder of dark matter, as opposed to someone that holds antimatter...`,
    },
    {
        id: 34,
        name: 'Dark Energy',
        symbol: ['<i class="fas fa-bolt"/>','ᛝ'],
        isUnlocked: () => Laitela.isUnlocked,
        formatClass: "o-resource--laitela",
        formatValue: () => format(Currency.darkEnergy.value, 2),
        related: [33,35],
        info: () => `Dark Energy is one of the 2 powers that bind the Multiverse,
        and is a currency produced by Dark Matter dimensions.
        Its effect is to drive the accelerating expansion of the universe.<br><br>
        Dark energy can be condensed into singularities, which have their own entry. 
        The Dark Energy production are independent from your dimension amounts and mulitpliers.`,
    },
    {
        id: 35,
        name: 'Singularity',
        symbol: '<i class="fas fa-circle"/>',
        isUnlocked: () => Laitela.isUnlocked,
        formatClass: "o-resource--laitela",
        formatValue: () => format(Currency.singularities.value, 2, 2),
        related: [6,12,19,34],
        info: () => `Singularities are a a byproduct of condensing Dark Energy, having infinite density.<br><br>
        The purpose of them is to unlock Singularity Milestones, 
        which are unique to Eternity Milestones.`,
    },
    {
        id: 36,
        name: 'Annihilation',
        symbol: ['<i class="fas fa-turn-down"/>','ᛝ'],
        isUnlocked: () => ImaginaryUpgrade(19).isBought,
        formatClass: "o-resource--laitela",
        formatValue: () => formatX(Laitela.darkMatterMult, 2, 2),
        related: [3],
        info: () => `Annihilation has a similar outcome to Dimensional Sacrifice<br><br>
        You can annihilate your Dark Matter and the Dimensions for a 
        permanent multiplier that applies to all Dark Matter Dimensions.<br><br>
        It can be done multiple times; the additions to the multiplier stack additively, 
        and there is no need to annihilate for a greater addition each time.<br><br> 
        You must have at least 1e60 Dark Matter in order to Annihilate.`,
    },
    {
        id: 37,
        name: 'Remnants',
        symbol: '♅',
        isUnlocked: () => Pelle.isDoomed,
        formatClass: "o-resource--doomed",
        formatValue: () => format(Currency.remnants.value, 2, Currency.remnants.value > 1 ? 0 : 2),
        related: [5,11,18,38],
        info: () => `The ability to gain machines has been lost to your irreversible actions. 
        As such, Remnants are the new currency. Instead of making a new Reality, 
        you battle with Pelle (Armageddon Reset) to gain the resources.<br><br>
        As the name suggests, they are the remains of your former atomic empire. 
        They can generate Reality Shards, which have their own Entry.
        <br><br>How you get the Remnants are dependent on a factor, which works similarly to Glyph level factors.`,
    },
    {
        id: 38,
        name: 'Reality Shards',
        symbol: ['<i class="fa-solid fa-shapes"></i>','Ϟ'],
        isUnlocked: () => Pelle.isDoomed,
        formatClass: "o-resource--doomed",
        formatValue: () => format(Currency.realityShards.value, 2, 2),
        related: [37],
        info: () => `Reality shards are the fragments of your 
        power from your former Reality, produced by the remnants.<br><br>
        They can be used to make you more powerful with the repeatable Pelle upgrades. 
        On the other hand, they are the last resort to save 
        what you have destroyed; Automation and protections from Resets.`,
    },
    {
        id: 39,
        name: 'Generated Galaxies',
        symbol: '<i class="fas fa-bahai"/>',
        symbol: ['<i class="fas fa-bahai"/>','♅'],
        isUnlocked: () => Pelle.hasGalaxyGenerator,
        formatClass: "o-resource--doomed",
        formatValue: () => formatInt(GalaxyGenerator.generatedGalaxies),
        related: [4,10,17],
        info: () => `Generated Galaxy is the final type of galaxies, 
        but the catch is that they can be produced unlike any other. 
        Whatever they contain is ${wordShift.wordCycle(["irrelevant","unimportant","pointless"])}.<br><br>
        They can be used to buy upgrades that increase the production of the galaxies.
        They have a limit, which can be highered by sacrificing your Rifts.<br><br>
        <i style="color:var(--color-pelle--base)">
        ${player.celestials.pelle.galaxyGenerator.phase>=1 ?
            `Do you feel it? Do you hear it? The screaming of this very reality? `:`...`}
        ${player.celestials.pelle.galaxyGenerator.phase>=2 ?
            `This is what you have brought upon this world. Pelle can only watch while their world crumbles into dust. ` :
            player.celestials.pelle.galaxyGenerator.phase>=1?`...`:``}
        ${player.celestials.pelle.galaxyGenerator.phase>=3 ?
            `There is no point of return now. The fate has already been sealed when you obtained the 
            ${wordShift.wordCycle(["Generator","Filament","Stars"])}.<br><br>`: 
            player.celestials.pelle.galaxyGenerator.phase>=2?`...`:``}
        ${player.celestials.pelle.galaxyGenerator.phase>=4 ?
            `You have truly become the destroyer of this existence.<br><br>`: 
            player.celestials.pelle.galaxyGenerator.phase>=3?`...`:``}
        ${player.celestials.pelle.galaxyGenerator.phase>=5 ?
            `The ${wordShift.wordCycle(["End","Death","Fall"])} is nigh. Goodnight.`: 
            player.celestials.pelle.galaxyGenerator.phase>=4?`...`:``}</i>
        `,
    },
    {
        id: 40,
        name: 'Useless Paperclips',
        symbol: '<i class="fa-solid fa-paperclip"/>',
        isUnlocked: () => player.news.specialTickerData.paperclips>0,
        formatClass: "o-resource--special",
        formatValue: () => formatInt(player.news.specialTickerData.paperclips),
        info: () => `Useless Paperclips are of course, useless. They have no effects or bonuses.
        They can be found by specific tickers. You may keep them as your reward.
        ${player.news.specialTickerData.paperclips>=3?
            `<br><br> You wonder if you can build an independent 
            <a href="https://www.decisionproblem.com/paperclips/index2.html" target="_blank">empire</a>
             out of these.`:""}
        ${player.news.specialTickerData.paperclips>=10?
            `<br><br> Ask a celestial to make a new type of dimensions just for your paperclips.`:""}
        ${player.news.specialTickerData.paperclips>=25?
            `<br><br> Come to think of it, you are proud of this collection. 
            A thing that serves no purpose yet one man has enough dedication to collect them like coins.`:""}
        ${player.news.specialTickerData.paperclips>=50?
            `<br><br> Consider finding useless clips as a minigame.`:""}
        ${player.news.specialTickerData.paperclips>=100?
            `<br><br> Congratulations!`:""}`,
    },
    {
        id: 41,
        name: 'Blobs',
        symbol: '\uE010',
        isUnlocked: () => Themes.available().map(t => t.name).includes("S11"),
        formatClass: "o-resource--blob",
        formatValue: () => "\uE010",
        info: () => `\uE010`,
    },]
}