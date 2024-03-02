import React, { useMemo } from "react";
import { Avatar } from "./Avatar";
import { useOthers, useSelf } from "@/liveblocks.config";
import { AnimatePresence, motion } from "framer-motion";
import { generateRandomName } from "@/lib/utils";

/**
 * This file shows how to add live avatars like you can see them at the top right of a Google Doc or a Figma file.
 *
 * The users avatar and name are not set via the `useMyPresence` hook like the cursors.
 * They are set from the authentication endpoint.
 *
 * See pages/api/liveblocks-auth.ts and https://liveblocks.io/docs/api-reference/liveblocks-node#authorize for more information
 */

const MAX_OTHERS = 3;

const animationProps = {
  initial: { width: 0, transformOrigin: "left" },
  animate: { width: "auto", height: "auto" },
  exit: { width: 0 },
  transition: {
    type: "spring",
    damping: 15,
    mass: 1,
    stiffness: 200,
    restSpeed: 0.01,
  },
};

const avatarProps = {
  style: { marginLeft: "-0.45rem" },
  size: 48,
  outlineWidth: 3,
  outlineColor: "white",
};

export default function LiveAvatars() {
  //
  // RATIONALE:
  // Using useOthersMapped here and only selecting/subscribing to the "info"
  // part of each user, which is static data that won't change (unlike
  // presence). In this example we don't use presence, but in a real app this
  // makes a difference: if we did not use a selector function here, these
  // avatars would get needlessly re-rendered any time any of the others moved
  // their cursors :)
  //
  const others = useOthers();
  // commented current user as it was causing the re rendering of component again and again
  // const currentUser = useSelf();
  const hasMoreUsers = others.length > MAX_OTHERS;

  console.log("Hello world");
  const memoizedUsers = useMemo(() => {
    return (
      <div
        className="py-2"
        style={{
          minHeight: avatarProps.size + "px",
          display: "flex",
          paddingLeft: "0.75rem",
          overflow: "hidden",
        }}
      >
        <AnimatePresence>
          {hasMoreUsers ? (
            <motion.div key="count" {...animationProps}>
              <Avatar
                {...avatarProps}
                variant="more"
                count={others.length - 3}
              />
            </motion.div>
          ) : null}

          {/* {currentUser ? ( */}
          <motion.div key="you" {...animationProps}>
            <Avatar
              {...avatarProps}
              src={`https://liveblocks.io/avatars/avatar-${Math.floor(
                Math.random() * 30
              )}.png`}
              name={"you"}
              color={["#000", "#fff"]}
            />
          </motion.div>
          {/* ) : null} */}
          {others
            .slice(0, MAX_OTHERS)
            .reverse()
            .map(({ connectionId }) => (
              <motion.div key={connectionId} {...animationProps}>
                <Avatar
                  src={`https://liveblocks.io/avatars/avatar-${Math.floor(
                    Math.random() * 30
                  )}.png`}
                  {...avatarProps}
                  name={"Other"}
                  color={["#004", "#123"]}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    );
  }, [others.length]);
  return memoizedUsers;
}
