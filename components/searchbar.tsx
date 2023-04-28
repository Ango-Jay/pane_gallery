import { useMemo, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import debounce from "lodash.debounce";
import classnames from "classnames"


interface SearchBarProps {
    darkTheme:boolean;
    setSearchTerm:Dispatch<SetStateAction<string>>
}

export const SearchBar = ({
darkTheme,
setSearchTerm
}:SearchBarProps)=>{
    const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
      };
    
      const debounceRequest = useMemo(() => {
        return debounce(handleChange, 300);
      }, []);
    
      useEffect(() => {
        return () => {
          debounceRequest.cancel();
        };
      }, []);
    return(
        <>
            <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
        <div className="flex items-center  py-2">
          <input
            type="text"
            placeholder="Enter Search Term..."
            onChange={debounceRequest}
            className={classnames("appearance-none bg-transparent border-b border-b-2 border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none", {'text-white': darkTheme})}
          />
        </div>
    </div>
        </>
    )
}