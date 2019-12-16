const nihongo = document.querySelector('.nihongo');
const furigana = document.querySelector('.furigana');
const go = document.querySelector('.go');
const gotohtml = document.querySelector('.gotohtml')


go.onclick = () => {
  fetch("/romaji?text=" + encodeURIComponent(nihongo.value))
  .then(res => res.text())
  .then(text => {
    furigana.innerHTML = text.split('\n').join('<br>\n');
  });
};

gotohtml.onclick = () => {
  fetch("/romaji?text=" + encodeURIComponent(nihongo.value))
  .then(res => res.text())
  .then(text => {
    console.log(text);
    furigana.innerText = text;
  });
};
