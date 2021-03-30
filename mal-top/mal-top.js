GetCellValues();

function GetCellValues() {
    chrome.storage.sync.get('mal-data', function (result) {
        var table_full = document.getElementsByClassName('top-ranking-table');
        var table = table_full[0];
        for (var r = 0, n = table.rows.length; r < n; r++) {
            var row = table.rows[r]
            if(r === 0){
                // Header
                var x = row.insertCell(3);
                x.innerHTML = "Adjusted Score";
                x.classList.add('score');
            }
            else{
                var x = row.insertCell(3);
                var currentScore = row.cells[2].innerText;
                let score = CalculateAdjustedScore(currentScore, result);
                x.innerHTML = `<td class="score ac fs14"><div class="js-top-ranking-score-col di-ib al" style="width: 48.7969px;"><i class="icon-score-star mr4 on"></i><span class="text on score-label score-9">${score}</span></div></td>`;
                x.classList.add('score');
                x.classList.add('ac');
                x.classList.add('fs14');
            }
    
        }
    });
}

function CalculateAdjustedScore(currentScore, result){
    var data = result['mal-data'];
    var result = 5.5 + (((currentScore - data.mean)/data.standardDeviation) * (9*0.16666));
    if(result < 1) return 1;
    if(result > 10) return 10;
    
    return Math.round((result + Number.EPSILON) * 100) / 100
}

function GetFromStorage(){
    chrome.storage.sync.get('mal-data', function (result) {
        console.log(result);
        console.log(result['mal-data']);
        return result['mal-data'];
    });
}