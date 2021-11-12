# Trello clone app written in Vue 3 + Typescript + Vite

This is a second version of [Trello clone](https://github.com/filiphric/trelloapp) app, which I use for my Cypress.io workshops. I create this to explain and showcase Cypress capabilities, much like [Real world application](https://github.com/cypress-io/cypress-realworld-app) by Cypress.

To install, simply clone this project and

1. `npm install`
2. `npm start`

What you can see here is pretty much still work in progress and far from done.

# How to navigate my part

I started with exploring, experiencing, and experimenting with the app, I took some notes that are worth reading since they contain a feature list, list of bugs and issues, and some other information (mostly useful for my own purposes). You can start with than in `notes/*.md`.

When I talk about testing, I mean any activity that has a potential to find bugs. A bug is anything that threatens the value of the product, an issues is anything that threatens the value of testing.

To see a list of all bugs found during my testing:

```
$ cd scripts
$ chmod u+x
$ ./get-from-report.sh bugs ../notes/*.md
```

and all issues:

```
$ cd scripts
$ chmod u+x
$ ./get-from-report.sh issues ../notes/*.md
```

To run Cypress checks, use one of the following scripts:

```
start:and:run
start:and:run:api
start:and:run:ui
```

All in all, this work is far from done, but it should be enough to see some of my skills.

There are a couple of areas that would need further testing, namely:

- list API endpoins
- card API endpoins
- lists on FE
- cards on FE
- drag and drop - lists and cards
- possible race conditions
- data load - e.g. can the API and app handle thousands of boards, lists, cards
- static analysis of the codebase - e.g. eslint reports a lot of issues in `src`
- different browser environments
- different device environment - mobile, tables, different browsers, ...
- different backends - can we use a different DB, how easy is it to connect the API to it
- different network conditions
- security topics - passwords, input data
- documentation - some form of documentation (e.g. automatically generated API docs) is healpful and can save a lof of time to different people, therefore it should probably exist
- and surely many other questions would come up in the process of testing :)
