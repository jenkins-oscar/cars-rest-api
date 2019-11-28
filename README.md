# README

## Cars

a [Sails](http://sailsjs.org) application that can be used while you test Docker Containers including Orchestration using Kubernetes

This is a sample REST API project based on SailsJS, showcases blueprints, actions and other out of the box capabilities. It also showcases how to use the ELK stack \(Elasticsearch, Logstash, Kibana\), models have a coordinates field, and therefore you can show cars on the map within Kibana visualizations.

### Overview

The cars-api App demonstrates how to use the Microservice API Gateway Pattern.

### Architecture

The following components are part of the overall solution

* Cars REST API
* Search Service \(Elasticsearch\)
* MongoDB
* Kong API Gateway

### API Gateway

Use Apollo for GraphQL API Gateway. All requests are handled by the gateway.

### GraphQL Middleware

The Cars API also comes with a custom middleware that can serve GraphQL and respond to queries. This middleware is found under `config/http.js` You can disable this via the environment variable `DISABLE_GRAPHQL` and setting that to `false`.

### Search

ElasticSearch is used by a custom SailsJS Hook to be able to index Car and Person objects at creation and update time. This effectively updates the index accordingly.

### Swagger API Documentation

The sailsjs-swagger and swagger-ui are used to product the REST API documentation accessible via [http://localhost:1337/docs](http://localhost:1337/docs) which brings up the Swagger UI

## Features

The app comes with various capabilities in terms of deployment.

* Can can run as a Docker container by using the docker-compose.yaml
* Can be deployed to a Kubernetes cluster by installing it via `helm`
* Enable data seed by setting the `DISABLE_SAILS_SEED` to `false` and MongoDB + Elasticsearch \(if enabled\) will have the initial data.

### Environment Variables

| NAME | DESCRIPTION | VALUE |
| :--- | :--- | :--- |
| ENABLE\_ELASTICSEARCH | disables/enables Elasticsearch | true |
| DISABLE\_SAILS\_SEED | Useful if you want to quickly have some sample data | false |
| DISABLE\_GRAPHQL | true disables the middleware, false enables it | false |

