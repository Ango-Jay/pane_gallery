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
      className={classnames("overflow-hidden", {'bg-dark-blue' : darkTheme})}
    >
      <p
      className="text-light"
      >
      Want to be updated when new awesome pics come out? 
      </p>
      <p
      className="text-light"
      >
  Sign up for our newsLetter.
      </p>
      <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
        <div className="w-full my-4  rounded-full relative">
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="text"
            placeholder="Enter email"
            className="appearance-none bg-white w-full rounded-full text-dark p-3  focus:outline-darkblue"
 
          />
        </div>
        <button
          className="flex-shrink-0 min-w-[100px] bg-dark-blue text-sm text-white p-3 rounded-full shadow-sm btn-style"
          type="submit"
        >
          Notify me
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
