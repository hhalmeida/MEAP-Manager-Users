# Project Manager User

Project for study, with technologies **NodeJS**, **Express**, **Postgres** **AngularJS**.

----------

Informations
-
In this stack was used the following technologies and implemented some configurations, they are:

> - Node v8 :  All code writed in es6.
> - Express : Framework node for web.
> - Postgres : Relational databas SQL
> - Sequelize : Framework for use database relation in Node.
> - CORS : Cors domain.
> - Nodemon : Plugin node for autoreload server.
> - AngularJS : Framework frontend. 

----------
Attention
---------

> For run this project you need to install **Node8** and **Postgres9.6**
> another instalations follow to **npm install* in project
> from terminal.
>

#### <i class="icon-hdd"></i> Instalações
**Backend** :

	$ npm install
    $ createdb manager_users
    $ sequelize db:migrate
    
*Run Server:*
The server is already committed to run on port 8000.

    $ npm run start:dev

for start project copy and paste this url in browser [http://localhost:8000](http://localhost:8000)

Frontend already starts along with the backend server

----------
**Frontend** :
```sh
$ cd frontend
$ npm install
$ bower install  #(if bower not installed execute npm -g bower install)

``` 
  To run only the Frontend, if it runs separately, it is configured to run on port 9000

```sh
$ grunt serve #(if grunt not installed execute npm -g grunt install)

```
      
      
for start project copy and paste this url in browser [http://localhost:9000](http://localhost:8000) 

----------

### API
localhost:8000/api/ 

api              | método   | 
---------------- |:----------:| ---
users 		     | GET	    | 
users            | POST	    |  
users/:userId    | PUT	    | 
users/:userId	 | DELETE   | 
profiles         | PUT		| 
histories        | GET		| 
histories/:userId | GET		| 

### Todos

 - Write Tests
 - Implement Security
 - Implement Session for user logged

### Bugs
 - Fix start project when zero information.
 - Add Label to start informing need Adicionar Usuário.


License
----
MIT
**Free Software, Hell Yeah!**

Any questions, my email is **hhalmeida3@gmail.com**
I hope I can help more people, the project is simple and easy understanding.

Thanks, Hugo Almeida