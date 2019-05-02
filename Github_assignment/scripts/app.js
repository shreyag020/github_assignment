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
        let apiUrl = "https://api.github.com/repos/" + result[0] + "/" + result[1] + "/issues";
        fetchData(apiUrl);
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

function fetchData(apiUrl) {
  //API call to fetch all issues
  var getIssues = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl);
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });

  // Render Table
  var generateTable = function () {
    getIssues
      .then(function (fulfilled) {
        var data = fulfilled;
        let openIssues = 0;
        let open24hrs = 0;
        let open7Days = 0;
        let opened = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].state == "open") {  //Condition to check only for open issues
            openIssues++;
            var today = new Date();
            var creationDate = new Date(data[i].created_at);
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
        }
        ui.showTable(openIssues, open24hrs, open7Days, opened);
        if (fulfilled.message) {
          ui.showAlert(fulfilled.message, 'alert alert-danger');
          ui.clearTable();
          searchUser.value = "";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  generateTable();

}