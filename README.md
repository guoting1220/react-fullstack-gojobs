# GoJobs
GoJobs is a mock job board web application

### User Flow
Guest users can:
- register or login to get access to more features

Logged in users can: 
- view the information of all the companies
- view all the job postings
- view the job postings for specific company
- search jobs by key words
- apply and un-apply jobs
- view all the applied jobs
- modify the user profile

### Deployed App Link
https://gojobs.surge.sh/

### Tech Stack 

##### frontend: 
HTML, CSS, Javascript, React.js

##### backend: 
Express, Node.js

##### database: 
SQL, PostgreSQL

### Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

##### backend:
cd to "jobly-backend", install the dependencies:
  `npm install`

  Create the database and tables,  and populate the tables with sample data:

  (for windows user)
   `psql -f jobly.sql`

  (for mac user)
   `psql < jobly.sql` 

   To start the server:
   `npm start`

   To run test suite:
   `npm test`


##### frontend:
cd to "jobly-frontend", and install the dependencies:
 `npm install`

  To run the app in the development mode:
  `npm start`

   To run test suite:
  `npm test`
	
##### To visit app on localhost:  

Open `http://localhost:3000` to view it in the browser.
  