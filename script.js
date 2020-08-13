const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: '',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get Jokes from Joke API
async function getJockes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        // Text-to-spech
        tellMe(joke);
        // Disable Button
        toggleButton();
      }
      catch (error) {
        console.log('fetch failed', error);
      }

}

// Event Listener
button.addEventListener('click', getJockes);

audioElement.addEventListener('ended', toggleButton);

