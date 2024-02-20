
# ContactList

  

Basic CRUD backend (C#) and frontend (AngularJS).

  

## Start project

  

**__To start docker container and run example, open a terminal window, navigate to root folder (```/ContactList```) and type ```docker compose up --build```.__**

**__After starting the application, it will apply migrations automatically, so you can go to the [Frontend (AngularJS)](http://localhost:4200/) (```http://localhost:4200```) to access the application.__**

  

To recreate the image with the testing values in the database, please use ```docker compose up --force-recreate```.

  

## Task

  

1. Develop a WebApi based on a DDD Pattern in .Net6
2. Develop a Angular CRUD Application to maintain the data with validation in front and backend ( use FluentValidation Syntax in Both). Alternatively, you can use another frontend framework that is based on Typescript.
3. The Angular Application also should have a overview with an grid
4. The Application should be startable with a docker-compose and checkable
5. The Repository should have a git history.  

I decided to make it a contact list because its basic but usefull for example CRUDs, where users can view, edit, remove and submit contacts.
  

# Back-end

  

For the Web API infrastructure I used .NET 6, implementing the Domain-driven design pattern using "clean" architecture.

The API is divided into 3 different layers:

- Application layer (WebAPI folder)

- Domain layer

- Infrastructure layer

Relevant details:

- Used **SQLite** as the database for this project due to its ease of use and compatibility with `Microsoft.EntityFramework`, which I implemented utilizing the **repository pattern** and **dependency injection**

- Implemented the IContactRepository, which controls the repositories and the validation of the contact Entities.

- Used FluentValidation for validation, located inside the domain layer.

  

# Front-end

  
The frontend is rather crude since I did not have much experience with browser-based frameworks like AngularJS and learned this in some hours before start the project. (Im experiencied with .NET for both, Backend and Frontent)

It consists of:

- A base app component (default) with a list with contacts, stylized with bootstrap 5.3.2, using sweetalert2 to handle request results.
- A main table that lists all Contact and their properties.
- The ability to create, update, and delete Contacts.
- 

# Possible Updates

- Implement Data Transfer Object (DTO) for frontend.
- Adjust SeedData Middleware for performance.
- Implement SoftDelete interface to entity and update repository where users cannot **delete** entity from database and it become restorable.
- Implement a authentication and authorization middleware.
