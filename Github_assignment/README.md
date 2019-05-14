Application Live at:-
https://github-assignment.herokuapp.com/

To run application locally:-

1. npm install live-server
2. live-server Github_assignment

I have used Vanilla JavaScript and Bootstrap for UI and NodeJs for back-end. 

Explaination:-

1. I am fetching the URL from input using document.getElementById.
2. Then I am fetching username and repo_name from URL.
3. Then I am calling the two api's, one to fetch open issues count from search query and one to fetch open issues count from repos query.
4. Then I am getting total no. of pages from above count and calling the issues list api for each page.
5. Getting 100 issues list in each page, merging data for each api call to get one iisues array.
6. I am maintaing four counts for total open issues, open issues that were opened in the last 24 hours , open issues that were opened more than 24 hours ago but less than 7 days ago,open issues that were opened more than 7 days ago.
7. I am using Javascript date functions to get the current time and using creation time(from api).
8. Running the loop over merged array and incrementing the count accordingly. 
9. Then I am calling showTable() to fetch table.
10. I am showing alerts for invalid urls.
