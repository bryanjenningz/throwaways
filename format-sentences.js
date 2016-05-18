// Reformat the sentences by putting each sentence on a single line, 
// keeping only the English, Kanji, and Kana sentences, then connecting 
// the sentences with a comma and exporting them as a CSV file.

var fs = require('fs');
var text = fs.readFileSync('sentences.txt');
var formatted = text
  // get rid of extra line for the Kanji, Kana, Romaji, and IPA sentences
  .replace(/^日 ([^\n]*)\n\n[^か][^ ](.*)/g, '日 $1$2')
  .replace(/^か ([^\n]*)\n\n[^R][^O][^M][^ ](.*)/g, 'か $1$2')
  .replace(/^ROM ([^\n]*)\n\n[^I][^P][^A][^ ](.*)/g, 'ROM $1$2')
  .replace(/^IPA ([^\n]*)\n\n[^日][^ ](.*)/g, 'IPA $1$2')

  // get rid of spaces for the Kanji sentences
  .replace(/^日 (.*)( )/g, '日 $1')

  // delete the Romaji and IPA sentences
  .replace(/^(ROM|IPA).*$/g, '')

  // delete empty lines
  .replace(/\n\n/g, '\n')

  // join the Kanji and Kana sentences with a comma in between them
  .split('\nか ')
  .join(',か ');

fs.writeFileSync('formatted-sentences.csv', formatted);
