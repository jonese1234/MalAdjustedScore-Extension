run();
function run(){
    chrome.storage.sync.get('mal-data', function (result) {
        var currentScore = document.getElementsByClassName('score-label')[0].innerText;
        var adjustedScore = CalculateAdjustedScore(currentScore, result);
        var infoBlock = document.getElementsByClassName('information-block')[0];
        var span = document.createElement('span');
        span.innerHTML = `<a href="https://github.com/jonese1234/MalAdjustedScore-Extension">Adjusted Score: ${adjustedScore}</a>`;
        span.classList.add('information');
        span.classList.add('type');
        infoBlock.appendChild(span)
    });
}

function CalculateAdjustedScore(currentScore, result){
    var data = result['mal-data'];
    var result = 5.5 + (((currentScore - data.mean)/data.standardDeviation) * (9*0.16666));
    if(result < 1) return 1;
    if(result > 10) return 10;
    
    return Math.round((result + Number.EPSILON) * 100) / 100
}