# Thesis book for ITP NYU 2017 Spring

Demo: [https://thesis-book-itp-2017.firebaseapp.com](https://thesis-book-itp-2017.firebaseapp.com)

### Directory Layout

```shell
├── components/                 # Shared or generic UI components
│   ├── Button/                 # Button component
│   ├── Layout/                 # Website layout component
│   ├── Link/                   # Link component to be used instead of <a>
│   └── ...                     # etc.
├── docs/                       # Documentation to the project
├── node_modules/               # 3rd-party libraries and utilities
├── src/                        # Application source code
│   ├── about/                  # About page
│   ├── error/                  # Error page
│   ├── home/                   # Home page
│   ├── history.js              # Handles client-side navigation
│   ├── main.js                 # <== Application entry point <===
│   ├── router.js               # Handles routing and data fetching
│   ├── routes.json             # This list of application routes
│   └── store.js                # Application state manager (Redux)
├── public/                     # Static files such as favicon.ico etc.
│   ├── dist/                   # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── ...                     # etc.
├── test/                       # Unit and integration tests
├── tools/                      # Utility and helper classes
└── package.json                # The list of project dependencies and NPM scripts
```

### Getting Started

**Step 1**. Make sure that you have [Node.js](https://nodejs.org/) v6 or newer and
[Yarn](https://yarnpkg.com/) installed on your development machine.

**Step 2**. Clone this repository (alternatively, use [Yeoman
generator](https://github.com/kriasoft/react-static-boilerplate/tree/generator-react-static) to
bootstrap your project):

```shell
$ git clone -o react-static-boilerplate -b master --single-branch \
      https://github.com/kriasoft/react-static-boilerplate.git MyApp
$ cd MyApp
$ yarn install                  # Install project dependencies listed in package.json
```


**Step 3**. Compile and launch your app by running:

```shell
$ yarn start                    # Compiles the app and opens it in a browser with "live reload"
```

You can also test your app in release (production) mode by running `yarn start -- --release` or
with HMR and React Hot Loader disabled by running `yarn start -- --no-hmr`. The app should become
available at [http://localhost:3000/](http://localhost:3000/).


### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```shell
$ yarn lint                     # Check JavaScript and CSS code for potential issues
$ yarn test                     # Run unit tests. Or, `yarn run test:watch`
```


### How to Deploy

Update `publish` script in the [`tools/publish.js`](tools/publish.js) file with your full Firebase
project name as found in your [Firebase console](https://console.firebase.google.com/). Note that
this may have an additional identifier suffix than the shorter name you've provided. Then run: 

```shell
$ yarn publish                  # Builds and deployes the app to Firebase
```

The first time you publish, you will be prompted to authenticate with Google and generate an
authentication token in order for the publish script to continue.

![publish](https://koistya.github.io/files/react-static-boilerplate-publish.gif)

If you need to build the project without publishing it, simply run:

```shell
$ yarn build                    # Compiles the app into the /public/dist folder
```


### How to publish the updated site

```shell
$ yarn build
$ firebase serve
$ firebase deploy
```
# thesisBook

Based on [React Static Boilerplate](https://github.com/kriasoft/react-static-boilerplate) by Konstantin Tarkus ([@koistya](https://twitter.com/koistya))
