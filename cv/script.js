const getDurationText = (start = '1221-12-21') => {
  var startDate = moment(start, 'YYYY-MM-DD', true);

  years = moment().diff(startDate, 'years', true);
  months = moment().diff(startDate, 'months', true);

  yearsOnly = Math.floor(years);
  monthsOnly = Math.round(months - yearsOnly * 12);

  if (monthsOnly === 12) {
    yearsOnly += 1;
    monthsOnly = 0;
  }

  text = ' ';
  if (yearsOnly > 0 || monthsOnly > 0) {
    text += '(';
    if (yearsOnly) {
      text += String(yearsOnly);
      text += ' ';
      text += 'year';
      if (yearsOnly > 1) {
        text += 's';
      }
    }
    if (monthsOnly) {
      text = text.length > 2 ? (text += ' ') : text;
      text += String(monthsOnly);
      text += ' ';
      text += 'month';
      if (monthsOnly > 1) {
        text += 's';
      }
    }
    text += ')';
  }
  return text;
};

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const currentTasks = document.querySelectorAll('span.current[data-begin]');
    for (let i = 0; i < currentTasks.length; i++) {
      const el = currentTasks[i];
      const startDate = el.getAttribute('data-begin');
      const duration = getDurationText(startDate);
      el.innerHTML = duration;
    }
  },
  false
);


// PWA install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  e.prompt()
  // showAddToHomeScreen();
  // TODO: custom prompt or bribe!
  // UI
  // showAddToHomeScreen()
});



window.addEventListener('appinstalled', (evt) => {
  // TODO: A thank you message, probably?
  console.log('PWA a2hs!');
});


function showAddToHomeScreen() {

  var a2hsBtn = document.querySelector(".ad2hs-prompt");

  a2hsBtn.style.display = "block";

  a2hsBtn.addEventListener("click", addToHomeScreen);

}

function addToHomeScreen() {
  var a2hsBtn = document.querySelector(".ad2hs-prompt");  // hide our user interface that shows our A2HS button
  a2hsBtn.style.display = 'none';  // Show the prompt
  deferredPrompt.prompt();  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then(function (choiceResult) {

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }

      deferredPrompt = null;

    });
}



// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
  // TODO: Notify iOS users to add to homescreen
  // Needs manual action!

}
