# Palindrome - REST Api with a front-end UI to submit messages and verify if they are palindromes

## Getting started

### Prerequisites

### Getting the source
```
git clone whereveritis
```
Github repo is available <a href="https://github.com/dotlou/wherever">here</a>.

### Installing packages
To install the packages, you can optionally run prestart. This would happen automatically in the next step as well.
```
npm run prestart
```
### Seeding the database with some initial data
```
npm run dbseed
```
### Launching the webserver
To server at the default 3000 port:
```
npm start
```
### CSS autoprefixer
There is a gulp task (set as default) to generate CSS prefixes so you don't need to worry about it. With this in mind, make all CSS changes to root/styles/\*.css and *_NOT_* to public/css/.
Once changes have been completed, run the following command to "compile" them with the prefixes:
```
gulp
```

## API definition
The API definition is available at http://server:3000/apidoc

### Generating a fresh copy of the api documentation
The API documentation gets generated for all definitions inside the routes/ folder. You can re-generate the docs like this:
```
npm run apidoc
```
This will generate the docs into public/apidoc and thus make it available via http://server:3000/apidoc

## Testing
This project comes with tests for x and y.
### Running unit tests
Tests can be run using
```
npm run test
```

## License
This software is distributed freely under the x license.