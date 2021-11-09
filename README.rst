SciKit-Surgery In-Browser Augmented Reality
===========================================

This is an attempt to see if we can run augmented reality in your browser, combining model visualisation with vtk.js with a live camera feed.

Try it here `here`_.

based on https://kitware.github.io/vtk-js/docs/vtk_vanilla.html

::
  
  npm init
  npm install @kitware/vtk.js
  npm install -D webpack-cli webpack webpack-dev-server
  export NODE_OPTIONS=--openssl-legacy-provider
  npm run build
  npm run start

To run with your webcam locally, you'll need to add a security exception. On google-chrome you can start with. 

::
  google-chrome --unsafely-treat-insecure-origin-as-secure="http://localhost:8080/" http://localhost:8080/

.. _`here`: https://scikit-surgery.github.io/browser_ar/
