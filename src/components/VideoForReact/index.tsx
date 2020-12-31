import * as React from 'react';
import './vfr.scss';

interface Props {
};

export default function VideoForReact(props: Props) {
  // const {visible, onMask, className, children} = props;

  return (
    <figure className="video-content">
      <video 
        className="video" 
        controls 
        preload="metadata"
        autoPlay
        loop
      >
      <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
       
      </video>
    </figure>
  );
};

VideoForReact.defaultProps = {
  children: null,
  className: '',
}
