const fs = require('fs');

const p2015 = require('./paske - 2016.json');

const toSecs = (str) => {
  const [hour, minute, sec] = str.split(':');
  return Number(hour) * 60 * 60 + Number(minute) * 60 + Number(sec);
}

const stringTime2Round = (s1, s2) => {
  return toSecs(s2) - toSecs(s1);
}

const csv = p2015.map(skier => [
  skier.startNr, 
  skier.name, 
  stringTime2Round(skier.start, skier.lap), 
  stringTime2Round(skier.lap, skier.finish), 
  skier.diff].join('\t')).join('\n');

fs.writeFileSync('./p2016.csv', csv);