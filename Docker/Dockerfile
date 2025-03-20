FROM python:3.11-slim

WORKDIR /src

COPY requirements.txt .
RUN pip3 install -r requirements.txt && \
    groupadd -r demouser && useradd -r -g demouser demouser && \
    chown -R demouser:demouser /src

COPY app.py .

USER demouser

ENV FLASK_APP=app.py REDIS_HOST=redis

EXPOSE 5000

CMD ["flask", "run", "-h", "0.0.0.0"]