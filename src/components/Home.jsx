import React, { useState,useEffect,useRef } from "react";
import react from "react";
import "./home.css"
import * as faceapi from "face-api.js"



export const Home=({image})=>{
    const imgRef=useRef()
    const canvasRef=useRef()
  
  const HandleImage=async()=>{
  const detections=await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
  console.log(detections);
  
  
  canvasRef.current.innerHtml=faceapi.createCanvasFromMedia(imgRef.current);
  faceapi.matchDimensions(canvasRef.current,{
    height:400,
    width:500
  })
  const Resized=faceapi.resizeResults(detections,{
    height:400,
    width:500
  })
  faceapi.draw.drawDetections(canvasRef.current,Resized); 
  faceapi.draw.drawFaceExpressions(canvasRef.current,Resized)
  faceapi.draw.drawFaceLandmarks(canvasRef.current,Resized)
  
  
  }
    useEffect(()=>{
      const LoadModels=()=>{
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models")
        ]).
        then(HandleImage).catch((e)=>console.log(e))
      }
  imgRef.current  && LoadModels()
    },[])
return(
    <div> 
  
    <div className="div1">
           
            <img src="https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXN8ZW58MHx8MHx8&w=1000&q=80"   crossOrigin="anonymous" ref={imgRef}

     ></img>
            <canvas ref={canvasRef} height={400} width={500} className="container"> </canvas>
        </div>
    </div>
)
}