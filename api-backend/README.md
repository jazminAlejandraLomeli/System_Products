# Back-end API con Laravel


API desarrollada en Laravel que se conecta con un front-end en React. Gestiona la autenticación de usuarios y valida las sesiones mediante tokens de Laravel Sanctum.

## Instalación

1. Crear la base de datos y especificar su nombre en el archivo `.env`.
2. Instalar dependencias y migrar la base de datos:
```bash
composer install
php artisan migrate
php artisan db:seed
php artisan serve


## Accesos de prueba

- Usuario: admin@admin.com
- Contraseña: Admin12345*

