"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
} from "liveblocks.config";
import { useEffect } from "react";

import Cursor from "./Cursor";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

function useLiveCursors() {
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    let scroll = {
      x: globalThis.scrollX,
      y: globalThis.scrollY,
    };

    let lastPosition: { x: number; y: number } | null = null;

    function transformPosition(cursor: { x: number; y: number }) {
      return {
        x: cursor.x / globalThis.innerWidth,
        y: cursor.y,
      };
    }

    function onPointerMove(event: PointerEvent) {
      const position = {
        x: event.pageX,
        y: event.pageY,
      };
      lastPosition = position;
      updateMyPresence({
        title: document.title,
        cursor: transformPosition(position),
      });
    }

    function onPointerLeave() {
      lastPosition = null;
      updateMyPresence({ cursor: null });
    }

    function onDocumentScroll() {
      if (lastPosition) {
        const offsetX = globalThis.scrollX - scroll.x;
        const offsetY = globalThis.scrollY - scroll.y;
        const position = {
          x: lastPosition.x + offsetX,
          y: lastPosition.y + offsetY,
        };
        lastPosition = position;
        updateMyPresence({
          title: document.title,
          cursor: transformPosition(position),
        });
      }
      scroll.x = globalThis.scrollX;
      scroll.y = globalThis.scrollY;
    }

    document.addEventListener("scroll", onDocumentScroll);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("scroll", onDocumentScroll);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [updateMyPresence]);

  const others = useOthers();

  const cursors: {
    title: string;
    x: number;
    y: number;
    connectionId: number;
  }[] = [];

  for (const { connectionId, presence } of others) {
    if (presence.cursor) {
      cursors.push({
        title: presence.title,
        x: presence.cursor.x * globalThis.innerWidth,
        y: presence.cursor.y,
        connectionId,
      });
    }
  }

  return cursors;
}

const CursorList = () => {
  const cursors = useLiveCursors();
  return (
    <>
      {cursors.map(({ title, connectionId, x, y }) => (
        <Cursor
          key={connectionId}
          title={title.replace(" - powerjade.me", "")}
          color={COLORS[connectionId % COLORS.length]}
          x={x}
          y={y}
        />
      ))}
    </>
  );
};

export const Cursors = () => {
  return (
    <RoomProvider id="home" initialPresence={{ title: "", cursor: null }}>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => <CursorList />}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
