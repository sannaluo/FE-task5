'use strict';

// sivulla on p elementti 'message', jossa olisi tarkoitus näyttää palvelimen vastaus
// valitse se, ja tallenna muuttujaan

// tee funktio 'upload', joka
// - estää lomakkeen lähetyksen
// - kirjoittaa 'message' elementtiin 'Upload in progress...'
// - hakee lomakkeesta file kentän
// - tekee FormData -olion ja lisää käyttäjän valitseman tiedoston siihen
// - lähettää tiedoston fetch -metodilla osoitteeseen 'upload.php'
// - kun tiedoston lähetys on valmis, kirjoittaa palvelimen vastauksen 'message' elementtiin

// tee tapahtumakuuntelija, joka kutsuu 'upload' funktiota, kun lomake lähetetään

const message = document.querySelector('#message');

const upload = (evt) => {

    evt.preventDefault();
    message.innerHTML += `<p>Upload in progress</p>`;
    // valitaan sivulta input-kenttä, jonka tyyppi on file
    const input = document.querySelector('input[type="file"]');
    // tehdään FormData -objekti
    const data = new FormData();
    // lisätään tiedosto FormData -objektiin.
    // Huomaa että files on taulukko. Voit siis lähettää useampia tiedostoja.
    data.append('fileToUpload', input.files[0]);
    // tehdään olio asetuksille
    const settings = {
      method: 'POST',
      body: data
    };
    // käynnistetään fetch. Tässä tapauksessa palvelin kertoo
    // uploudin onnistumisen/epäonnistumisen tekstillä. Voi olla myös esim json.
    fetch('upload.php', settings).then((response) => {
      return response.text();
    }).then((text) => {
      console.log(text);
      message.innerHTML += text;
    });
  };

document.querySelector('form').addEventListener('submit', (evt) => {
  upload(evt);
});

