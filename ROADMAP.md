#161204
The testing of the user dashboard is basically completed. Todat we should complete the routing system for the dashboard and look at authentication. Once that is complete I think we can move onto the final styling of the app.

##GOAL
Finalize the user dashboard (including base styling) and complete base styling for the rest of the app.

##STRETCH GOAL
Begin work on the emailing mechanism (server)

----

#161201
Started work on the user Dashboard which should be a simple representation of the user's selected reps and keywords. This is just a basic management tool for the user.

##GOAL
Today would be best used to create the basic component with methods and basic rendering. If feasible, the component should reuse the existing reps and keywords components to reduce redundancy. This could be a challenge considering the coupling to the stepper implementation.

##STRETCH GOAL
A stretch goal would be to conceptualize the sharing mechanism.

----

We have endpoints for member bills and recent bills.
It seems as though recent bills are not showing up with subjects. Need to test.

Assuming that the bills with subjects works, the next step is to build the algo that is going to parse the user interests and identify relevant bills.
