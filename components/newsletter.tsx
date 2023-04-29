import axios from "axios";
import  { useState} from "react";
import type {FormEvent} from "react"
import classnames from "classnames"




const NewsLetter = ({darkTheme}:{darkTheme:boolean}) => {
  let [email,setEmail]= useState("");
  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("https://star-gallery.herokuapp.com/api/addEmail",{
      method:'POST',
      mode:'cors',
      cache : 'no-cache',
      credentials: 'same-origin',
      headers:{
        'Content-Type':'application/json'
      },
            redirect:'follow',
      referrerPolicy:'no-referrer',
      body:JSON.stringify({email:email})
    }).then((res) => res.json());
  };
 
  return (
    <div
      className={classnames("text-center max-w-sm m-auto bg-dark-gray rounded overflow-hidden m-16 py-8 px-4", {'bg-dark-blue' : darkTheme})}
    >
      <span
        className={classnames("text-3xl text-black-500 font-semibold", {'text-white' : darkTheme})}
      >
        Want to be updated when new awesome pics come out?
      </span>
      <span className="text-3xl text-purple-500 font-semibold">
        {" "}
        Sign up for our newsLetter.
      </span>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="w-full my-4 mx-2">
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="text"
            placeholder="Enter email"
            className="  text-gray-700  rounded px-2 py-2"
 
          />
        </div>
        <button
          className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded shadow-lg"
          type="submit"
        >
          Notify me
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
