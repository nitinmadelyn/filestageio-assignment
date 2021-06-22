# To Do
This web application is a simple application to manage a list of things to do.

## Features
  1. Sortable Task - User can drag & drop to sort todo
  2. Due Date - User can add due date to any todo and also filter with them
  3. Infitite Scroll - User can as many todo as they want, initially 20 todos will be loaded and as user scroll to the end of the list more 20 will be leaded till all displayed.

#
## 1. Sortable Tasks 

  - User can sort any todo at any places.
  - React library used: [react-sortable-hoc](https://www.npmjs.com/package/react-sortable-hoc)
  - Here's the video to see this feature in action [Click Here](link goes here)
  - Test cases
      
      - To run test execute command `npm test` in <b>frontend</b> folder. Once cypress window open then click on the file <b>sorttodos.spec.js</b>
      - Video for test case results [Click Here](link goes here)

#
## 2. Due Date

  - User can add due date to any todo, with filter option.
  - React library used: [@material-ui/pickers](https://www.npmjs.com/package/@material-ui/pickers), [@date-io/date-fns](https://www.npmjs.com/package/@date-io/date-fns), [date-fns](https://www.npmjs.com/package/date-fns)
  - Here's the video to see this in action [Click Here](Link goes here)
  - Test cases

      - To run test execute command `npm test` in <b>frontend</b> folder. Once cypress window open then click on the file <b>addtodos.spec.js</b>

#
## 3. Infinite Scroll

  - This app supports infinite scroll, user can add as many todos as they want.
  - Initially app will load 20 todos, once user scroll down to the end it will load next 30 todos till all todos loaded.
  - React library used: [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component)
  - Test cases

      - To run test execute command `npm test` in <b>frontend</b> folder. Once cypress window open then click on the file <b>infinitescroll.spec.js</b>

#

## Infrastructure

This applications consists of two parts:
  1. Frontend: Single Page Application built with: React and Material.
  2. Backend: HTTP REST API built with Node.js, Express and MongoDB.

#
## How to run app

### <u>Frontend</u>

to start the application open the <b>terminal/command line</b> go to <b>frontend</b> folder and execute:

`npm start`

once the app is running you can open: [http://localhost:3000](http://localhost:3000) on your browser.

### <u>Backend</u>

To start the api open the <b>terminal/command line</b> go to <b>backend</b> folder and execute:

`npm start`

#
## How to run tests

### <u>Frontend</u>
Make sure frontend(react) is running.  
`npm test`

- End-to-end tests using cypress libray.
- Test case 1: [Add 60 todos](https://www.loom.com/share/d11085a390424f88a1b23ce7b663ccde) 
- Test case 2: [Add due date & filter](https://www.loom.com/share/dd9b2b5b56394bf58c5ee137888a152e)
- Test case 3: [Infinite scroll](https://www.loom.com/share/883c89b8ab5249c8980bc09b7ce17936)


### <u>Backend</u>
Make sure backend server(nodejs) is not running.  
`npm test`

- CRUD operation in todos.
- Library used: mocha, chai, chai-http
- Test cases: [All CRUD operation on todos](https://www.loom.com/share/4df5b3b676e74cac8dbc84a8db100780)

#
### <u>Additional Tasks</u>

  - <b>Frontend</b>: Refactor initial code, converted all section in to parent-child components. Added ErrorBoundry class to catch all run time error and log them into <b>logs</b> collection into database.
  - <b>Backend</b>: Refactor initial code, converted apis routes for `todo` & `log` with catching run time error and log them into <b>logs</b> collection into database.
