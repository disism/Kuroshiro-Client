const express = require('express');
const app = express();
const Kuroshiro = require('kuroshiro');
const KuroshiroAnalyzer = require('kuroshiro-analyzer-kuromoji');
app.use(express.static('static'));

app.get('/romaji', async (request, response, next) => {
  try {
    const kuroshiro = new Kuroshiro();
    await kuroshiro.init(new KuroshiroAnalyzer({dictPath: 'node_modules/kuromoji/dict'}));
    const text = request.query.text;
    const lines = text.split("\n")
    console.log(lines);
    const romajilines = await Promise.all(lines
      .map(async line => {
        return await kuroshiro.convert(line, { to: 'hiragana', mode: 'furigana' });
      }))
    const furigana = romajilines.join("\n");
    console.log(furigana);
    response.send(furigana);
  }
  catch (e)
  {
    next(e);
  }
});

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))