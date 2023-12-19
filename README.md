# Nutrition-Database
INST377 Final Project

## Contributers
Surafiel Tesfahun, Brandon Fung, Daniel Ashbeck

## Project Description
Nutrition Databse project serves as an interactive platform for users to search for food recipes based on specific nutritional criteria. Users can input desired amounts of protein, carbohydrates, and calories, and the page dynamically filters a pre-defined database of food items to display relevant search results. The user-friendly interface includes input fields for each nutritional parameter and a "Search" button to initiate the search process. The results are presented in a clear format below the search form, showcasing food items that meet or exceed the specified nutritional values. This project aims to provide a practical and straightforward tool for individuals seeking tailored recipes that align with their nutritional preferences and dietary requirements.

## Target Browser
The project is designed to be compatible with a wide range of modern web browsers to ensure accessibility and usability for a diverse user base. The project's compatibility extends to popular desktop browsers, including but not limited to:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

By adhering to web standards and utilizing cross-browser compatible HTML, CSS, and JavaScript, the project aims to provide a consistent and seamless experience across these major browsers.

##### Mobile Browsers:

As the project progresses, there is a plan to optimize and adapt the application for mobile browsers, enabling users to access the food search and recipe functionality on smartphones and tablets. The responsive design principles implemented in the CSS ensure that the application is scalable and user-friendly on smaller screens.

When targeting mobile browsers, additional testing and adjustments will be made to enhance the mobile user experience. The intention is to make the food search application not only accessible on desktop browsers but also responsive and functional on mobile devices.

##### Mobile App Consideration:

For a more tailored mobile experience, there may be future considerations for developing a dedicated mobile app. This could involve using frameworks like React Native or Flutter to create a cross-platform mobile application that provides a native-like experience on both iOS and Android devices. The transition from a web-based project to a mobile app could involve leveraging the existing codebase while incorporating mobile-specific optimizations and features.


## User Manual
Users are introduced with a search menu that has different filter options. The user will first enter a food item and can limit the amount of protein, calories, and carbohydrate. There is an option for users if they want to exclude certain ingridients and will automatically filter out search results based on inputted value. After the user inputs their data, click "Search" to make a API call to retrieve data. There will be mulitple food item listed with the recipes included.

## Developer Manuel
This project requires some installments in order to run. There are four dependencies that are used which will be covered on how to install. You will need to open terminal open the file location. Once the terminal found the path:

----
##### Steps

1) Run
` npm init`
*Then fill out or skip through the promted dialog.*

2) Run the rest of the dependencies

`npm install express`

`npm install @supabase/supabase-js`

`npm install animejs`

`npm install nodemon`

3) Open terminal again and run `npm start`

4) Open a browser and search for "localhost:3000"

----
###### Side note
Switch between the different api key that we provide in foodsearch.js to avoid daily api calls.