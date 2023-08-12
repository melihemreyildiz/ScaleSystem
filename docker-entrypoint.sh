#!/bin/bash

set -e

# Make migrations and migrate the database
python manage.py makemigrations --no-input
python manage.py migrate --no-input

python manage.py makemigrations api
python manage.py migrate api

echo $RUN_FLAG

# Create a superuser if it doesn't exist
if [ "$RUN_FLAG" = "DEV" ]
then
  echo "Creating superuser..."
  python manage.py createsuperuser \
    --email=admin@trendyol.com.tr \
    --username=admin \
    --noinput \
    || echo "Superuser already exists."
  echo "Setting password for superuser..."
  echo "from django.contrib.auth import get_user_model; User = get_user_model(); user = User.objects.get(username='admin'); user.set_password('admin'); user.save();" \
    | python manage.py shell
fi



exec "$@"
