function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get('/cats', function(data) {
    const table = document.getElementById("table-data");
    for (let i=data.length-1; i>0; i--){
        let column = document.createElement("tr");
        let name = document.createElement("td");
        name.innerText = data[i].name;
        let furColor = document.createElement("td");
        furColor.innerText = data[i].furColor;
        let favFood = document.createElement("td");
        favFood.innerText = data[i].favFood;
        column.appendChild(name);
        column.appendChild(furColor);
        column.appendChild(favFood);
        table.appendChild(column);
    }
});