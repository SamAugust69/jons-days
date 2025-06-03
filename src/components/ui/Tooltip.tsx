import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";

type TooltipContextType = {
  shown: boolean;
  open: () => void;
  close: () => void;
  setTooltipTrigger: (element: JSX.Element) => void;
  setTooltipContent: (element: JSX.Element) => void;
};

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

const ToolTipContent = ({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  const tooltipContext = useContext(TooltipContext);
  if (!tooltipContext) {
    throw new Error("ToolTipContent must be used within a ToolTip component");
  }

  const content = (
    <div
      {...props}
      className={cn(
        "hidden group-hover:block absolute -top-8 bg-neutral-100 px-2 py-1 rounded left-1/2 transform -translate-x-1/2 text-sm",
        className
      )}
    >
      {children}
    </div>
  );

  tooltipContext.setTooltipContent(content);
  return null;
};

const ToolTipTrigger = ({ children }: { children: JSX.Element }) => {
  const tooltipContext = useContext(TooltipContext);
  if (!tooltipContext) {
    throw new Error("ToolTipTrigger must be used within a ToolTip component");
  }

  tooltipContext.setTooltipTrigger(children);
  return null;
};

const ToolTip = ({ children }: { children: ReactNode }) => {
  const [shown, setShown] = useState(false);
  const [tooltipTrigger, setTooltipTrigger] = useState<JSX.Element | null>(
    null
  );
  const [tooltipContent, setTooltipContent] = useState<JSX.Element | null>(
    null
  );

  const contextValue: TooltipContextType = {
    shown,
    open: () => setShown(true),
    close: () => setShown(false),
    setTooltipTrigger,
    setTooltipContent,
  };

  if (!tooltipTrigger) {
    return (
      <TooltipContext.Provider value={contextValue}>
        {children}
      </TooltipContext.Provider>
    );
  }

  return (
    <TooltipContext.Provider value={contextValue}>
      {cloneElement(tooltipTrigger, {
        className: cn(tooltipTrigger?.props.className, "group relative"),
        children: (
          <>
            {tooltipTrigger.props.children}
            {tooltipContent}
          </>
        ),
      })}
    </TooltipContext.Provider>
  );
};

export { ToolTipContent, ToolTipTrigger, ToolTip };
