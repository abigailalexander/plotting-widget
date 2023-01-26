import React from 'react';
import { useState, useEffect } from 'react';

export const VideoView = (props: {url: string}): JSX.Element => {
    const {
        width,
        height
    } = useWindowDimensions()
    return (
      <div>
        <h1 className="text-heading">
          iframe displaying stream
        </h1>
        <iframe 
        title="a title" 
        src={props.url}
        width={width- 20}
        height={height-20}
        >
        </iframe>
        <h1 className="text-heading">
          img tag displaying stream
        </h1>
        <img
        width={width-20}
        height={height-20}
        alt="stream"
        src={props.url}
      />
      </div>
    );
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }
  