# vtk_js_app_webpack
An example VTK app using webpack

based on https://kitware.github.io/vtk-js/docs/vtk_vanilla.html

::
  
  npm init
  npm install @kitware/vtk.js
  npm install -D webpack-cli webpack webpack-dev-server
  export NODE_OPTIONS=--openssl-legacy-provider
  npm run build
  npm run start

To run with your webcam locally, you'll need to add a security exception. On google-chrome you can start it with this option --unsafely-treat-insecure-origin-as-secure="http://localhost:8080/"
