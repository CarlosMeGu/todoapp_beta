ENVIRONMENT_FILE=.env
PROJECT_NAME=todo-app
GCP_PROJECT_NAME=todoapp-e0ae5


copy-env-file:
	@test -e .env || cp .env.example .env

clean-all:
	cd devops; \
	sh docker-clean.sh;

lint:
	npm run lint

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
