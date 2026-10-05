"use client";
import { colors } from "@/utils/constants";
import { motion } from "framer-motion";

const factorDelay = 0.35;
const size = 300;

const factor = Math.round((size / 300) * 100) / 100;

const width = size;
const height = factor * 400;

const WHITE = "#ffffff";

export const MainCircuitLeft = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <linearGradient id="hl-gradient-0" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[0]} />
          <stop offset="75%" stopColor={colors[1]} />
        </linearGradient>
        <linearGradient id="hl-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
        <linearGradient id="hl-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="75%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="vl-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <motion.rect
        x={-30}
        y={120 * factor - 2}
        width={280 * factor + 2}
        height={4}
        fill="url(#hl-gradient-0)"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
              scaleX: {
                delay: factorDelay * 0,
                type: "spring",
                duration: factorDelay * 5,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: 0.01 },
            },
          },
        }}
        style={{
          originX: 0,
        }}
      />
      <motion.rect
        x={250 * factor - 2}
        y={120 * factor}
        width={4}
        height={80 * factor}
        fill={colors[1]}
        variants={{
          hidden: { scaleY: 0, opacity: 0 },
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
              scaleY: {
                delay: factorDelay * 5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5, duration: 0.01 },
            },
          },
        }}
        style={{
          originY: 0,
        }}
      />
      <motion.circle
        cx={250 * factor}
        cy={205 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 7,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 7, duration: factorDelay * 1 },
            },
          },
        }}
      />
    </motion.svg>
  );
};

export const MainCircuitRight = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <linearGradient id="hr-gradient-0" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="75%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="hr-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="hr-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[1]} />
          <stop offset="50%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="vr-gradient-0" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
        <linearGradient id="vr-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="95%" stopColor={colors[0]} />
          <stop offset="125%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <motion.rect
        x={50 * factor - 2}
        y={390 * factor - 2}
        width={280 * factor + 2}
        height={4}
        fill="url(#hr-gradient-2)"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 0,
                type: "spring",
                duration: factorDelay * 3,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originX: 1,
        }}
      />
      <motion.rect
        x={50 * factor - 2}
        y={320 * factor}
        width={4}
        height={70 * factor + 2}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 3,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 3, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originY: 1,
        }}
      />
      <motion.circle
        cx={50 * factor}
        cy={310 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5, duration: factorDelay * 1 },
            },
          },
        }}
      />
    </motion.svg>
  );
};


export const MainCircuitRight3 = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <linearGradient id="hr-gradient-0" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="75%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="hr-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="hr-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[1]} />
          <stop offset="50%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="vr-gradient-0" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
        <linearGradient id="vr-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="95%" stopColor={colors[0]} />
          <stop offset="125%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      

      <motion.rect
        x={0 * factor - 2}
        y={350 * factor - 2}
        width={300 * factor + 2}
        height={4}
        fill="url(#hr-gradient-2)"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 0,
                type: "spring",
                duration: factorDelay * 3,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originX: 1,
        }}
      />
      <motion.rect
        x={0 * factor - 2}
        y={300 * factor}
        width={4}
        height={50 * factor + 2}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 3,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 3, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originY: 1,
        }}
      />
      <motion.circle
        cx={0 * factor}
        cy={300 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5, duration: factorDelay * 1 },
            },
          },
        }}
      />

      <motion.rect
        x={220 * factor - 2}
        y={350 * factor - 2}
        width={4}
        height={150 * factor + 2}
        fill={colors[0]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 1.5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 1.5, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originY: 0,
        }}
      />
      <motion.rect
        x={-400}
        y={500 * factor - 4}
        width={625 * factor - 4}
        height={4}
        fill="url(#hr-gradient-0)"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 2.5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 2.5, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originX: 1,
        }}
      />
      <motion.rect
        x={-400}
        y={399 * factor - 2}
        width={4}
        height={100 * factor + 2}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 3.5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 3.5, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originY: 1,
        }}
      />
      <motion.circle
        cx={-398}
        cy={400 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 5.5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5.5, duration: factorDelay * 1 },
            },
          },
        }}
      />
    </motion.svg>
  );
};

