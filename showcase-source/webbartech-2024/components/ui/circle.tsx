"use client";
import { colors } from "@/utils/constants";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const size = 768;

// Animaciones para los círculos
const draw = {
  hidden: { strokeDashoffset: 0 },
  visible: (i: number) => ({
    strokeDashoffset: 0,
    transition: {
      duration: 1.2, // velocidad
      ease: "easeInOut",
      delay: i * 0.3,
    },
  }),
};

const drawCircle = {
  hidden: { strokeDashoffset: 0 },
  visible: (i: number) => ({
    strokeDashoffset: -50,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      delay: i * 0.3,
    },
  }),
};

// 1️⃣ Círculo que se dibuja una vez
export const CircleBartech = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const w = size;
  const h = size;
  const midWidth = w / 2;
  const midHeight = h / 2;
  const radius = midWidth - 0.75;
  const perimeter = Math.round(2 * Math.PI * radius * 100) / 100;

  const angle = -36;
  const angleInRadians = (angle * Math.PI) / 180;
  const x1 = Math.round((0.5 - 0.5 * Math.cos(angleInRadians)) * 100) / 100;
  const y1 = Math.round((0.5 - 0.5 * Math.sin(angleInRadians)) * 100) / 100;
  const x2 = Math.round((0.5 + 0.5 * Math.cos(angleInRadians)) * 100) / 100;
  const y2 = Math.round((0.5 + 0.5 * Math.sin(angleInRadians)) * 100) / 100;

  return (
    <motion.svg
      ref={ref}
      width="100%"
      height="100%"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <defs>
        <linearGradient
          id="circle-gradient"
          x1={`${x1 * 100}%`}
          y1={`${y1 * 100}%`}
          x2={`${x2 * 100}%`}
          y2={`${y2 * 100}%`}
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <motion.circle
        cx={midWidth}
        cy={midHeight}
        r={radius - 5}
        stroke="url(#circle-gradient)"
        strokeDasharray={perimeter}
        strokeDashoffset={perimeter * 0.25}
        variants={draw}
        custom={1}
        style={{
          rotate: 36,
          strokeWidth: 12,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
      <motion.circle
        cx={midWidth}
        cy={midHeight}
        r={radius - 5}
        stroke="url(#circle-gradient)"
        strokeDasharray={perimeter}
        strokeDashoffset={perimeter * 0.25}
        variants={drawCircle}
        custom={1}
        style={{
          strokeWidth: 12,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
    </motion.svg>
  );
};

// 2️⃣ Círculo que gira infinitamente
export const CircleInfinity = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const w = size;
  const h = size;
  const midWidth = w / 2;
  const midHeight = h / 2;
  const radius = midWidth - 0.75;
  const perimeter = Math.round(2 * Math.PI * radius * 100) / 100;

  const angle = -36;
  const angleInRadians = (angle * Math.PI) / 180;
  const x1 = Math.round((0.5 - 0.5 * Math.cos(angleInRadians)) * 100) / 100;
  const y1 = Math.round((0.5 - 0.5 * Math.sin(angleInRadians)) * 100) / 100;
  const x2 = Math.round((0.5 + 0.5 * Math.cos(angleInRadians)) * 100) / 100;
  const y2 = Math.round((0.5 + 0.5 * Math.sin(angleInRadians)) * 100) / 100;

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={ref}
        animate={inView ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: inView ? Infinity : 0,
        }}
      >
        <motion.svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid meet"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <defs>
            <linearGradient
              id="circle-gradient"
              x1={`${x1 * 100}%`}
              y1={`${y1 * 100}%`}
              x2={`${x2 * 100}%`}
              y2={`${y2 * 100}%`}
            >
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </linearGradient>
          </defs>
          <motion.circle
            cx={midWidth}
            cy={midHeight}
            r={radius - 5}
            stroke="url(#circle-gradient)"
            strokeDasharray={perimeter}
            strokeDashoffset={perimeter * 0.25}
            variants={draw}
            custom={0}
            style={{
              rotate: 36,
              strokeWidth: 12,
              strokeLinecap: "round",
              fill: "transparent",
            }}
          />
          <motion.circle
            cx={midWidth}
            cy={midHeight}
            r={radius - 5}
            stroke="url(#circle-gradient)"
            strokeDasharray={perimeter}
            strokeDashoffset={perimeter * 0.25}
            variants={drawCircle}
            custom={0}
            style={{
              strokeWidth: 12,
              strokeLinecap: "round",
              fill: "transparent",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

// 3️⃣ Círculo que avanza con el scroll
export const CircleScrollProgress = ({
  ang = 36,
  fillCircle = "none",
  completion = 0.9,
  pointOffset = 0.8,
}) => {
  const w = size;
  const h = size;
  const midWidth = w / 2;
  const midHeight = h / 2;
  const radius = midWidth - 80;
  const perimeter = Math.round(2 * Math.PI * radius * 100) / 100;

  const angleInRadians = -(ang * Math.PI) / 180;
  const x1 = Math.round((0.5 - 0.5 * Math.cos(angleInRadians)) * 100) / 100;
  const y1 = Math.round((0.5 - 0.5 * Math.sin(angleInRadians)) * 100) / 100;
  const x2 = Math.round((0.5 + 0.5 * Math.cos(angleInRadians)) * 100) / 100;
  const y2 = Math.round((0.5 + 0.5 * Math.sin(angleInRadians)) * 100) / 100;

  const ref = useRef<SVGSVGElement | null>(null);
  const controls = useAnimation();
  const controlsCircle = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({
              strokeDashoffset: perimeter * (1 - completion),
              opacity: 1,
              transition: { duration: 0.9, ease: "easeOut" },
            });
            controlsCircle.start({
              opacity: 1,
              pathLength: 0.0001,
              rotate: (360 + ang + 18) * completion,
              transition: { duration: 0.9, ease: "easeOut" },
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, controlsCircle, perimeter, ang, completion]);

  return (
    <motion.svg
      ref={ref}
      width="100%"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id="circle-gradient"
          x1={`${x1 * 100}%`}
          y1={`${y1 * 100}%`}
          x2={`${x2 * 100}%`}
          y2={`${y2 * 100}%`}
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      {/* Círculo principal */}
      <motion.circle
        cx={midWidth}
        cy={midHeight}
        r={radius - 5}
        stroke="#ffffff"
        strokeDasharray={perimeter}
        strokeDashoffset={perimeter}
        initial={{ opacity: 0 }}
        animate={controls}
        style={{
          rotate: ang,
          strokeWidth: 12,
          strokeLinecap: "round",
          fill: fillCircle,
        }}
      />

      {/* Punto pequeño */}
      <motion.circle
        cx={midWidth}
        cy={midHeight}
        r={radius - 5}
        stroke="#ffffff"
        strokeDasharray={perimeter}
        strokeDashoffset={-perimeter * pointOffset}
        initial={{ opacity: 0 }}
        animate={controlsCircle}
        style={{
          rotate: ang,
          strokeWidth: 20,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
    </motion.svg>
  );
};

export const CircleScrollProgress1 = ({
    ang = 36,
    fillCircle = "#f1f5f9",
    completion = 0.9,
    pointOffset = 0.8,
}) => {
    const w = size;
    const h = size;
    const midWidth = w / 2;
    const midHeight = h / 2;
    const radius = midWidth - 10;
    const perimeter = Math.round(2 * Math.PI * radius * 100) / 100;

    const angleInRadians = -(ang * Math.PI) / 180;
    const x1 = Math.round((0.5 - 0.5 * Math.cos(angleInRadians)) * 100) / 100;
    const y1 = Math.round((0.5 - 0.5 * Math.sin(angleInRadians)) * 100) / 100;
    const x2 = Math.round((0.5 + 0.5 * Math.cos(angleInRadians)) * 100) / 100;
    const y2 = Math.round((0.5 + 0.5 * Math.sin(angleInRadians)) * 100) / 100;

    const ref = useRef<SVGSVGElement | null>(null);
    const controls = useAnimation();
    const controlsCircle = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({
              strokeDashoffset: perimeter * (1 - completion),
              opacity: 1,
              transition: { duration: 0.9, ease: "easeOut" },
            });
            controlsCircle.start({
              opacity: 1,
              pathLength: 0.0001,
              rotate: (360 + ang + 18) * completion,
              transition: { duration: 0.9, ease: "easeOut" },
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, controlsCircle, perimeter, ang, completion]);

  return (
    <motion.svg
      ref={ref}
      width="100%"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id="circle-gradient"
          x1={`${x1 * 100}%`}
          y1={`${y1 * 100}%`}
          x2={`${x2 * 100}%`}
          y2={`${y2 * 100}%`}
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      {/* Círculo principal */}
      <motion.circle
        cx={midWidth}
        cy={midHeight}
        r={radius - 5}
        stroke="url(#circle-gradient)"
        strokeDasharray={perimeter}
        strokeDashoffset={perimeter}
        initial={{ opacity: 0 }}
        animate={controls}
        style={{
          rotate: ang,
          strokeWidth: 12,
          strokeLinecap: "round",
          fill: fillCircle,
        }}
      />

      {/* Punto pequeño */}
      <motion.circle
        cx={midWidth}
        cy={midHeight}
        r={radius - 5}
        stroke="url(#circle-gradient)"
        strokeDasharray={perimeter}
        strokeDashoffset={-perimeter * pointOffset}
        initial={{ opacity: 0 }}
        animate={controlsCircle}
        style={{
          rotate: ang,
          strokeWidth: 20,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
    </motion.svg>
  );
  }

 export const CircleScrollProgressNew = ({
    ang = 36,
    fillCircle = "none",
    completion = 0.9,
    pointOffset = 0.8,
  }) => {
    const w = size;
    const h = size;
    const midWidth = w / 2;
    const midHeight = h / 2;
    const radius = midWidth - 80;
    const perimeter = Math.round(2 * Math.PI * radius * 100) / 100;

    const angleInRadians = -(ang * Math.PI) / 180;
    const x1 = Math.round((0.5 - 0.5 * Math.cos(angleInRadians)) * 100) / 100;
    const y1 = Math.round((0.5 - 0.5 * Math.sin(angleInRadians)) * 100) / 100;
    const x2 = Math.round((0.5 + 0.5 * Math.cos(angleInRadians)) * 100) / 100;
    const y2 = Math.round((0.5 + 0.5 * Math.sin(angleInRadians)) * 100) / 100;

    const ref = useRef<SVGSVGElement | null>(null);
    const controls = useAnimation();
    const controlsCircle = useAnimation();

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              controls.start({
                strokeDashoffset: perimeter * (1 - completion),
                opacity: 1,
                transition: { duration: 0.9, ease: "easeOut" },
              });
              controlsCircle.start({
                opacity: 1,
                pathLength: 0.0001,
                rotate: (360 + ang + 18) * completion,
                transition: { duration: 0.9, ease: "easeOut" },
              });
            }
          });
        },
        { threshold: 0.3 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [controls, controlsCircle, perimeter, ang, completion]);

    return (
      <motion.svg
        ref={ref}
        width="100%"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="circle-gradient"
            x1={`${x1 * 100}%`}
            y1={`${y1 * 100}%`}
            x2={`${x2 * 100}%`}
            y2={`${y2 * 100}%`}
          >
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>

        {/* CÍRCULO PRINCIPAL */}
        <motion.circle
          cx={midWidth}
          cy={midHeight}
          r={radius - 5}
          stroke="#38C0E0"
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter}
          initial={{ opacity: 0 }}
          animate={controls}
          style={{
            rotate: ang,
            strokeWidth: 12,
            strokeLinecap: "round",
            fill: fillCircle,
          }}
        />

        {/* PUNTO / TRAZO FINAL */}
        <motion.circle
          cx={midWidth}
          cy={midHeight}
          r={radius - 5}
          stroke="#38C0E0"
          strokeDasharray={perimeter}
          strokeDashoffset={-perimeter * pointOffset}
          initial={{ opacity: 0 }}
          animate={controlsCircle}
          style={{
            rotate: ang,
            strokeWidth: 20,
            strokeLinecap: "round",
            fill: "transparent",
          }}
        />
      </motion.svg>
    );
  };

