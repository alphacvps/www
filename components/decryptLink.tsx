"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { DecryptLinkProps } from "@/types/landing";
import Link from "next/link";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/?$#@!";

export const DecryptLink: React.FC<DecryptLinkProps> = ({
  children,
  className,
  href,
}) => {
  const [displayText, setDisplayText] = useState<string>(children);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;

    if (frameRef.current !== null) {
      clearInterval(frameRef.current);
    }

    frameRef.current = setInterval(() => {
      setDisplayText(() =>
        children
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return children[index];
            }

            if (index >= iteration && index < iteration + 4) {
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            }

            return char;
          })
          .join(""),
      );

      iteration += 0.35;

      if (iteration >= children.length) {
        if (frameRef.current !== null) {
          clearInterval(frameRef.current);
        }

        setDisplayText(children);
      }
    }, 35);
  }, [children]);

  useEffect(() => {
    if (isHovering) {
      scramble();
    } else {
      if (frameRef.current !== null) {
        clearInterval(frameRef.current);
      }

      setDisplayText(children);
    }

    return () => {
      if (frameRef.current !== null) {
        clearInterval(frameRef.current);
      }
    };
  }, [isHovering, scramble, children]);

  const sharedProps = {
    className: `${className} font-mono whitespace-pre transition-colors duration-300`,
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
  };

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {displayText}
      </Link>
    );
  }

  return <div {...sharedProps}>{displayText}</div>;
};