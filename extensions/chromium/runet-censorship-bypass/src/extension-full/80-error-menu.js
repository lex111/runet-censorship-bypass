'use strict';

/*
window.chrome.browserAction.setBadgeBackgroundColor({
  color: '#db4b2f',
});
*/

chrome.webNavigation.onErrorOccurred.addListener((details) => {

  const tabId = details.tabId;
  console.log(details.url, details.error, details);
  if ( !(details.frameId === 0 && tabId >= 0) ||
        [
          'net::ERR_BLOCKED_BY_CLIENT',
          'net::ERR_ABORTED',
        ].includes(details.error) ) {
    return;
  }

  console.log(details.url, details.error, details);

  chrome.browserAction.setPopup({
    tabId,
    popup: './pages/options/index.html#tab=exceptions&status=Правый клик по иконке = меню инструментов!',
  });

  window.chrome.browserAction.setBadgeBackgroundColor({
    tabId,
    color: '#4285f4',
  });
  chrome.browserAction.setBadgeText({
    tabId,
    text: '●●●',
  });

});

