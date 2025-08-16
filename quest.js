// Quest system for Spirebound Mini Game

const quests = [
  {
    id: 1,
    title: "Slay 5 Goblins",
    description: "Goblins have been raiding the village. Defeat 5 goblins.",
    objectives: ["Defeat 1 goblin", "Defeat 2 goblins", "Defeat 5 goblins"],
    completed: false
  },
  {
    id: 2,
    title: "Gather Healing Herbs",
    description: "Find and collect 3 healing herbs for the village healer.",
    objectives: ["Find 1 herb", "Find 2 herbs", "Find 3 herbs"],
    completed: false
  }
];

// Accept a quest
function acceptQuest(id, playerQuests) {
  const quest = quests.find(q => q.id === id);
  if (quest && !playerQuests.some(q => q.id === id)) {
    // Deep copy objectives and reset completion
    playerQuests.push({
      id: quest.id,
      title: quest.title,
      description: quest.description,
      objectives: [...quest.objectives],
      completed: false
    });
  }
}

// Complete an objective
function completeObjective(id, idx, playerQuests) {
  const quest = playerQuests.find(q => q.id === id);
  if (quest && quest.objectives[idx] && !quest.objectives[idx].startsWith('[COMPLETED]')) {
    quest.objectives[idx] = '[COMPLETED] ' + quest.objectives[idx];
  }
}

// Complete a quest
function completeQuest(id, playerQuests, player) {
  const quest = playerQuests.find(q => q.id === id);
  if (quest && !quest.completed && quest.objectives.every(obj => obj.startsWith('[COMPLETED]'))) {
    quest.completed = true;
    // Example reward for completion
    if (player) player.addItem('Quest Reward');
  }
}