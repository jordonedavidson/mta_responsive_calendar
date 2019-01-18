# Responsive Calendar
## Builder for the .js and .css files used in the Mt. Allison Acedemic Calendar

### Technologies Used
Base Framework [Bootstrap 4](https://www.getbootstrap.com)
Additional JS Libraries:
* [jQuery 3.3.1](https://jquery.com)
* [jQuery UI](https://jqueryui.com/)
* [jQuery Touchswipe](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin)
Font extention for icons
* [Font Awesome](https://fontawesome.com)

### Development Environment
Base Components:
* [Node.js](https:nodejs.org)
* [Sass](https://sass-lang.com)
* [Grunt taskrunner](https://gruntjs.com/)

The files index.html, _2.html and Biology.html are included to use as a visual reference.

## File Structure
`
|- assets (Output files)
|   |- css
|   |   |- mta_responsive_calendar.css
|   |   |- mta_responsive_calendar.min.css
|   |   |- mta_responsive_calendar.min.css.map
|   |- images
|   |   |- 18Hero-Campus.jpg
|   |   |- mta-sprite.svg
|   |-js
|   |   |- mta_responsive_calendar.js
|   |   |- mta_responsive_calendar.min.js
|   |   |- mta_responsive_calendar.min.js.map
|
|- src (Input Files. Customisation happens here)
|   |- scss
|   |   |- theme.scss
|   |- theme.bootstrap.css (dynamically created, not for editing)
|   |- theme.css
|   |- theme.js
|
|- .gitignore   (Development environment files)
|- Gruntfile.js
|- package.json
|- package-lock.json
|- README.md
|
|- favicon.ico  (Visualisation files)
|- index.html
|- _2.html
|- Biology.html
`

## Project Initialisation
In the project directory run `npm install` to setup all the node package dependancies

## Development Process
Set the Grunt taskrunner to automatically update the mta_responsive_calendar.css and mta_responsive_calendar.js files by running `grunt watch` in a terminal window. Changes made to the source files will automatically be updated to these assets.

Theme customisation takes place in the files:
* src/scss/theme.scss
* src/theme.css
* src/theme.js

Once you are happy with the functionality of the css and js, make the final minified files by running `grunt production` in the terminal.

The Resulting assets folder may be moved to the cal-test project directory for inclusion in the net Mount Allison Academic Calendar Build.