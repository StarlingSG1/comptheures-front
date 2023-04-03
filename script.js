const fs = require('fs');

function readWordsFromFile(filepath) {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const mots = data.split('\n');
    fs.writeFile("./words.js", JSON.stringify(mots, null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Le tableau de mots a été écrit dans le fichier de sortie.');
      });
  });
}

const filepath = './liste_francais.txt';
readWordsFromFile(filepath);    