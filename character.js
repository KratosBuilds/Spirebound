// Character System for Spirebound

class Character {
  constructor(name, charClass) {
    this.name = name;
    this.charClass = charClass;
    this.level = 1;
    this.hp = 100;
    this.stats = {
      strength: 10,
      agility: 10,
      intelligence: 10
    };
    this.inventory = [];
  }

  levelUp() {
    this.level += 1;
    this.hp += 10;
    this.stats.strength += 2;
    this.stats.agility += 2;
    this.stats.intelligence += 2;
    console.log(`${this.name} leveled up to ${this.level}!`);
  }

  addItem(item) {
    this.inventory.push(item);
    console.log(`${item} added to inventory.`);
  }
}