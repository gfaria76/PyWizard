#!/usr/bin/env node
// Enriches all modulo1 JSON files with RPG metadata if missing
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'data', 'cursos', 'python', 'modulo1');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const enemies = {
  conceito: [
    { name: null, hp: 0, weakness: null },
  ],
  aprendiz: [
    { name: 'Golem de Memória', hp: 50, weakness: 'variáveis' },
    { name: 'Fantasma dos Operadores', hp: 55, weakness: 'operadores' },
    { name: 'Cubo de Formatação', hp: 60, weakness: 'f-strings' },
    { name: 'Réplica Fracionária', hp: 55, weakness: 'divisão' },
    { name: 'Espírito da Bifurcação', hp: 65, weakness: 'condicionais' },
    { name: 'Aranha Relacional', hp: 70, weakness: 'lógica booleana' },
    { name: 'Autômato do Elif', hp: 75, weakness: 'elif' },
    { name: 'Hidra Aninhada', hp: 80, weakness: 'if aninhado' },
  ],
  aventura: [
    { name: 'Espectro Errante', hp: 65, weakness: 'tipos de dados' },
    { name: 'Elemental Numérico', hp: 70, weakness: 'cálculos' },
    { name: 'Corvinal das Aspas', hp: 75, weakness: 'strings formatadas' },
    { name: 'Golem Inteiro', hp: 70, weakness: 'quocientes' },
    { name: 'Serpente Lógica', hp: 80, weakness: 'condicionais' },
    { name: 'Oráculo Invertido', hp: 85, weakness: 'operadores lógicos' },
    { name: 'Espelho do Elif', hp: 90, weakness: 'decisões múltiplas' },
    { name: 'Dragão Condicional', hp: 95, weakness: 'aninhamento' },
  ],
  guardiao: [
    { name: 'Guardião da Forja', hp: 120, weakness: 'cálculos complexos' },
    { name: 'Guardião dos Quocientes', hp: 130, weakness: 'divisão e módulo' },
    { name: 'Guardião do Julgamento', hp: 140, weakness: 'regras compostas' },
    { name: 'Guardião do Labirinto', hp: 150, weakness: 'if-elif-else' },
  ],
  grupo: [
    { name: 'Legião da Guilda', hp: 150, weakness: 'trabalho em equipe' },
    { name: 'Legião dos Quocientes', hp: 160, weakness: 'divisão cooperativa' },
    { name: 'Legião do Tribunal', hp: 170, weakness: 'regras em equipe' },
    { name: 'Legião da Fortaleza', hp: 180, weakness: 'vereditos cooperativos' },
  ],
  boss: [
    { name: 'O Analista de Dados Brutos', hp: 300, weakness: 'f-strings e formatação' },
    { name: 'O Matemático Sombrio', hp: 350, weakness: 'operações complexas' },
    { name: 'O Filtrador de Regras', hp: 400, weakness: 'condicionais avançadas' },
    { name: 'O Tecelão de Vereditos', hp: 450, weakness: 'if aninhado e elif' },
  ],
};

const variants = {
  conceito: 'lesson',
  aprendiz: 'trail',
  aventura: 'trail',
  guardiao: 'trail-guardian',
  grupo: 'expedition',
  boss: 'marathon',
};

const counters = {};

for (const file of files) {
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (data.rpg) {
    console.log(`SKIP (already has rpg): ${file}`);
    continue;
  }
  
  const subtipo = data.subtipo || (file.includes('boss') ? 'boss' : file.includes('PROVA') ? 'boss' : 'conceito');
  const variant = variants[subtipo] || 'trail';
  
  // Track index per subtipo
  if (!counters[subtipo]) counters[subtipo] = 0;
  const idx = counters[subtipo];
  counters[subtipo]++;
  
  const enemyPool = enemies[subtipo] || enemies.conceito;
  const enemy = enemyPool[idx % enemyPool.length];
  
  const xpBase = data.premio?.pontuacao || 50;
  
  const rpg = {
    xp_reward: xpBase,
    variant,
    oracle_hints: [
      'Verifique a formatação exata da saída pedida.',
      'Releia o enunciado com atenção antes de codar.'
    ],
  };
  
  if (enemy.name) {
    rpg.enemy_name = enemy.name;
    rpg.enemy_hp = enemy.hp;
    rpg.weakness = enemy.weakness;
  }
  
  // Loot
  const loot = [];
  if (data.secoes?.desafios?.missoes) {
    loot.push({ item: 'Selo de Combate', type: 'badge', rarity: xpBase > 100 ? 'rare' : 'common' });
  }
  if (data.premio?.superpower_reward) {
    loot.push({ item: `Superpoder: ${data.premio.superpower_reward}`, type: 'superpower', rarity: 'epic' });
  }
  if (loot.length === 0) {
    loot.push({ item: 'Fragmento de Experiência', type: 'consumable', rarity: 'common' });
  }
  rpg.loot_drops = loot;
  
  data.rpg = rpg;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  console.log(`ENRICHED: ${file} (${subtipo} -> ${variant})`);
}

console.log('\nDone!');
