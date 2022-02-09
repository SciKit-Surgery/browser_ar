import '@kitware/vtk.js/favicon.js';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry.js';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor.js';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource.js';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper.js';
import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow.js';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow.js';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor.js';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer.js';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera.js';

import {coneactor} from './sksAnatomy.js'

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const renderWindow = vtkRenderWindow.newInstance();
const renderer = vtkRenderer.newInstance({ background: [0.0, 0.0, 0.0] });
renderer.setBackground([0.0, 0.0, 0.0, 0.0]);
renderWindow.addRenderer(renderer);

// ----------------------------------------------------------------------------
// Simple pipeline ConeSource --> Mapper --> Actor
// ----------------------------------------------------------------------------

const actor = coneactor();

// ----------------------------------------------------------------------------
// Add the actor to the renderer and set the camera based on it
// ----------------------------------------------------------------------------

renderer.addActor(actor);
renderer.resetCamera();

// ----------------------------------------------------------------------------
// Use OpenGL as the backend to view the all this
// ----------------------------------------------------------------------------

const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();

renderWindow.addView(openglRenderWindow);

// ----------------------------------------------------------------------------
// Create a div section to put this into
// ----------------------------------------------------------------------------

const container = document.getElementById('foreground');
openglRenderWindow.setContainer(container);

// ----------------------------------------------------------------------------
// Capture size of the video window and set it to the renderWindow
// ----------------------------------------------------------------------------
const video_container = document.getElementById('videoElement');
const { width, height } = video_container.getBoundingClientRect();
openglRenderWindow.setSize(width, height);

// ----------------------------------------------------------------------------
// Setup an interactor to handle mouse events
// ----------------------------------------------------------------------------

const interactor = vtkRenderWindowInteractor.newInstance();
interactor.setView(openglRenderWindow);
interactor.initialize();
interactor.bindEvents(container);

// ----------------------------------------------------------------------------
// Setup interactor style to use
// ----------------------------------------------------------------------------

interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());


function offset(el) {
	    var rect = el.getBoundingClientRect(),
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

window.addEventListener('resize', function(event) {
	let vid_el = document.getElementById("videoElement");
	let vid_divOffset = offset(vid_el);
	let vtk_divOffset = offset(container);
	console.log('window resize:', {
		vid_width: vid_el.clientWidth,
		vid_height: vid_el.clientHeight,
		vid_offset_left: vid_divOffset.left,
		vid_offset_top: vid_divOffset.top,
		vtk_width: container.clientWidth,
		vtk_height: container.clientHeight,
		vtk_offset_left: vtk_divOffset.left,
		vtk_offset_top: vtk_divOffset.top,
		something_else: vid_el.srcObject,
	});

}, true);
