import classNames from "classnames";

interface SkeletonProps {
  isLoading: boolean;
  className?: string;
}

export const Skeleton = ({ isLoading, className }: SkeletonProps) => {
  return (
    <>
      <div
        className={classNames(
          "bg-dark-gray/80 w-full h-[282px]",
          { "animate-pulse": isLoading },
          className
        )}
      ></div>
    </>
  );
};
