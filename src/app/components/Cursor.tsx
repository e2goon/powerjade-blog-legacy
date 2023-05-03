import { SVGProps } from "react";

const CursorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    width={40}
    height={40}
    viewBox="0 0 32 32"
    {...props}
  >
    <defs>
      <path id="a" d="M0 0h32v32H0z" />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <path
      fill="currentColor"
      d="M11.3 20.4c-.3-.4-.6-1.1-1.2-2-.3-.5-1.2-1.5-1.5-1.9-.2-.4-.2-.6-.1-1 .1-.6.7-1.1 1.4-1.1.5 0 1 .4 1.4.7.2.2.5.6.7.8.2.2.2.3.4.5.2.3.3.5.2.1-.1-.5-.2-1.3-.4-2.1-.1-.6-.2-.7-.3-1.1-.1-.5-.2-.8-.3-1.3-.1-.3-.2-1.1-.3-1.5-.1-.5-.1-1.4.3-1.8.3-.3.9-.4 1.3-.2.5.3.8 1 .9 1.3.2.5.4 1.2.5 2 .2 1 .5 2.5.5 2.8 0-.4-.1-1.1 0-1.5.1-.3.3-.7.7-.8.3-.1.6-.1.9-.1.3.1.6.3.8.5.4.6.4 1.9.4 1.8.1-.4.1-1.2.3-1.6.1-.2.5-.4.7-.5.3-.1.7-.1 1 0 .2 0 .6.3.7.5.2.3.3 1.3.4 1.7 0 .1.1-.4.3-.7.4-.6 1.8-.8 1.9.6v2.3c0 .4-.1 1.3-.2 1.7-.1.3-.4 1-.7 1.4 0 0-1.1 1.2-1.2 1.8-.1.6-.1.6-.1 1s.1.9.1.9-.8.1-1.2 0c-.4-.1-.9-.8-1-1.1-.2-.3-.5-.3-.7 0-.2.4-.7 1.1-1.1 1.1-.7.1-2.1 0-3.1 0 0 0 .2-1-.2-1.4l-1.1-1.1-1.1-.7z"
      clipPath="url(#b)"
    />
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.75}
      d="M11.3 20.4c-.3-.4-.6-1.1-1.2-2-.3-.5-1.2-1.5-1.5-1.9-.2-.4-.2-.6-.1-1 .1-.6.7-1.1 1.4-1.1.5 0 1 .4 1.4.7.2.2.5.6.7.8.2.2.2.3.4.5.2.3.3.5.2.1-.1-.5-.2-1.3-.4-2.1-.1-.6-.2-.7-.3-1.1-.1-.5-.2-.8-.3-1.3-.1-.3-.2-1.1-.3-1.5-.1-.5-.1-1.4.3-1.8.3-.3.9-.4 1.3-.2.5.3.8 1 .9 1.3.2.5.4 1.2.5 2 .2 1 .5 2.5.5 2.8 0-.4-.1-1.1 0-1.5.1-.3.3-.7.7-.8.3-.1.6-.1.9-.1.3.1.6.3.8.5.4.6.4 1.9.4 1.8.1-.4.1-1.2.3-1.6.1-.2.5-.4.7-.5.3-.1.7-.1 1 0 .2 0 .6.3.7.5.2.3.3 1.3.4 1.7 0 .1.1-.4.3-.7.4-.6 1.8-.8 1.9.6v2.3c0 .4-.1 1.3-.2 1.7-.1.3-.4 1-.7 1.4 0 0-1.1 1.2-1.2 1.8-.1.6-.1.6-.1 1s.1.9.1.9-.8.1-1.2 0c-.4-.1-.9-.8-1-1.1-.2-.3-.5-.3-.7 0-.2.4-.7 1.1-1.1 1.1-.7.1-2.1 0-3.1 0 0 0 .2-1-.2-1.4l-1.1-1.1-1.1-.7z"
      clipPath="url(#b)"
    />
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={0.75}
      d="M19.6 20.7v-3.4m-2 3.4-.1-3.4m-1.9 0v3.4"
      clipPath="url(#b)"
    />
  </svg>
);

export default function Cursor({ title, color, x, y }: Props) {
  return (
    <div
      className="fixed flex flex-col items-start"
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        transition: "transform 0.4s",
      }}
    >
      <CursorIcon color={color} className="-rotate-30" />
      <div
        className="px-2 py-1 text-xs leading-none rounded-full max-w-[120px] text-ellipsis whitespace-nowrap overflow-hidden transition-all hover:max-w-full"
        style={{ backgroundColor: `${color}` }}
      >
        {title}
      </div>
    </div>
  );
}

type Props = {
  title: string;
  color: string;
  x: number;
  y: number;
};
