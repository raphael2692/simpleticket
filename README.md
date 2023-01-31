# Simpleticket

Basic web application built with Django REST Framework and Angular2, for educational pourposes. It has a little more feature then the usual 'TODO like' examples.

Schema: Ticket <- User

## Features

1. django admin panel
2. CRUD support
3. jwt authentication
4. related records management


## setup

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

### Swagger url:
- http://localhost:8000/api/schema/swagger-ui/
- http://localhost:8000/api/schema/redoc/

CLI: 

```
python manage.py spectacular --color --file schema.yml --validate
```


## todo
- minimal restyle
- further code polish
- refresh token support on frontend
- fix time zone gap