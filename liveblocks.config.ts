import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  throttle: 100,
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string,
});

export const { RoomProvider, useOthers, useUpdateMyPresence } =
  createRoomContext<Presence>(client);

type Presence = {
  title: string;
  cursor: {
    x: number;
    y: number;
  } | null;
};
