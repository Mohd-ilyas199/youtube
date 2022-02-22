import React, { useState,useRef,useEffect } from "react";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import * as faceapi from "face-api.js";


export const  WebcamCapture= ()=> {
const videoRef=useRef()

  const video = document.getElementById('video')
const MODEL_URL=process.env.PUBLIC_URL + `/models`;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
]).then(startVideo)



function startVideo() {

  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.log("error",err)
  )

}

video?.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions().detectAllFaces())
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})

    return(
  <div>
      <video id="video" ref={videoRef} width="720" height="560" autoPlay muted></video>
      <script defer src="face-api.min.js"></script>
      </div>
  );
  
 
}

