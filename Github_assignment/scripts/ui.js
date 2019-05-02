class UI {
  constructor() {
    this.table = document.getElementById('table');
  }

  // Display table in UI
  showTable(openIssues, open24hrs, open7Days, opened) {
    this.table.innerHTML = `
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Total Open Issues</th>
          <th scope="col">Last 24 hours</th>
          <th scope="col">1-7 days</th>
          <th scope="col">More than 7 days</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>${openIssues}</th>
          <td>${open24hrs}</td>
          <td>${open7Days}</td>
          <td>${opened}</td>
        </tr>
      </tbody>
    </table>
    `;
  }

  // Show alert message
  showAlert(message, className) {
    // Clear any remaining alerts
    this.clearAlert();
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.searchContainer');
    // Get search box
    const search = document.querySelector('.search');
    // Insert alert
    container.insertBefore(div, search);

    // Timeout after 3 sec
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear table
  clearTable() {
    this.table.innerHTML = '';
  }
}