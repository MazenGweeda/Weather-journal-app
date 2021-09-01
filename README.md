# Weather journal app
This is the second project from Udacity professional web developer track.

## Table of contents
* [Structure](#structure)
* [Features](#features)

## Structure
### HTML file
1. The **'index.html'** is the html file contains two textareas where user enter his data.
2. The **generate button** sends a request to **'openweathermap.com'** to get weather data using **zip code** or **city name** entered by user.
3. The **weather data** returned from **'openweathermap.com'** is sent to the website server using a **'post'** route then a **'get'** route is used to get the data from server to update the website UI.

### Css file
The **'styles.css'** contains the style sheet which holds the styles of different elements.

### JavaScript file
1. The **'server.js'** creates the server and its dependencies, and contains definitions of **post** and **get** routes.
2. The **'app.js'** contains all the functionality of the page and methods to **post** and **get** data to and from the server.

### Resources
The **resources** folder contains different images which are used as background for some elements.

## Features
1. User can get weather data by using **zip code** or **city name**.
2. User should enter the **zip code** or **city name** in the first textarea and his **feelings** in the second textarea.
3. Entering the required data in both textareas will activate the **'generate button'** which will get the weather data and update website UI on click.
