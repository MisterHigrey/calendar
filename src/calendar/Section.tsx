import clsx from "clsx";

interface Props extends React.PropsWithChildren {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Section: React.FC<Props> = ({
  onClick,
  children,
  className,
  isActive = false,
}) => {
  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className={clsx(
        "h-10 flex items-center justify-center select-none transition-colors rounded-full",
        {
          "cursor-pointer hover:bg-gray-100 active:bg-gray-200":
            !isActive && onClick,
          "font-bold text-white bg-green-600 rounded-full": isActive,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Section;
