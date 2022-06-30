Assessment Studio Developer
================================
(Mendix: see story: #824605)

# Introduction

Dear Studio Developer,

This assessment is intended to give insights on your coding and logical thinking skills, so please treat this assignment the same as if you are working for Mendix.

This assessment consists of a backlog with three User Stories that need to be implemented. You will be asked to present your results and findings either directly on a laptop or using a remote conference application depending on the circumstances.

After your presentation we will have a discussion about your implementation to understand your reasoning, chosen methodologies and technology while working on the User Stories.

Please treat this exercise as confidential so that we can reuse it for any future candidates.

If you have any questions at all, do not hesitate to contact us.

_Before starting your assignment, please run `git init && git add . && git commit -am "initial commit"` so that we can track your changes from the base line_

Good luck and enjoy!

*P.S.: Caution: Do not put this assignment in any form on a publicly available website like Github or Bitbucket*

# The Domain Model Editor

## Background information

Mendix is currently working on the first iteration of a domain model editor for web browsers. The domain model editor should make the visualisation and modelling of a Mendix application domain easier for business users.

## Backlog

### User Story 1

In order to stop using hard coded entities
For our Business Users
We will load data from data services

Acceptance Criteria:

- Data needs to be read from the mock data services.

### User Story 2

In order to logically align, order and group different entities
For our Business Users
We need draggable entities on the canvas

Acceptance Criteria:

- Entities can be dragged around.

### User Story 3

In order to store data for an entity
For our Business Users
We need a simple and quick way to add attributes/properties to entities

# Assignment

Implement the three User Stories from the backlog.
Present your results and findings on a laptop. We can provide a laptop if needed.
We'll have a discussion to understand your reasoning, chosen methodologies and technology while working on the User Stories.

# Running the application

Install nodejs

```
npm install
npm start
open http://localhost:8080
```

Mock Data services:

- http://localhost:8080/static/entities.json
- http://localhost:8080/static/coords.json
