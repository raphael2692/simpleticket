# Simpleticket

Basic web application built with Django REST Framework and Angular2, for educational pourposes. It has a little more feature then the usual 'TODO like' examples.

Schema: Ticket <- User

## Features

1. django admin panel
2. CRUD operations (angular)
3. jwt authentication
4. related records management
5. login management (angular)
6. signup management (django + angular)
7. router, interceptors, protected views (angular)
8. admin panel (django)
9. openapi 3.0 (swagger, redoc)
10. input typehead (angular)
11. angular bootstrap (responsive navbar ecc.)
12. other angular features


## setup (docker)
```
sudo docker-compose build up
```
## setup (shell)

```
# backend
python -m venv env 
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# frontend
cd frontend/simpleticket
npm install
ng s

```

### OpenApi url:
- http://localhost:8000/api/schema/swagger-ui/
- http://localhost:8000/api/schema/redoc/


#### OpenApi CLI generation: 
```
python manage.py spectacular --color --file schema.yml --validate
```


## todo
- minimal restyle
- further code polish
- fix time zone gap