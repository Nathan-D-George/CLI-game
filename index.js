#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
  const rainbowTitle = chalkAnimation.rainbow('Who wants to be a Millionaire?');

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('How to Play')}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}`
  );
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default(){
      return 'Player';
    },
  });
  playerName = answers.player_name;
}

async function question1(){
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'Javascript was created in 10 days and released on\n',
    choices: [
      'May 23rd, 1995',
      'Nov 24th, 1995',
      'Dec 4th, 1995',
      'Dec 17th, 1996',
    ],
  });

  return handleAnswer(answers.question_1 == 'Dec 4th, 1995');
}

async function question2(){
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'When was Nathan Daniel George born?',
    choices: [
      'Mar 20th, 1999',
      'Nov 17th, 1999',
      'Sep 21st, 1999',
      'Feb 14th, 1999'
    ],
  });
  return handleAnswer(answers.question_2 == 'Sep 21st, 1999');
}

async function handleAnswer(isCorrect){
  const spinner = createSpinner('Checking answer').start()
  await sleep();

  if (isCorrect){
    spinner.success({ text: `Nice work ${playerName}. Correct.`});
  } else{
    spinner.error({ text: `Game over, loser!`});
    process.exit(1);
  }
}

function winner(){
  console.clear();
  const msg = `Congrats! Here's a million Dollars!`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  })
}
await welcome();
await askName();
await question1();
await question2();
await winner();