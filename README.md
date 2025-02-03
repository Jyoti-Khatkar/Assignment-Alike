
<!-- Project Description := -->

1. Home Page

Users can search for a destination by typing the location name.

Upon selecting a location, the page redirects to the Destination Details page, displaying more images and information about the selected location.

The API for destination search is created in the server folder, providing static data.

2. Destination Details Page

Route: /cities/{destination_name}

Uses an API created in the server folder to fetch location-specific data dynamically.

Displays a large image of the destination and provides additional details.

Includes an option to book attractions, holidays, or plan a trip with images shared by other travelers.

3. Itinerary Planner Page

Users can create and save itineraries by entering a destination, start date, and end date.

Saved itineraries appear as small cards displaying the image, title, description, and selected dates.

Itinerary data is stored in localStorage, ensuring persistence even after a page refresh.



If a user is not logged in, clicking on Itinerary redirects to the Sign In page.


 

<!-- All pages are Mobile responsive. -->

<!-- For Authentication :- -->

signUp:-auth/register
signIN :-auth/login

- In Header Profile Icon in the right corner having two option signIN And SignUp
-Once user signUp than move to sign IN Page
- once User signUp than it will move to the singn In Page.

-Sign Up details i store in the localStroage ,once the user sign the data set in the localStroage and when user user sign In than it will set authentication key

- I used middleware and pinia store to work on authentication .Middleware check on each routes.

i put check on My Itinerary routes if the user authenticated than only User can set Itinerary otherwise redirect to signUp page if not register or signIn if not authenticated.




<!-- ****************Things I Used -->
<!-- composable uses -->
1.In Itinerary page and Home page calling same api for same purpose so make a composable for that.
2.For Login and register page use the composable function to share similar things.
3. For Lazy loading use the usefetch for api and <NuXtImg> for images.
4. Use middleware concept for redirection control on Itinerary page.And As for this use the localstroage , which run on client side only so as per that i need to put check and need to use plugins as it run before the redirection and get the data from localstroage in that.



<!-- clone the assignment -->
git clone https://github.com/Jyoti-Khatkar/Assignment-Alike.git

<!-- checkout branch -->
git checkout master

<!-- if have nvm :- -->
<!-- Use the latest version of node -->
nvm use 22

<!-- install the dependemcies of project -->
npm install

<!-- to run the application use -->
npx nuxt dev
