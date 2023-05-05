import { useMemo, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import debounce from "lodash.debounce";
import classnames from "classnames";

interface SearchBarProps {
  darkTheme: boolean;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({ darkTheme, setSearchTerm }: SearchBarProps) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const debounceRequest = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  useEffect(() => {
    return () => {
      debounceRequest.cancel();
    };
  }, []);
  return (
    <>
      <div className="max-w-sm lg:max-w-[500px] rounded overflow-hidden mx-auto">
        <div className="flex items-center pl-6 border border-dark-gray rounded-full relative focus:outline-dark-blue">
          <div className="absolute top-[50%] translate-y-[-50%] left-2 w-[16px] h-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-full h-full fill-dark-gray"
            >
              {/* Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search over 1000 images..."
            onChange={debounceRequest}
            className={classnames(
              "appearance-none bg-transparent w-full text-dark p-4  focus:outline-none",
              { "text-white": darkTheme }
            )}
          />
        </div>
      </div>
    </>
  );
};
