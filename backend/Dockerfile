FROM php:8.3-cli-alpine

# Install system dependencies and PHP extensions required by Laravel & MySQL
RUN apk add --no-cache \
    curl \
    libzip-dev \
    oniguruma-dev \
    unzip \
    git \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    zip \
    bcmath

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy composer files first for layer caching
COPY composer.json composer.lock ./

RUN composer install --no-dev --no-scripts --no-interaction --prefer-dist --optimize-autoloader

# Copy application source
COPY . .

# Finish composer autoload dump and ensure writable directories exist
RUN composer dump-autoload --optimize \
    && mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8080

CMD ["sh", "-c", "php artisan migrate --force && php artisan config:cache && php artisan route:cache && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]

