ENVIRONMENT_FILE=.env
PROJECT_NAME=todoapp
GCP_PROJECT_NAME=todoapp-e0ae5
ENVIRONMENT_FILE=.env
DOCKER_COMPOSE=docker-compose -f ./infrastructure/docker-compose.yml --project-name $(PROJECT_NAME) --env-file $(ENVIRONMENT_FILE)
DOCKER_SHELL=sh

ifneq ("$(wildcard ${ENVIRONMENT_FILE})","")
	-include ${ENVIRONMENT_FILE}
endif

copy-env-file:
	@test -e .env || cp .env.example .env

clean-all-docker:
	cd devops; \
	sh docker-clean.sh;

lint:
	npx tsc

lint-fix:
	npm run lint:fix

install:
	npm i

uninstall:
	rm -rf node_modules && rm package-lock.json

deploy:
	npm run build && gcloud functions deploy to-do-app --entry-point handler --runtime nodejs14 --trigger-http

list-projects:
	gcloud projects list

login:
	gcloud auth login

set-project:
	gcloud config set project ${GCP_PROJECT_NAME}

run: copy-env-file
	npm run serve

get-auth-token:
	gcloud auth print-identity-token

start-docker: copy-env-file
	$(DOCKER_COMPOSE) up -d && docker ps -a && echo "Yoy should be able to use http://0.0.0.0:$(PORT)"