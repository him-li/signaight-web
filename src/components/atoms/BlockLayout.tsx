import { useState, type ReactNode } from "react";
import { Button, Card, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { Icons } from "@/components/atoms/Icons";
import Display from "@/components/atoms/Display";

type BlockLayoutProps = {
  id?: string;
  isExpandable?: boolean;
  isVisible?: unknown;
  flex?: "row" | "col";
  icon?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
};

export default function BlockLayout({
  id,
  isExpandable = false,
  isVisible = true,
  flex = "col",
  icon,
  title,
  subtitle,
  children,
}: BlockLayoutProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const hasChildren =
    children !== undefined &&
    children !== null &&
    children !== "" &&
    (Array.isArray(children) ? children.length > 0 : children !== <></>);

  if (!hasChildren) return null;
  const handleExpansion = () => {
    setIsExpanded((prev) => (prev === false ? true : false));
  };
  return (
    <Display when={isVisible} fallback={<></>}>
      <motion.section id={id} layout>
        <Card className="break-inside-avoid transition-all shadow-lg duration-300 ease-in-out hover:bg-default-hover">
          <Card.Header className="flex flex-row justify-between items-center h-fit w-full overflow-auto">
            <Card.Title className="flex items-center-safe gap-2 text-nowrap">
              {icon}
              {title}
            </Card.Title>
            <div className="flex justify-end-safe grow gap-1">
              {subtitle}
              <Tooltip>
                <Tooltip.Content>
                  {isExpanded ? "Collapse" : "Expand"}
                </Tooltip.Content>
                <Button
                  aria-label={isExpanded ? `Collapse ${title}` : `Expand ${title}`}
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  onPress={handleExpansion}
                  className={isExpandable ? "rounded-full" : "hidden"}
                >
                  {isExpanded ? <Icons.Minimize /> : <Icons.Maximize />}
                </Button>
              </Tooltip>
            </div>
          </Card.Header>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card.Footer
              className={`flex ${flex === "row" ? "flex-row flex-wrap" : "flex-col flex-nowrap"} ${isExpanded ? "max-h-fit" : "max-h-[calc(100svh-16rem)] md:max-h-[40vh]"} justify-start items-start w-full relative gap-2 text-xs overflow-auto px-4 pb-4 duration-300`}
            >
              {children}
            </Card.Footer>
          </motion.div>
        </Card>
      </motion.section>
    </Display>
  );
}
