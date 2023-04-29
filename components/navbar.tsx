import classNames from "classnames";

const Navbar = ({ darkTheme }: { darkTheme: boolean }) => {
  return (
    <div
    className={classNames(
      "flex items-center justify-between flex-wrap bg-dark-gray p-6",
      { "bg-dark-blue": darkTheme }
    )} 
  >
      <nav
    className="container mx-auto px-6 sm:px-10"
      >
        <div className="flex items-center flex-col sm:flex-row flex-shrink-0 text-white mr-6">
          <a href="#" className="font-bold text-xl text-dark-blue uppercase h-[36px] flex items-center relative pl-[5.1rem]">

              <div className="absolute top-[50%] translate-y-[-50%] left-0 w-[5rem] h-[5rem] pt-1 flex">
             <img src="/assets/icons/logo.svg" alt="pane gallery" />
            
              </div>
              pane gallery
          </a>
      <button className="p-3 rounded-full bg-dark-blue text-light ml-auto btn-style flex items-center justify-center w-[150px] min-w-[150px]">
        <span className="flex w-[20px] h-[20px] mr-2">
          <img src="/assets/icons/cloud-arrow-up-solid.svg" alt="upload" />
        </span>
        Upload
      </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
