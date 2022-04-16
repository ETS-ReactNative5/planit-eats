## PlanIt Eats

### npm start

### npx react-native run-ios

### npx react-native run-android

## Overview

# Stack navigation & form field validation

* React-navigation/native-stack
* React-hook-form
* Yup

This application is built stricktly with React Native as of right now. So far, the authentication and initial routing is set. Using stack navigation we have successfully routed through the form pages as well as the back buttons with no issues. The StackNav page within the routes folder has all avalaible paths identified. BottomTabs, Draws, and appBar.header will be implimented as well. Tabs for site and products, Draws for current user links and settings. appBar.header has yet to be determined.

 Within the components folder is controlled-input, form-button, confirmation-alert and layout. The themes and colors have still yet to be determined so we are testing out a select few during the auth proccess. Using React-hook-form, their controlled input was utilized and distributed/manipulated throughout the auth processes. First runthrough we tested verification with applePasswordRules. However, react-hook-form and yups verification is going to be the defualt use case in the application. The form-button was put through a similar procces like the above text input. Themes are being implemented into style sheets, google/facebook login are next to come. The confirmation-alert is created with react-native paper, it is very basic at the moment. The layout folder is empty but is already designed. This will pass a products prop that will be seeded by data and mapped to be displayed on the item screens. Here users can add to cart purchase and much more.
 
 Weekend goals: finish auth logic, impliment the rest of yups verification/removed the remaining few on the conrolled input, connect to the firebase backend and start building the API.

 
