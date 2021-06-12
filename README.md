# My Porfolio Provider

- [My Porfolio Provider](#my-porfolio-provider)
  - [Description](#description)
  - [Installation and Usage](#installation-and-usage)
    - [Development server](#development-server)
    - [Build](#build)
    - [Running unit tests](#running-unit-tests)
    - [Running end-to-end tests](#running-end-to-end-tests)
  - [Visuals](#visuals)
  - [Url of the app deployed](#url-of-the-app-deployed)
  - [Project Timeline](#project-timeline)

## Description

This project is a **Angular PWA** developed to provide content for my [API portfolio](https://github.com/Omar-Pecos/api-node-portfolio) in a easy and visual way for me. Right now, it supports uploading/editing new content for technologies, profile, courses and projects and it has totally online/offline capabilities.

It uses **@angular/pwa** module and **IndexedDB (Dexie.js)** for the offline operations. I use a abstract BaseService with generic type that can be extended by others services making it so reusable, and in all the application I use **Observables** and **async pipe**, **pipe** and **map** operators in services and **sweetalert** for displaying notifications. It uses **Auth Guards** to protect some routes that only can be only visited by auth users or admins.

The original idea is to provide data to API with this app and then build a static site using [Gridsome](https://gridsome.org/)

## Installation and Usage

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Visuals

![alt text](https://res.cloudinary.com/omarpvcloud/image/upload/v1606075264/Projects/api-node-portfolio/techs_kznzb3.png "Techs")

![alt text](https://res.cloudinary.com/omarpvcloud/image/upload/v1606075264/Projects/api-node-portfolio/profile_hmsgwa.png "Profile")

![alt text](https://res.cloudinary.com/omarpvcloud/image/upload/v1606075264/Projects/api-node-portfolio/project_dnskc4.png "Add new project")

## Url of the app deployed

> [My Portfolio Provider](https://portfolio-provider-pwa.vercel.app/)

Deployed with [Vercel](https://vercel.com/)

## Project Timeline

![alt text](https://res.cloudinary.com/omarpvcloud/image/upload/v1606092658/Projects/api-node-portfolio/gantt_portfolioprovider_e5p4j9.png "Gantt Diagram")

###### tags: `Documentation` `Angular` `PWA`
