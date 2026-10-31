export const optionTabs = [
  {
    key: "saving",
    name: "Saving",
    id: 0,
    symbol: "fas fa-save",
    isUnlocked: () => true,
    onSwitch: [["options", "saving"]],
    components: ["SavingOpTab"]
  },
  {
    key: "visual",
    name: "Visual",
    id: 1,
    symbol: "fas fa-palette",
    isUnlocked: () => true,
    onSwitch: [["options", "visual"]],
    components: ["VisualOpTab", "NewsOpTab", "NotationOpTab", "AnimationOpTab", "InfoDisplayOpTab", "NamingOpTab"]
  },
  {
    key: "awayprogress",
    name: "Away Progress",
    id: 2,
    symbol: "fa-solid fa-door-open",
    isUnlocked: () => true,
    onSwitch: [["options", "visual"], "awayProgressOptions"],
    components: ["AwayProgressOpTab"]
  },
  {
    key: "tabs",
    name: "Visible Tabs",
    id: 3,
    symbol: "fa-solid fa-eye",
    isUnlocked: () => true,
    onSwitch: [["options", "visual"], "hiddenTabs"],
    components: ["HiddenTabsOpTab"]
  },
  {
    key: "sidebar",
    name: "Sidebar",
    id: 4,
    symbol: "fa-solid fa-bars",
    isUnlocked: () => ui.newUI,
    onSwitch: [["options", "visual"], "sidebar"],
    components: ["SidebarOpTab"]
  },
  {
    key: "gameplay",
    name: "Gameplay",
    id: 5,
    symbol: "fas fa-wrench",
    isUnlocked: () => true,
    onSwitch: [["options", "gameplay"]],
    components: ["GameplayOpTab", "ConfirmationOpTab"]
  },
  {
    key: "audio",
    name: "Audio",
    id: 6,
    symbol: "fas fa-volume-high",
    isUnlocked: () => true,
    onSwitch: [["options", "gameplay"], "audioOptions"],
    components: ["AudioOpTab"]
  }/*,
  {
    key: "glyphdisplay",
    name: "Glyph Display",
    id: 7,
    symbol: "fas fa-clone",
    isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
    onSwitch: [["reality", "glyphs"], "glyphDisplayOptions"],
    components: []
  }*/
]