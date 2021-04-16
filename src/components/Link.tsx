import React from "react";

interface Link{
    description : string;
    url : string;
}

interface LinkProps{
    link : Link
}

const Link : React.FC<LinkProps>  = (props) =>{
  const {link} = props;
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  )
}

export default Link;
