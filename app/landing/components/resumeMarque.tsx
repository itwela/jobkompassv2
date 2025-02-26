import { cn } from "@/lib/utils";
import { Marquee } from "@/src/components/magicui/marquee";

export function Marquee3D({element}: { element: React.ReactNode}) {
    return (
      <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform:
              "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {element}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
            {element}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {element}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {element}
          </Marquee>
        </div>
   
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    );
  }

