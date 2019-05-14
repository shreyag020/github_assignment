// Init UI
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

function repo_link() {
  // Get input text
  const userLink = searchUser.value;

  // Get API URL
  if (userLink !== '') {
    let result = userLink.split("github.com/");
    if (result.length >= 2) {
      result = result[1].split("/");
      if (result.length >= 2) {
        fetchData(result[0],result[1]);
      }
    } else {
      // Show alert
      ui.showAlert('Invalid URL', 'alert alert-danger');
      ui.clearTable();
      searchUser.value = "";
    }
  } else {
    // Show alert
    ui.showAlert('Invalid URL', 'alert alert-danger');
    ui.clearTable();
    searchUser.value = "";
  }
}

//Get issues list per page
function getIssuesList(value,username,repo_name) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/repos/" + username + "/" + repo_name + "/issues?page="+ value +"&per_page=100");
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

function fetchData(username,repo_name) {
  //API call to fetch open issues count via search query
  var getOpenIssues = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/search/issues?q=repo:" + username + "/" + repo_name + "+is:public+is:issue+is:open");
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });

  //API call to fetch open issues count via repo query
  var getTotalIssues = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/repos/" + username + "/" + repo_name);
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });

  Promise.all([getOpenIssues, getTotalIssues]).then(function(values) {//resoving both promises to get the results
    let result1 = values[0];
    let result2 = values[1];
    let openIssues = result1.total_count;
    let totalPages = Math.round(result2.open_issues_count/100);
    let open24hrs = 0;
    let open7Days = 0;
    let opened = 0;
    let promises = [];

    for (let i = 1; i <= totalPages; i++) { 
      promises.push(getIssuesList(i,username,repo_name)); //Get issues list per page
    }

    Promise.all(promises).then((results) => {
      var merged = [].concat.apply([], results); //get one array for all resolved promisses data
      for(let i = 0; i < merged.length; i++){
        let today = new Date(); // get current time
        let creationDate = new Date(merged[i].created_at); // get issue created time
        if (Math.abs(today.getTime() - creationDate.getTime()) / (1000 * 3600) <= 24) {  //Get open issues that were opened in the last 24 hours
          open24hrs++;
        } //Get open issues that were opened more than 24 hours ago but less than 7 days ago, 168 is the total no. of hours in a week. 
        else if (Math.abs(today.getTime() - creationDate.getTime()) / (1000 * 3600) > 24 && Math.abs(today.getTime() - creationDate.getTime()) / (1000 * 3600) <= 168) {
          open7Days++;
        } else {
          //Get open issues that were opened more than 7 days ago
          opened++;
        }
      }
      ui.showTable(openIssues, open24hrs, open7Days, opened);
    }).catch((error) => {
      console.log(error);
    });
    if (result1.message) {
      ui.showAlert(result1.message, 'alert alert-danger');
      ui.clearTable();
      searchUser.value = "";
    }
  })
  .catch((error) => {
    console.log(error);
  });
}