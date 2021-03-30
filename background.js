let color = '#3aa757';
let url = "https://mal-actualscore.jonesy.moe/api/variables/latest";

chrome.runtime.onInstalled.addListener(() => {
    //console.log("Starting Extension");
    update_details();
    scheduleRefreshRequest();
});

chrome.runtime.onStartup.addListener(() => {
    //console.log('onStartup....');

    chrome.alarms.get('refresh', alarm => {
        if (alarm) {
            //console.log('Refresh alarm exists. Yay.');
        } 
        else {
            // if it is not there, start a new request and reschedule refresh alarm
            //console.log("Refresh alarm doesn't exist, starting a new one");
            update_details();
            scheduleRefreshRequest();
        }
    });
});


chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm && alarm.name === 'refresh') {
        update_details();
    }
});

function update_details(){
    fetch(url)
    .then(response => response.text())
    .then(text => {
        //console.log(text);
        let result = JSON.parse(text);
        chrome.storage.sync.set({ 'mal-data': result });
        //console.log(result);
    })
    .catch(error => console.log(error));
}


function scheduleRefreshRequest() {
    //console.log('schedule refresh alarm to 24h or 1440 minutes...');
    chrome.alarms.create('refresh', { periodInMinutes: 1440 });
}