"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn("flex flex-col gap-0 border-t border-line", className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "group relative flex w-full items-center gap-4 border-b border-line px-1 py-6 text-start transition-colors duration-300",
        "before:absolute before:inset-y-0 before:start-0 before:w-[2px] before:bg-transparent before:transition-colors before:duration-300",
        "ps-4 text-muted hover:text-fg",
        "data-[state=active]:text-fg data-[state=active]:before:bg-accent",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      className={cn("focus-visible:outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