export const MainCircuitLeft1 = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <linearGradient id="hl-gradient-0" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[0]} />
          <stop offset="75%" stopColor={colors[1]} />
        </linearGradient>
        <linearGradient id="hl-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
        <linearGradient id="hl-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="75%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="vl-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <motion.rect
        x={0}
        y={-100 * factor - 2}
        width={280 * factor + 2}
        height={4}
        fill="url(#hl-gradient-0)"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
              scaleX: {
                delay: factorDelay * 0,
                type: "spring",
                duration: factorDelay * 5,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: 0.01 },
            },
          },
        }}
        style={{
          originX: 0,
        }}
      />
      <motion.rect
        x={280 * factor - 2}
        y={-100 * factor}
        width={4}
        height={140 * factor}
        fill={colors[1]}
        variants={{
          hidden: { scaleY: 0, opacity: 0 },
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
              scaleY: {
                delay: factorDelay * 5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5, duration: 0.01 },
            },
          },
        }}
        style={{
          originY: 0,
        }}
      />
      <motion.circle
        cx={280 * factor}
        cy={50 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 7,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 7, duration: factorDelay * 1 },
            },
          },
        }}
      />

      <motion.rect
        x={55 * factor - 2}
        y={-100 * factor}
        width={4}
        height={200 * factor}
        fill="url(#vl-gradient)"
        variants={{
          hidden: { scaleY: 0, opacity: 0 },
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
              scaleY: {
                delay: factorDelay * 2.5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 2.5, duration: 0.01 },
            },
          },
        }}
        style={{
          originY: 0,
        }}
      />
      <motion.rect
        x={55 * factor - 2}
        y={100 * factor - 2}
        width={120 * factor}
        height={4}
        fill={colors[1]}
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
              scaleX: {
                delay: factorDelay * 5.5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5.5, duration: 0.01 },
            },
          },
        }}
        style={{
          originX: 0,
        }}
      />
      <motion.circle
        cx={175 * factor}
        cy={100 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 7.5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 7.5, duration: factorDelay * 1 },
            },
          },
        }}
      />
      <motion.rect
        x={0}
        y={500 * factor - 2}
        width={270 * factor}
        height={4}
        fill="url(#hl-gradient-0)"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
              scaleX: {
                delay: factorDelay * 0,
                type: "spring",
                duration: factorDelay * 5,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: 0.01 },
            },
          },
        }}
        style={{
          originX: 0,
        }}
      />
      
      <motion.rect
        x={220 * factor - 2}
        y={300 * factor - 2}
        width={155 * factor}
        height={4}
        fill={colors[1]}
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
              scaleX: {
                delay: factorDelay * 5.5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5.5, duration: 0.01 },
            },
          },
        }}
        style={{
          originX: 0,
        }}
      />

        <motion.circle
          cx={380 * factor}
          cy={300 * factor}
          r={10}
          fill={colors[1]}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                scale: {
                  delay: factorDelay * 7,
                  type: "spring",
                  duration: factorDelay * 1,
                  bounce: 0,
                },
                opacity: { delay: factorDelay * 7, duration: factorDelay * 1 },
              },
            },
          }}
        />
      <motion.rect
        x={220 * factor - 2}
        y={300 * factor}
        width={4}
        height={200 * factor}
        fill={colors[1]}
         variants={{
          hidden: { scaleY: 0, opacity: 0 },
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
              scaleY: {
                delay: factorDelay * 1.5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: 0.01 },
            },
          },
        }}
        style={{
          originY: 1,
        }}
      />
      <motion.circle
        cx={270 * factor}
        cy={500 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5, duration: factorDelay * 1 },
            },
          },
        }}
      />
    </motion.svg>
  );
};

export const MainCircuitRight1 = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <linearGradient id="hr-gradient-0" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="75%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="hr-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="hr-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[1]} />
          <stop offset="50%" stopColor={colors[0]} />
        </linearGradient>
        <linearGradient id="vr-gradient-0" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
        <linearGradient id="vr-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="95%" stopColor={colors[0]} />
          <stop offset="125%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <motion.rect
        x={25 * factor - 2}
        y={-140}
        width={285 * factor + 2}
        height={4}
        fill={colors[0]}
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
              scaleX: {
                delay: factorDelay * 0,
                type: "spring",
                duration: factorDelay * 1.5,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: 0.01 },
            },
          },
        }}
        style={{
          originX: 1,
        }}
      />
      <motion.rect
        x={25 * factor - 2}
        y={-139}
        width={4}
        height={110 * factor + 2}
        fill="url(#vr-gradient-0)"
        variants={{
          hidden: { scaleY: 0, opacity: 0 },
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
              scaleY: {
                delay: factorDelay * 1.5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: 0.01 },
            },
          },
        }}
        style={{
          originY: 0,
        }}
      />
      <motion.rect
        x={-98 * factor - 2}
        y={-26 * factor - 2}
        width={125 * factor + 2}
        height={4}
        fill={colors[1]}
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
              scaleX: {
                delay: factorDelay * 3.5,
                type: "spring",
                duration: factorDelay * 1.5,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: 0.01 },
            },
          },
        }}
        style={{
          originX: 1,
        }}
      />
      <motion.circle
        cx={-98 * factor}
        cy={-26 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5, duration: factorDelay * 1 },
            },
          },
        }}
      />

      <motion.rect
        x={30 * factor - 2}
        y={450 * factor - 2}
        width={340 * factor + 2}
        height={4}
        fill="url(#hr-gradient-2)"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 0,
                type: "spring",
                duration: factorDelay * 3,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originX: 1,
        }}
      />
      <motion.rect
        x={30 * factor - 2}
        y={320 * factor}
        width={4}
        height={127 * factor + 2}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 3,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 3, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originY: 1,
        }}
      />
      <motion.circle
        cx={30 * factor}
        cy={320 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5, duration: factorDelay * 1 },
            },
          },
        }}
      />

      <motion.rect
        x={225 * factor - 2}
        y={450 * factor - 2}
        width={4}
        height={200 * factor + 2}
        fill={colors[0]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 1.5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 1.5, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originY: 0,
        }}
      />
      <motion.rect
        x={-120}
        y={651 * factor - 4}
        width={350 * factor - 4}
        height={4}
        fill="url(#hr-gradient-0)"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 2.5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 2.5, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originX: 1,
        }}
      />
      <motion.rect
        x={-120}
        y={350 * factor - 2}
        width={4}
        height={300 * factor + 2}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 3.5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 3.5, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originY: 1,
        }}
      />
      <motion.circle
        cx={-118}
        cy={350 * factor}
        r={10}
        fill={colors[1]}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 5.5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5.5, duration: factorDelay * 1 },
            },
          },
        }}
      />
    </motion.svg>
  );
};

