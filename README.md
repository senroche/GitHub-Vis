# GitHub-Vis
This project was created for a third year Software Engineering module in TCD.

![Full Demo](https://user-images.githubusercontent.com/35078186/69878624-5b69ca00-12bd-11ea-9956-12e8ec052745.gif)

## Project Description
This project was built using:
 - [ReactJS](https://reactjs.org/)</br>
 - [@octokit/rest](https://www.npmjs.com/package/@octokit/rest)</br>
 - React D3[https://react-d3-library.github.io/]</br>

### Login
![login](https://user-images.githubusercontent.com/35078186/69878602-4e4cdb00-12bd-11ea-9648-f1d70c3185ec.PNG)
The login screen uses Octokit to authenticate the GitHub user using basic authentication. It handles incorrect username and password.

I could have made this project without user auth. However, the spec said a logged in user and it does allow us to pull some information about private repos as well other additional information.

### Dashboard
![dashboard](https://user-images.githubusercontent.com/35078186/69878601-4e4cdb00-12bd-11ea-9cb5-9099405e0524.PNG)
The dashboard is the mains screen for this application. It displays the users basic information as well as presenting three cards for stats.

 - Quick Stats -> Basic stats like the number of followers, private/public repos, gists etc.</br>
 - Language Stats -> shows the bytes of code written in each language across all repos. It displays this data in a pie chart.</br>
 - Punch Card Stats -> Frequency of commits for week across all repositories. The size of the circle represents the number of commits in      the hour.
 
 ### Stars
 ![stars](https://user-images.githubusercontent.com/35078186/69878603-4ee57180-12bd-11ea-9b55-58cec226356e.PNG)
 This screen simply show the users stars and allows them to follow the link to the starred repo.
 
 
 ## Usage 
 
 ### `npm install`

Install dependencies.
 
 
 ### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
