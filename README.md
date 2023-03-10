# Simpleticket

Basic web application built with Django REST Framework and Angular2, for educational pourposes. It has a little more feature then the usual 'TODO like' examples.

Schema: Ticket <- User

## Features

1.  django admin panel
2.  CRUD operations (angular)
3.  jwt authentication
4.  related records management
5.  login management (angular)
6.  signup management (django + angular)
7.  router, interceptors, protected views (angular)
8.  admin panel (django)
9.  openapi 3.0 (swagger, redoc)
10. input typehead (angular)
11. angular bootstrap (responsive navbar ecc.)
12. other angular features

## setup (docker)
```
sudo docker-compose up --build
```
## setup (shell -not recomendend)

```
# backend
python -m venv env 
source env/bin/activate
sh backend/start.sh

# frontend
cd frontend/simpleticket
npm install
ng s

```
### Important!
In shell setup you have 2 options for db:
- build up a postgres service with the same conf as in docker-compose (hostname:db and so on)
- change django settings to set back sqlite3


### OpenApi url:
- http://localhost:8000/api/schema/swagger-ui/
- http://localhost:8000/api/schema/redoc/


#### OpenApi CLI generation: 
```
python manage.py spectacular --color --file schema.yml --validate
```


## TODO
- minimal restyle
- further code polish
- fix time zone gap