export const MainCircuitLeftW = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <linearGradient id="hl-gradient-0" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={WHITE} />
          <stop offset="75%" stopColor={WHITE} />
        </linearGradient>
        <linearGradient id="hl-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={WHITE} />
          <stop offset="100%" stopColor={WHITE} />
        </linearGradient>
        <linearGradient id="hl-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={WHITE} />
          <stop offset="75%" stopColor={WHITE} />
        </linearGradient>
        <linearGradient id="vl-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={WHITE} />
          <stop offset="100%" stopColor={WHITE} />
        </linearGradient>
      </defs>
      <motion.rect
        x={-100 * factor - 2}
        y={0 * factor}
        width={6}
        height={230 * factor}
        fill={WHITE}
        variants={{
          hidden: { scaleY: 0, opacity: 0 },
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
              scaleY: {
                delay: factorDelay * 5,
                type: "spring",
                duration: factorDelay * 2,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5, duration: 0.01 },
            },
          },
        }}
        style={{
          originY: 0,
        }}
      />
      <motion.circle
        cx={-99 * factor}
        cy={230 * factor}
        r={13}
        fill={WHITE}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 7,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 7, duration: factorDelay * 1 },
            },
          },
        }}
      />
    </motion.svg>
  );
};

export const MainCircuitRightW = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <linearGradient id="hr-gradient-0" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={WHITE} />
          <stop offset="75%" stopColor={WHITE} />
        </linearGradient>
        <linearGradient id="hr-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={WHITE} />
          <stop offset="100%" stopColor={WHITE} />
        </linearGradient>
        <linearGradient id="hr-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={WHITE} />
          <stop offset="50%" stopColor={WHITE} />
        </linearGradient>
        <linearGradient id="vr-gradient-0" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={WHITE} />
          <stop offset="100%" stopColor={WHITE} />
        </linearGradient>
        <linearGradient id="vr-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="95%" stopColor={WHITE} />
          <stop offset="125%" stopColor={WHITE} />
        </linearGradient>
      </defs>
      <motion.rect
        x={200 * factor - 2}
        y={400 * factor - 2}
        width={280 * factor + 2}
        height={6}
        fill={WHITE}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 0,
                type: "spring",
                duration: factorDelay * 3,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originX: 1,
        }}
      />
      <motion.rect
        x={200 * factor - 2}
        y={400 * factor}
        width={6}
        height={200 * factor + 2}
        fill={WHITE}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 3,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 3, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originY: 1,
        }}
      />
      <motion.rect
        x={72 * factor - 2}
        y={600 * factor - 2}
        width={130 * factor + 2}
        height={6}
        fill={WHITE}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 0,
                type: "spring",
                duration: factorDelay * 3,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 0, duration: factorDelay * 1 },
            },
          },
        }}
        style={{
          originX: 1,
        }}
      />
      <motion.circle
        cx={70 * factor}
        cy={601 * factor}
        r={13}
        fill={WHITE}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              scale: {
                delay: factorDelay * 5,
                type: "spring",
                duration: factorDelay * 1,
                bounce: 0,
              },
              opacity: { delay: factorDelay * 5, duration: factorDelay * 1 },
            },
          },
        }}
      />
    </motion.svg>
  );
};

