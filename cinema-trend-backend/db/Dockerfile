# db/Dockerfile.postgres

FROM postgres:14

# Устанавливаем необходимые пакеты для генерации локалей
RUN apt-get update && apt-get install -y locales

# Генерируем локаль ru_RU.UTF-8
RUN sed -i 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen ru_RU.UTF-8

# Устанавливаем переменные окружения для локали
ENV LANG=ru_RU.UTF-8
ENV LANGUAGE=ru_RU:ru
ENV LC_ALL=ru_RU.UTF-8

# Устанавливаем локаль по умолчанию для инициализации базы данных
ENV POSTGRES_INITDB_ARGS="--locale=ru_RU.UTF-8"
