# Web-приложение для создания и разгадывания кроссвордов
## Как запустить весь проект
1. Клонируем проект: git clone https://github.com/Micheille/crossword.git
2. Переходим в папку поекта: cd crossword
3. Запускаем docker-compose: docker-compose up -d

Готово! Приложение запущено, можно пользоваться!

**Чтобы убедиться, что все прошло удачно:**

Переходим по адресу http://localhost:3000 и видим главную страницу приложения.

## Клиентская часть
### Как запустить отдельно клиентскую часть:
1. Клонируем проект: git clone https://github.com/Micheille/crossword.git
2. Переходим в директорию client:  cd crossword/client
3. Собираем докер-образ: docker build --tag=crossword-client:latest .
4. Запускаем контейнер: docker run -d -p3000:3000 crossword-client:latest

Готово! Клиент запущен!

**Чтобы убедиться, что все прошло удачно:**

Переходим по адресу http://localhost:3000 и видим главную страницу приложения.

## Серверная часть
### Как запустить отдельно серверную часть:
1. Клонируем проект: git clone https://github.com/Micheille/crossword.git
2. Переходим в директорию server:  cd crossword/server
3. Собираем докер-образ: docker build --tag=crossword-server:latest .
4. Запускаем контейнер: docker run -d -p8080:8080 crossword-server:latest

Готово! Сервер запущен!

**Чтобы убедиться, что все прошло удачно:**

Get-запрос http://localhost:8080/ping должен отвечать со статусом 200.

### Технологии:
Серверная часть приложения по составлению и разгадыванию кроссвордов написана на языке java с использованием фреймворка Spring и представляет собой REST-API сервис. 

### OpenAPI спецификация
Увидеть спецификацию можно при запущенном приложении по адресу http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/
