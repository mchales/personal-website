This is a starter project for Django REST Framework applications using Djoser and `djangorestframework-simplejwt` for user authentication. The folder structure is based on [django-project-structure](https://github.com/saqibur/django-project-structure/tree/master), which provides useful information.

## Project Includes

- Custom user class with corresponding admin panel
- API versioning with `rest_framework.versioning.NamespaceVersioning`
- Automated testing (not extensive) with pytest
- Djoser authentication endpoints
- Simple JWT token blacklist endpoint (as Djoser doesn't blacklist tokens on logout)

## Project Does Not Include

- Comprehensive testing
- Cron job to remove accounts that did not verify email, or other method to handle this edge case
- Cron job to remove expired and blacklisted tokens with `flushexpiredtokens`
- A frontend (apart from the one Django REST Framework provides)
- Docker configuration (to be added in the future)
