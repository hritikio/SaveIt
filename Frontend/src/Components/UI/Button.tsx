import type { ReactElement } from "react";

interface buttonprops{
    variant:"primary" |"secondary";
    size:"sm"| "md"|"lg",
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    onClick:()=>void;

}

const variantStyles={
  "primary":"bg-purple-600 text-white",
  "secondary":"bg-purple-300 text-purple-600"

}

const defaultStyles="rounded-md flex m-4  ";

const sizeStyles={
  "sm":"px-2 py-1",
  "md":"px-4 py-2",
  "lg":"px-6  py-4",
}
 
export const Button=(props:buttonprops)=>{
 return (
   <>
     <button className={`${variantStyles[props.variant]}  ${defaultStyles} ${sizeStyles[props.size]}  `} >
      {props.startIcon? <div className="pr-2">{props.startIcon}</div>:null } {props.text} {props.endIcon}</button>
   </>
 );
}