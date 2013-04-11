# One Spark Ember Webapp

This is the html5 JavaScript Webapp for the One Spark collaboration plattform. It is basend on the [ember-js](http://emberjs.com/) framework as well as the [ember-data](https://github.com/emberjs/data) persistence framework  This webapp was developed during the practical course of "Service and Cloud Computing" at Chair for Computer Networks at Dresden University of Technology.
See for API Server: https://github.com/sfroestl/onespark_backend

1. Clone repository
       $ git clone https://github.com/sfroestl/onespark_backend.git

2. Install dependencies:
       $ bundle install

3. Launch development server:
       $ middleman

4. Build static page:
       $ middleman build

5. Test URI with jasmine
       $ http://localhost:4567/SpecRunner.html