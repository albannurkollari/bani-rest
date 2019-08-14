# RESTful app

This is a demonstration project. It doesn't intend to deliver any final product.
Purpose is to deliver an MVP built on MEAN stack.

## MongoDB and Mongoose

This project uses MongoDB Atlas client and therefore Mongoose JavaScript library
in order to accomplish a database connection. Therefore, you need to create
an `.env` file in the root folder (which is ignored in `.gitignore`) and append
  * __`DB_CONNECTION`__ => _your database connection string_

  and

  * __`DB_CONNECTED_MSG`__ => _your custom connected to database message (shown in console)_