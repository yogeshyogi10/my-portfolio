#!/bin/sh
set -e

echo "⏳  Waiting for PostgreSQL..."
# Simple retry loop — waits until Django can reach the DB
until python -c "
import os, psycopg2, sys
try:
    psycopg2.connect(
        dbname=os.environ['DB_NAME'],
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASSWORD'],
        host=os.environ['DB_HOST'],
        port=os.environ['DB_PORT'],
    )
except Exception:
    sys.exit(1)
"; do
  echo "  🔄  DB not ready — retrying in 2s..."
  sleep 2
done

echo "✅  PostgreSQL is ready."

echo "🔧  Applying migrations..."
python manage.py migrate --noinput

echo "📦  Collecting static files..."
python manage.py collectstatic --noinput

echo "🚀  Starting Gunicorn..."
exec gunicorn portfolio_backend.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
