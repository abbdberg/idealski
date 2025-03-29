import React from "react";

export const CSV = ({ skiers }) => {
  const csv = skiers.map(skier => [
    skier.name, 
    skier.startNumber, 
    Math.floor(skier.lap/1000)-Math.floor(skier.start/1000), 
    Math.floor(skier.finish/1000)-Math.floor(skier.lap/1000), 
    skier.diff,
    (Math.floor(skier.finish/1000)-Math.floor(skier.lap/1000)) - (Math.floor(skier.lap/1000)-Math.floor(skier.start/1000))
  ].join('\t')).join('\n');
  return (
    <>
      <textarea value={csv} style={{position: 'absolute', top: 0, left: 0, width: 800, height: 500}}></textarea>
    </>
  );
};
