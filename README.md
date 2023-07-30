# Train ticket reservation
With the help of the application, users can reserve train tickets for a specific route. There is a search form with multiple fields that helps in filtering the proper routes for the user. It also gives results that require transfers from one train to another if there is no direct route from point A to point B.

The application has authentication and authorization. There are 3 roles: `guest`, `user`, and `admin`.

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

## Setup

1. Create the databasse user by executing the follwing lines:

   ```sql
   sudo mariadb -u root -p
   CREATE USER 'nandor'@'localhost' IDENTIFIED BY '2001';
   GRANT ALL PRIVILEGES ON train_db.* TO 'nandor'@'localhost' IDENTIFIED BY '2001';
   FLUSH PRIVILEGES;
   ```
2. Run the `script_create_db.sql` script from the project folder and enter the password: `2001`
```sql
/usr/bin/mariadb -u nandor -p < script_create_db.sql
```
  
  ## A few images of the website
  
<img src="https://github.com/nandor23/train-tickets/blob/main/images/image_1.png" alt="game" width="900"/>
<img src="https://github.com/nandor23/train-tickets/blob/main/images/image_2.png" alt="game" width="900"/>
<img src="https://github.com/nandor23/train-tickets/blob/main/images/image_3.png" alt="game" width="900"/>

  
