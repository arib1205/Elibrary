
function searchTweets(){
  var url = document.location.href,
        params = url.split('?')[1]; 
    $.getJSON("http://thunderx.cise.ufl.edu:8080/api/s/".concat(params) , showResults);
}

var plusId=0;

function showResults(response){
  var results = response.results;
    var rows = results.map(function(item){
    return createRow(item.title, item.image, item.date);
  });
  document.getElementById("apiList").innerHTML = "<input type='submit' value='Back' onclick='showSearchForm();' /><br /><table id='resultsTable'></table>";
  rows.forEach(function(row){
    document.getElementById("resultsTable").appendChild(row);
  });
  document.getElementById("apiList").style.display = "block";
}

function retainData(curr, idoe) {
    localStorage.setItem(idoe,curr);
}

function showSearchForm() {
   window.location.href="index.html";
}

function createRow(person, urli, tweet){
    
  var tweetRow = document.createElement("tr");
  var iconCell = document.createElement("td");
  iconCell.setAttribute("class", "icon");
  var icon = document.createElement("img");
  icon.src = urli;
  icon.setAttribute("alt", person);
  icon.setAttribute("height", 48);
  icon.setAttribute("width", 48);
  iconCell.appendChild(icon);
  tweetRow.appendChild(iconCell);
  var tweetCell = document.createElement("td");
  tweetCell.setAttribute("class", "tweet");
  tweetCell.appendChild(document.createTextNode(person + ": " + tweet));
  tweetRow.appendChild(tweetCell);
  var rads = document.createElement("td");
   
  var radio1 = document.createElement("input");
  var r1 = document.createElement("Label");
  r1.innerHTML = "Read";
  rads.appendChild(r1);
  radio1.type = "radio";
  radio1.name = "radioGrp"+plusId;
  radio1.setAttribute("onClick", "retainData('Read', this.parentNode.previousSibling.innerHTML);");
  rads.appendChild(radio1);
  var radioItem2 = document.createElement("input");
  var r2 = document.createElement("Label");
  r2.innerHTML = "Unread";
  rads.appendChild(r2);
  radioItem2.type = "radio";
  radioItem2.name = "radioGrp"+plusId;
  radioItem2.setAttribute("onClick", "retainData('Unread', this.parentNode.previousSibling.innerHTML);");
  rads.appendChild(radioItem2);

  var radio3 = document.createElement("input");
  var r3 = document.createElement("Label");
  r3.innerHTML = "Wishlist";
  rads.appendChild(r3);
  radio3.type = "radio";
  radio3.name = "radioGrp"+plusId;
  radio3.setAttribute("onClick", "retainData('WishList', this.parentNode.previousSibling.innerHTML);");
  rads.appendChild(radio3);

  tweetRow.appendChild(rads);


  var val = localStorage.getItem(person+": "+tweet);

   if(val != null){
      if(val == "Read") radio1.checked = true;
         else if(val == "Unread") radioItem2.checked = true;
            else if(val == "WishList") radio3.checked = true;
    }

    plusId++;

 return tweetRow;
}