# Train ticket reservation
With the help of the application, users can reserve train tickets for a specific route. There is a search form with multiple fields that helps in filtering the proper routes for the user. It also gives results that require transfers from one train to another if there is no direct route from point A to point B.

The application has authentication and authorization. There are 2 roles: `guest`, `user`, and `admin`.

## Roles

**guest:**  
  - view and search routes

**user:** 
  - view and search routes
  - see other users, who reserved tickets for a route
  - reserve and refund tickets 
  - see his reservations
               
**admin:**
  - can do the same as the user
  - add & delete routes
