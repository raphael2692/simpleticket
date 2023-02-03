# rm db.sqlite3

DJANGO_SUPERUSER_PASSWORD=123
export DJANGO_SUPERUSER_PASSWORD

pip install -r requirements.txt
pip install psycopg2
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --noinput --username admin --email admin@email.com  --skip-checks

gunicorn simpleticket.wsgi:application --bind 0.0.0.0:8000 --reload