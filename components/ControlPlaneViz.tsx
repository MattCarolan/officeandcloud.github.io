"use client";

import { motion, useReducedMotion } from "framer-motion";

const CENTER = 300;

const rings = [
  { r: 88, label: "LOCAL" },
  { r: 152, label: "ON-PREM" },
  { r: 216, label: "CLOUD" },
  { r: 280, label: "HYBRID EDGE" },
];

type NodeKind = "brand" | "accent" | "signal";

const nodeColor: Record<NodeKind, string> = {
  brand: "#8B7BFF",
  accent: "#2DD4E8",
  signal: "#F5B544",
};

interface Node {
  r: number;
  deg: number;
  kind: NodeKind;
  pulse?: boolean;
}

const nodes: Node[] = [
  { r: 88, deg: -60, kind: "accent", pulse: true },
  { r: 88, deg: 140, kind: "brand" },
  { r: 152, deg: 20, kind: "brand", pulse: true },
  { r: 152, deg: -130, kind: "signal" },
  { r: 152, deg: 95, kind: "accent" },
  { r: 216, deg: -25, kind: "accent", pulse: true },
  { r: 216, deg: 165, kind: "brand" },
  { r: 216, deg: -100, kind: "brand", pulse: true },
  { r: 280, deg: 45, kind: "signal", pulse: true },
  { r: 280, deg: -160, kind: "accent" },
  { r: 280, deg: 120, kind: "brand" },
];

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

export function ControlPlaneViz() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 600 600"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="cpv-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9C4FF" />
          <stop offset="55%" stopColor="#6D5EF6" />
          <stop offset="100%" stopColor="#2DD4E8" />
        </radialGradient>
        <radialGradient id="cpv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6D5EF6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6D5EF6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cpv-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B7BFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#8B7BFF" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* central glow */}
      <circle cx={CENTER} cy={CENTER} r={200} fill="url(#cpv-glow)" />

      {/* rings */}
      {rings.map((ring, i) => (
        <g key={ring.r}>
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ring.r}
            fill="none"
            stroke="white"
            strokeOpacity={0.09}
            strokeWidth={1}
          />
          <text
            x={CENTER + ring.r + 6}
            y={CENTER + 3}
            fill="#8A8FA3"
            fontSize="9"
            fontFamily="var(--font-mono), monospace"
            letterSpacing="1.5"
            opacity={0.55}
          >
            {ring.label}
          </text>
          {/* rotating dashed overlay on alternating rings */}
          {i % 2 === 1 && (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={ring.r}
              fill="none"
              stroke={i === 3 ? "#2DD4E8" : "#8B7BFF"}
              strokeOpacity={0.22}
              strokeWidth={1}
              strokeDasharray="2 12"
              style={{ transformOrigin: "300px 300px" }}
              animate={reduce ? undefined : { rotate: i === 3 ? -360 : 360 }}
              transition={{
                duration: 60 + i * 18,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          )}
        </g>
      ))}

      {/* connection lines from nodes to core */}
      {nodes.map((n, i) => {
        const p = polar(n.r, n.deg);
        return (
          <line
            key={`l-${i}`}
            x1={p.x}
            y1={p.y}
            x2={CENTER}
            y2={CENTER}
            stroke="white"
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        );
      })}

      {/* travelling data pulses */}
      {!reduce &&
        nodes
          .filter((n) => n.pulse)
          .map((n, i) => {
            const p = polar(n.r, n.deg);
            return (
              <motion.circle
                key={`p-${i}`}
                r={2.4}
                fill={nodeColor[n.kind]}
                initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                animate={{
                  cx: [p.x, CENTER],
                  cy: [p.y, CENTER],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.6,
                  ease: "easeIn",
                  repeat: Infinity,
                  delay: i * 0.55,
                  repeatDelay: 1.1,
                }}
              />
            );
          })}

      {/* worker nodes */}
      {nodes.map((n, i) => {
        const p = polar(n.r, n.deg);
        const c = nodeColor[n.kind];
        return (
          <g key={`n-${i}`}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={8}
              fill={c}
              opacity={0.14}
              animate={reduce ? undefined : { r: [8, 13, 8], opacity: [0.14, 0.04, 0.14] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
            <circle cx={p.x} cy={p.y} r={3.4} fill={c} />
            <circle cx={p.x} cy={p.y} r={3.4} fill={c} opacity={0.5}>
              {!reduce && (
                <animate
                  attributeName="r"
                  values="3.4;5;3.4"
                  dur="2.8s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </g>
        );
      })}

      {/* core */}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={34}
        fill="none"
        stroke="#8B7BFF"
        strokeOpacity={0.4}
        strokeWidth={1}
        style={{ transformOrigin: "300px 300px" }}
        animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={26}
        fill="#0C0E16"
        stroke="white"
        strokeOpacity={0.12}
      />
      <circle cx={CENTER} cy={CENTER} r={14} fill="url(#cpv-core)" />
      <circle cx={CENTER} cy={CENTER} r={5} fill="#fff" opacity={0.9} />
    </svg>
  );
}
