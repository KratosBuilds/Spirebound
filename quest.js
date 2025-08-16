// Quest System for Spirebound

const quests = [
  {
    id: 1,
    title: "Ascend the Spire",
    description: "Reach the top of the Spire by overcoming challenges.",
    objectives: [
      "Defeat the floor boss",
      "Find the hidden key",
      "Solve the floor puzzle"
    ],
    rewards: {
      xp: 100,
      item: "Mystic Amulet"
    },
    completed: false
  },
  {
    id: 2,
    title: "Lost Traveler (Side Quest)",
    description: "Find and rescue the explorer lost on the second floor.",
    objectives: [
      "Locate the explorer",
      "Defeat nearby monsters",
      "Guide the explorer to safety"
    ],
    rewards: {
      xp: 50,
      item: "Healing Potion"
    },
    completed: false
  }
];

// Simple Quest Functions
function acceptQuest(questId, playerQuests) {
  const quest = quests.find(q => q.id === questId);
  if (quest && !playerQuests.some(q => q.id === questId)) {
    playerQuests.push({ ...quest });
    console.log(`Quest accepted: ${quest.title}`);
  }
}

function completeObjective(questId, objectiveIndex, playerQuests) {
  const quest = playerQuests.find(q => q.id === questId);
  if (quest && quest.objectives[objectiveIndex]) {
    quest.objectives[objectiveIndex] = `[COMPLETED] ${quest.objectives[objectiveIndex]}`;
    console.log(`Objective completed: ${quest.objectives[objectiveIndex]}`);
  }
}

function completeQuest(questId, playerQuests, player) {
  const quest = playerQuests.find(q => q.id === questId);
  if (quest && !quest.completed) {
    quest.completed = true;
    // Give rewards to player
    player.levelUp();
    player.addItem(quest.rewards.item);
    console.log(`Quest completed: ${quest.title}`);
    console.log(`Rewards: XP ${quest.rewards.xp}, Item ${quest.rewards.item}`);
  }
}