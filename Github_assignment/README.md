Application Live at:-
https://github-assignment.herokuapp.com/

To run application locally:-

1. npm install live-server
2. live-server Github_assignment

I have used Vanilla JavaScript and Bootstrap for UI and NodeJs for back-end. 

Explaination:-

1. I am fetching the URL from input using document.getElementById.
2. Then I am fetching username and repo_name from URL.
3. Then I am calling the api to retrieve all the issues.
4. I am maintaing four counts for total open issues, open issues that were opened in the last 24 hours , open issues that were opened more than 24 hours ago but less than 7 days ago,open issues that were opened more than 7 days ago.
5. I am using Javascript date functions to get the current time and creation time(from api).
6. Then I am calling showTable() to fetch table.
7. I am showing alerts for invalid urls.
