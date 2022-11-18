import { useEffect, useRef } from 'react';


export default function Display(props) {
  let { input } = props;
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ block: 'nearest', inline: 'end' });
    }
  }, [input]);

  return (
    <div className="display">
      <span className="input">{input}<span className="blinking-cursor" ref={scrollRef}>I</span></span>
    </div>
  )
}