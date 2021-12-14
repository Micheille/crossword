# crossword
## Серверная часть
### Как запустить:
1. Клонируем проект с помощью git clone https://github.com/Micheille/crossword.git
2. Переходим в директорию server:  cd server
3. Собираем докер-образ: docker build --tag=crossword-server:latest .
4. Запускаем контейнер: docker run -d -p8080:8080 crossword-server:latest

Готово! Сервер запущен!

**Чтобы убедиться, что все прошло удачно:**

Get-запрос http://localhost:8080/ping должен отвечать со статусом 200.

### Технологии:
Серверная часть приложения по составлению и разгадыванию кроссвордов написана на языке java с использованием фреймворка Spring и представляет собой REST-API сервис. 

### OpenAPI спецификация
Увидеть спецификацию можно при запущенном приложении по адресу http://localhost:8080/swagger-ui/index.html
