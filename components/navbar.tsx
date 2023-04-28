import classNames from "classnames";


const Navbar = ({darkTheme}:{darkTheme:boolean}) => {
   
  return (
    <div>
      <nav
        className={classNames("flex items-center justify-between flex-wrap bg-purple-200 p-6", {'bg-[#252525]': darkTheme})}
      >
        <div
          className="flex items-center flex-col sm:flex-row flex-shrink-0 text-indigo-500 mr-6"
        >
          <h1 className="font-light text-4xl">Star Gallery</h1>
          <p className="text-sm pt-10 text-purple-500 hidden sm:block">
            made with pixabay api...
          </p>
        </div>

      </nav>

    </div>
  );
};

export default Navbar;
