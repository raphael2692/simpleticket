rm db.sqlite3

DJANGO_SUPERUSER_PASSWORD=123
export DJANGO_SUPERUSER_PASSWORD

pip install pip --upgrade
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --noinput --username admin --email admin@email.com  --skip-checks

python manage.py runserver 0.0.0.0:8000