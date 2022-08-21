ENVIRONMENT_FILE=.env
PROJECT_NAME=todo-app
GCP_PROJECT_NAME=todoapp-e0ae5

clean-all:
	cd devops; \
	sh docker-clean.sh;

lint:
	npm run lint

lint-fix:
	npm run lint:fix

install:
	npm i

#build:
#	gcloud builds submit --tag gcr.io/$(GCP_PROJECT_NAME)/$(PROJECT_NAME)-image .
#
#deploy:
#	gcloud beta run deploy $(PROJECT_NAME) --image gcr.io/$(GCP_PROJECT_NAME)/$(PROJECT_NAME)-image --region us-central1 --platform managed --allow-unauthenticated --quiet --add-cloudsql-instances=$(INSTANCE_CONNECTION)
#
#build-deploy: build deploy
deploy:
	npm run build && gcloud app deploy

list-projects:
	gcloud projects list

login:
	gcloud auth login

set-project:
	gcloud config set project ${GCP_PROJECT_NAME}

run:
	npm run serve

get-auth-token:
	gcloud auth print-identity-token
