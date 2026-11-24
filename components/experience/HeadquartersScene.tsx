"use client";

import { useEffect, useId, useRef, useState } from "react";
import type {
  BufferGeometry,
  Group,
  LineBasicMaterial,
  Material,
  Mesh,
  ShaderMaterial,
  Texture,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import styles from "./HeadquartersScene.module.css";

export interface HeadquartersSceneProps {
  activePillar: number;
  onSelectPillar: (index: number) => void;
  reducedMotion: boolean;
  motionEnabled: boolean;
  onReady?: () => void;
}

const PILLARS = [
  "Discovery",
  "Governance",
  "Risk & Security",
  "AI Economics",
  "Performance & Value",
];

const selectedIndex = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(4, Math.round(value))) : 0;

/** A complete first-paint and no-WebGL visual, independent of the render loop. */
function ArchitecturalFallback({ active, id }: { active: number; id: string }) {
  return (
    <svg
      viewBox="0 0 640 720"
      className={styles.fallbackSvg}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a784ff" stopOpacity=".42" />
          <stop offset=".45" stopColor="#201d46" stopOpacity=".8" />
          <stop offset="1" stopColor="#8c5ef9" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id={`${id}-selected`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ccfaff" stopOpacity=".7" />
          <stop offset=".4" stopColor="#00bcde" stopOpacity=".32" />
          <stop offset="1" stopColor="#8c5ef9" stopOpacity=".45" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#a98af9" />
          <stop offset=".45" stopColor="#151b32" />
          <stop offset="1" stopColor="#a5f0ff" />
        </linearGradient>
        <radialGradient id={`${id}-halo`}>
          <stop stopColor="#7356ef" stopOpacity=".3" />
          <stop offset="1" stopColor="#7356ef" stopOpacity="0" />
        </radialGradient>
        <filter
          id={`${id}-glow`}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <ellipse cx="330" cy="410" rx="300" ry="300" fill={`url(#${id}-halo)`} />
      <ellipse
        cx="330"
        cy="650"
        rx="220"
        ry="38"
        fill="#070b1b"
        opacity=".75"
      />
      <path
        d="M330 88V637"
        stroke="#00bcde"
        strokeWidth="15"
        opacity=".24"
        filter={`url(#${id}-glow)`}
      />
      <path d="M330 88V637" stroke="#98f0ff" strokeWidth="2" opacity=".75" />
      {[4, 3, 2, 1, 0].map((index) => {
        const y = 135 + index * 102;
        const isActive = index === active;
        return (
          <g
            key={index}
            className={styles.fallbackFloor}
            data-fallback-floor={index}
            style={{
              transform: `translate(${isActive ? -28 : 0}px, ${isActive ? 15 : 0}px)`,
            }}
          >
            <path
              d={`M106 ${y} 294 ${y + 78} 558 ${y + 8}v12L294 ${y + 90} 106 ${y + 12}Z`}
              fill="#0a1022"
              stroke={`url(#${id}-edge)`}
              strokeWidth="1.5"
            />
            <path
              d={`M106 ${y} 372 ${y - 69} 558 ${y + 8} 294 ${y + 78}Z`}
              fill={`url(#${id}-glass)`}
              stroke="#986ff6"
              strokeWidth="1.2"
            />
            <path
              className={styles.fallbackSelection}
              d={`M106 ${y} 372 ${y - 69} 558 ${y + 8} 294 ${y + 78}Z`}
              fill={`url(#${id}-selected)`}
              stroke="#8af0ff"
              strokeWidth="2"
              style={{ opacity: isActive ? 1 : 0 }}
            />
            <path
              d={`M133 ${y + 1} 372 ${y - 60} 532 ${y + 7} 294 ${y + 69}Z`}
              fill="none"
              stroke={isActive ? "#77ddea" : "#a88be8"}
              strokeOpacity=".22"
            />
            <g
              className={styles.fallbackGlyph}
              transform={`translate(278 ${y + 20}) scale(.84)`}
              fill="none"
              stroke={isActive ? "#9bf3ff" : "#b28bf9"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {index === 0 && (
                <>
                  <path d="M-20 4 9-21 31 13-20 4-4 28 31 13" strokeWidth="2" />
                  <circle cx="-20" cy="4" r="5" />
                  <circle cx="9" cy="-21" r="5" />
                  <circle cx="31" cy="13" r="5" />
                  <circle cx="-4" cy="28" r="5" />
                </>
              )}
              {index === 1 && (
                <>
                  <path d="M-27-12H31M-27 15H31" />
                  <circle cx="-8" cy="-12" r="7" fill="#172344" />
                  <circle cx="14" cy="15" r="7" fill="#172344" />
                </>
              )}
              {index === 2 && (
                <>
                  <path d="M-25-22 0-31 25-22 22 6Q15 25 0 31-15 25-22 6Z" />
                  <path d="m-12-1 9 10L15-11" stroke="#53e5f5" />
                </>
              )}
              {index === 3 && (
                <>
                  <path d="M-23 22V6h10v16M-4 22V-8H6v30M15 22V-25h10v47" />
                </>
              )}
              {index === 4 && (
                <>
                  <path d="M-30 19a30 30 0 0 1 60 0" />
                  <path d="M0 18 17-3" stroke="#53e5f5" />
                  <circle cx="0" cy="18" r="4" />
                </>
              )}
            </g>
          </g>
        );
      })}
      <g
        className={styles.fallbackRecord}
        data-fallback-record="true"
        style={{ transform: `translate(359px, ${108 + active * 102}px)` }}
      >
        <g transform="skewY(-15)">
          {[3, 2, 1, 0].map((pane) => (
            <rect
              key={pane}
              x={pane * 10}
              y={pane * -7}
              width="43"
              height="64"
              rx="2"
              fill="#00bcde"
              fillOpacity=".16"
              stroke="#9bf3ff"
              strokeOpacity={1 - pane * 0.17}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

interface Floor {
  group: Group;
  glass: ShaderMaterial;
  edge: LineBasicMaterial;
  glyph: Group;
  hit: Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  emphasis: number;
}

export default function HeadquartersScene(props: HeadquartersSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const latest = useRef(props);
  const requestRender = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const fallbackId = `headquarters-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    latest.current = props;
    requestRender.current?.();
  }, [props]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    let loadingObserver: IntersectionObserver | undefined;
    let notified = false;
    const announceReady = () => {
      if (notified || disposed) return;
      notified = true;
      latest.current.onReady?.();
    };

    async function initialise() {
      const [T, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/environments/RoomEnvironment.js"),
      ]);
      if (disposed || !host) return;

      const coarseQuery = window.matchMedia("(pointer: coarse)");
      const smallDevice = () => coarseQuery.matches || window.innerWidth < 768;
      const geometries = new Set<BufferGeometry>();
      const materials = new Set<Material>();
      const textures = new Set<Texture>();
      let environmentTarget: WebGLRenderTarget | undefined;
      let renderer: WebGLRenderer | undefined;
      let observer: IntersectionObserver | undefined;
      let resizeObserver: ResizeObserver | undefined;
      let frame = 0;
      let visible = true;
      let contextLost = false;
      let previousTime = 0;
      let started = false;
      let cleaned = false;
      const removers: Array<() => void> = [];

      cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        cancelAnimationFrame(frame);
        frame = 0;
        requestRender.current = null;
        observer?.disconnect();
        resizeObserver?.disconnect();
        removers.forEach((remove) => remove());
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
        textures.forEach((texture) => texture.dispose());
        environmentTarget?.dispose();
        renderer?.dispose();
        renderer?.forceContextLoss();
        renderer?.domElement.remove();
      };

      const rememberGeometry = <G extends BufferGeometry>(geometry: G): G => {
        geometries.add(geometry);
        return geometry;
      };
      const rememberMaterial = <M extends Material>(material: M): M => {
        materials.add(material);
        return material;
      };

      renderer = new T.WebGLRenderer({
        antialias: !smallDevice(),
        alpha: true,
        powerPreference: smallDevice() ? "default" : "high-performance",
        failIfMajorPerformanceCaveat: true,
      });
      const view = renderer;
      view.setClearColor(0x000000, 0);
      view.outputColorSpace = T.SRGBColorSpace;
      view.toneMapping = T.ACESFilmicToneMapping;
      view.toneMappingExposure = 1.03;
      view.transmissionResolutionScale = smallDevice() ? 0.45 : 0.65;
      view.domElement.setAttribute("aria-hidden", "true");
      view.domElement.className = styles.canvas;
      host.appendChild(view.domElement);

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(34, 1, 0.1, 60);
      const lookAt = new T.Vector3(0.05, 0.15, 0.14);
      const cameraDirection = new T.Vector3(0.58, 0.3, 0.76).normalize();
      const baseCamera = new T.Vector3();
      const wantedCamera = new T.Vector3();
      const pointer = new T.Vector2();
      const rayPointer = new T.Vector2();
      const raycaster = new T.Raycaster();

      const environment = new RoomEnvironment();
      const pmrem = new T.PMREMGenerator(view);
      environmentTarget = pmrem.fromScene(environment, 0.06);
      scene.environment = environmentTarget.texture;
      scene.environmentIntensity = 0.32;
      environment.dispose();
      pmrem.dispose();

      scene.add(new T.HemisphereLight(0xa9b8ee, 0x060511, 0.4));
      const key = new T.DirectionalLight(0xdce8ff, 1.8);
      key.position.set(3, 7, 6);
      scene.add(key);
      const back = new T.DirectionalLight(0x8c5ef9, 1.6);
      back.position.set(-4, 3, -4);
      scene.add(back);
      const cyanLight = new T.PointLight(0x00bcde, 10, 13, 2);
      cyanLight.position.set(3.6, 0.8, 3.6);
      scene.add(cyanLight);
      const violetLight = new T.PointLight(0x8c5ef9, 12, 12, 2);
      violetLight.position.set(-3.4, 2.6, 1);
      scene.add(violetLight);

      const building = new T.Group();
      building.rotation.y = -0.13;
      scene.add(building);
      const violet = new T.Color("#8c5ef9");
      const cyan = new T.Color("#00bcde");
      const titanium = rememberMaterial(
        new T.MeshStandardMaterial({
          color: 0x090e1d,
          metalness: 0.82,
          roughness: 0.2,
        }),
      );
      const polishedViolet = rememberMaterial(
        new T.MeshStandardMaterial({
          color: 0x6630b9,
          metalness: 0.48,
          roughness: 0.2,
          emissive: 0x8c5ef9,
          emissiveIntensity: 0.32,
        }),
      );
      const polishedCyan = rememberMaterial(
        new T.MeshStandardMaterial({
          color: 0x16acc8,
          metalness: 0.38,
          roughness: 0.2,
          emissive: 0x00bcde,
          emissiveIntensity: 0.28,
        }),
      );
      const brightCyan = rememberMaterial(
        new T.MeshBasicMaterial({ color: 0x6ce4f6, toneMapped: false }),
      );
      const lightCyan = rememberMaterial(
        new T.MeshBasicMaterial({
          color: 0x00bcde,
          transparent: true,
          opacity: 0.08,
          blending: T.AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
        }),
      );

      // Transparent tinted glass with controlled reflection bands and a Fresnel rim.
      // Unlike physical transmission over a solid backing, the inner area stays clear.
      const makeGlass = (
        tint: InstanceType<typeof T.Color>,
        active: number,
        vertical = false,
      ) =>
        rememberMaterial(
          new T.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            side: T.FrontSide,
            toneMapped: false,
            uniforms: {
              uTint: { value: tint.clone() },
              uActive: { value: active },
              uVertical: { value: vertical ? 1 : 0 },
              uBodyOpacity: { value: vertical ? 0.09 : 0.12 },
              uRimOpacity: { value: vertical ? 0.25 : 0.36 },
            },
            vertexShader: `
            varying vec3 vGlassNormal;
            varying vec3 vGlassView;
            varying vec3 vGlassLocal;
            void main() {
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vGlassNormal = normalize(mat3(modelMatrix) * normal);
              vGlassView = cameraPosition - worldPosition.xyz;
              vGlassLocal = position;
              gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
          `,
            fragmentShader: `
            uniform vec3 uTint;
            uniform float uActive;
            uniform float uVertical;
            uniform float uBodyOpacity;
            uniform float uRimOpacity;
            varying vec3 vGlassNormal;
            varying vec3 vGlassView;
            varying vec3 vGlassLocal;
            void main() {
              vec3 normalDirection = normalize(vGlassNormal);
              vec3 viewDirection = normalize(vGlassView);
              float fresnel = pow(1.0 - clamp(abs(dot(normalDirection, viewDirection)), 0.0, 1.0), 2.2);
              vec2 surfacePosition = mix(vGlassLocal.xz, vGlassLocal.xy, uVertical);
              float broadReflection = 1.0 - smoothstep(0.0, 0.13,
                abs(surfacePosition.x + surfacePosition.y * 0.45 - 0.65));
              float fineReflection = 1.0 - smoothstep(0.0, 0.028,
                abs(surfacePosition.x - surfacePosition.y * 0.22 + 0.45));
              float reflection = broadReflection * 0.6 + fineReflection * 0.4;
              vec3 glassColor = vec3(0.004, 0.006, 0.018)
                + uTint * (0.14 + fresnel * 0.85 + reflection * 0.12)
                * (1.0 + uActive * 0.25);
              float glassAlpha = uBodyOpacity + fresnel * uRimOpacity + reflection * 0.025;
              gl_FragColor = vec4(glassColor, clamp(glassAlpha, 0.0, 0.7));
              #include <colorspace_fragment>
            }
          `,
          }),
        );

      const roundedRectangle = (
        width: number,
        depth: number,
        radius: number,
      ) => {
        const shape = new T.Shape();
        const x = -width / 2;
        const y = -depth / 2;
        shape.moveTo(x + radius, y);
        shape.lineTo(x + width - radius, y);
        shape.quadraticCurveTo(x + width, y, x + width, y + radius);
        shape.lineTo(x + width, y + depth - radius);
        shape.quadraticCurveTo(
          x + width,
          y + depth,
          x + width - radius,
          y + depth,
        );
        shape.lineTo(x + radius, y + depth);
        shape.quadraticCurveTo(x, y + depth, x, y + depth - radius);
        shape.lineTo(x, y + radius);
        shape.quadraticCurveTo(x, y, x + radius, y);
        return shape;
      };
      const plateGeometry = rememberGeometry(
        new T.ExtrudeGeometry(roundedRectangle(3.3, 2.12, 0.055), {
          depth: 0.085,
          bevelEnabled: true,
          bevelThickness: 0.018,
          bevelSize: 0.018,
          bevelSegments: 2,
          curveSegments: 4,
          steps: 1,
        }),
      );
      plateGeometry.rotateX(-Math.PI / 2);
      plateGeometry.center();
      const plateEdges = rememberGeometry(
        new T.EdgesGeometry(plateGeometry, 24),
      );
      const frameShape = roundedRectangle(3.3, 2.12, 0.055);
      frameShape.holes.push(roundedRectangle(3.23, 2.05, 0.035));
      const frameGeometry = rememberGeometry(
        new T.ExtrudeGeometry(frameShape, {
          depth: 0.022,
          bevelEnabled: true,
          bevelThickness: 0.007,
          bevelSize: 0.007,
          bevelSegments: 1,
          curveSegments: 4,
          steps: 1,
        }),
      );
      frameGeometry.rotateX(-Math.PI / 2);
      frameGeometry.center();
      const cylinderGeometry = rememberGeometry(
        new T.CylinderGeometry(1, 1, 1, 12),
      );
      const nodeGeometry = rememberGeometry(
        new T.IcosahedronGeometry(0.078, 1),
      );
      const unitBox = rememberGeometry(new T.BoxGeometry(1, 1, 1));
      const axis = new T.Vector3(0, 1, 0);
      const delta = new T.Vector3();

      const rod = (
        parent: Group,
        start: number[],
        end: number[],
        radius: number,
        material: Material,
      ) => {
        const a = new T.Vector3(...(start as [number, number, number]));
        const b = new T.Vector3(...(end as [number, number, number]));
        const mesh = new T.Mesh(cylinderGeometry, material);
        delta.subVectors(b, a);
        mesh.position.copy(a).add(b).multiplyScalar(0.5);
        mesh.quaternion.setFromUnitVectors(axis, delta.clone().normalize());
        mesh.scale.set(radius, delta.length(), radius);
        parent.add(mesh);
        return mesh;
      };
      const makeTube = (
        points: number[][],
        radius: number,
        material: Material,
        parent: Group,
        closed = false,
      ) => {
        const curve = new T.CatmullRomCurve3(
          points.map(
            (point) => new T.Vector3(...(point as [number, number, number])),
          ),
          closed,
          "centripetal",
        );
        const tubeGeometry = rememberGeometry(
          new T.TubeGeometry(
            curve,
            Math.max(16, points.length * 6),
            radius,
            6,
            closed,
          ),
        );
        const mesh = new T.Mesh(tubeGeometry, material);
        parent.add(mesh);
        return mesh;
      };

      const makeGlyph = (index: number) => {
        const glyph = new T.Group();
        glyph.position.set(-0.65, 0.13, 1.17);
        glyph.rotation.y = 0.55;
        glyph.scale.setScalar(0.73);
        if (index === 0) {
          const nodes = [
            [-0.29, 0.2, 0],
            [0.04, 0.57, 0],
            [0.32, 0.22, 0.02],
            [-0.03, 0.04, 0.14],
          ];
          [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
            [0, 2],
          ].forEach(([a, b]) =>
            rod(glyph, nodes[a], nodes[b], 0.014, polishedViolet),
          );
          nodes.forEach((point) => {
            const node = new T.Mesh(nodeGeometry, polishedCyan);
            node.position.set(...(point as [number, number, number]));
            glyph.add(node);
          });
        } else if (index === 1) {
          [0.17, 0.48].forEach((y, row) => {
            rod(glyph, [-0.36, y, 0], [0.36, y, 0], 0.026, polishedViolet);
            const dial = new T.Mesh(
              rememberGeometry(new T.TorusGeometry(0.075, 0.026, 8, 24)),
              polishedCyan,
            );
            dial.position.set(row === 0 ? 0.14 : -0.13, y, 0.025);
            glyph.add(dial);
          });
        } else if (index === 2) {
          const shield = new T.Shape();
          shield.moveTo(0, 0.72);
          shield.lineTo(0.3, 0.6);
          shield.lineTo(0.27, 0.25);
          shield.quadraticCurveTo(0.2, 0.04, 0, -0.05);
          shield.quadraticCurveTo(-0.2, 0.04, -0.27, 0.25);
          shield.lineTo(-0.3, 0.6);
          shield.closePath();
          const shieldOpening = new T.Path();
          shieldOpening.moveTo(0, 0.61);
          shieldOpening.lineTo(0.21, 0.53);
          shieldOpening.lineTo(0.18, 0.27);
          shieldOpening.quadraticCurveTo(0.13, 0.12, 0, 0.055);
          shieldOpening.quadraticCurveTo(-0.13, 0.12, -0.18, 0.27);
          shieldOpening.lineTo(-0.21, 0.53);
          shieldOpening.closePath();
          shield.holes.push(shieldOpening);
          const shieldGeometry = rememberGeometry(
            new T.ExtrudeGeometry(shield, {
              depth: 0.055,
              bevelEnabled: true,
              bevelThickness: 0.025,
              bevelSize: 0.025,
              bevelSegments: 2,
              curveSegments: 8,
              steps: 1,
            }),
          );
          glyph.add(new T.Mesh(shieldGeometry, polishedViolet));
          rod(
            glyph,
            [-0.15, 0.32, 0.1],
            [-0.035, 0.2, 0.1],
            0.032,
            polishedCyan,
          );
          rod(
            glyph,
            [-0.035, 0.2, 0.1],
            [0.17, 0.45, 0.1],
            0.032,
            polishedCyan,
          );
        } else if (index === 3) {
          [0.23, 0.42, 0.66].forEach((height, index) => {
            const bar = new T.Mesh(unitBox, polishedCyan);
            bar.scale.set(0.11, height, 0.13);
            bar.position.set(-0.04 + index * 0.19, height / 2, 0);
            glyph.add(bar);
          });
          const coinGeometry = rememberGeometry(
            new T.CylinderGeometry(0.17, 0.17, 0.052, 28),
          );
          for (let index = 0; index < 3; index++) {
            const coin = new T.Mesh(coinGeometry, polishedViolet);
            coin.position.set(-0.31, 0.056 + index * 0.073, 0.08);
            glyph.add(coin);
          }
        } else {
          const arc = Array.from({ length: 17 }, (_, index) => {
            const angle = Math.PI - (index / 16) * Math.PI;
            return [Math.cos(angle) * 0.37, 0.13 + Math.sin(angle) * 0.37, 0];
          });
          makeTube(arc, 0.037, polishedViolet, glyph);
          for (let index = 0; index < 7; index++) {
            const angle = Math.PI - (index / 6) * Math.PI;
            rod(
              glyph,
              [Math.cos(angle) * 0.3, 0.13 + Math.sin(angle) * 0.3, 0],
              [Math.cos(angle) * 0.35, 0.13 + Math.sin(angle) * 0.35, 0],
              0.012,
              polishedCyan,
            );
          }
          rod(glyph, [0, 0.13, 0.04], [0.19, 0.37, 0.04], 0.024, polishedCyan);
          const hub = new T.Mesh(nodeGeometry, polishedCyan);
          hub.scale.setScalar(0.7);
          hub.position.set(0, 0.13, 0.04);
          glyph.add(hub);
        }
        return glyph;
      };

      const floors: Floor[] = [];
      const startIndex = selectedIndex(latest.current.activePillar);
      for (let index = 0; index < 5; index++) {
        const group = new T.Group();
        const baseX = [0.08, -0.14, 0.13, -0.06, 0][index];
        const baseY = 2.04 - index * 1.02;
        const baseZ = [0, -0.13, 0.04, -0.05, 0.1][index];
        const emphasis = index === startIndex ? 1 : 0;
        group.position.set(
          baseX + emphasis * 0.3,
          baseY,
          baseZ + emphasis * 1.05,
        );
        const glass = makeGlass(violet.clone().lerp(cyan, emphasis), emphasis);
        const hit = new T.Mesh(plateGeometry, glass);
        hit.userData.pillar = index;
        group.add(hit);
        const undercut = new T.Mesh(frameGeometry, titanium);
        undercut.position.y = -0.064;
        group.add(undercut);
        const edge = rememberMaterial(
          new T.LineBasicMaterial({
            color: violet.clone().lerp(cyan, emphasis),
            transparent: true,
            opacity: 0.48 + emphasis * 0.45,
            toneMapped: false,
          }),
        );
        const outline = new T.LineSegments(plateEdges, edge);
        outline.position.y = 0.004;
        group.add(outline);
        const insetGeometry = rememberGeometry(
          new T.BufferGeometry().setFromPoints([
            new T.Vector3(-1.46, 0.066, -0.87),
            new T.Vector3(1.46, 0.066, -0.87),
            new T.Vector3(1.46, 0.066, 0.87),
            new T.Vector3(-1.46, 0.066, 0.87),
            new T.Vector3(-1.46, 0.066, -0.87),
          ]),
        );
        const inset = new T.Line(
          insetGeometry,
          rememberMaterial(
            new T.LineBasicMaterial({
              color: 0x9b70df,
              transparent: true,
              opacity: 0.2,
              toneMapped: false,
            }),
          ),
        );
        group.add(inset);
        const glyph = makeGlyph(index);
        group.add(glyph);
        building.add(group);
        floors.push({
          group,
          glass,
          edge,
          glyph,
          hit,
          baseX,
          baseY,
          baseZ,
          emphasis,
        });
      }

      // One continuous spine and one persistent document module connect all five decisions.
      const spine = new T.Group();
      spine.position.set(-0.86, 0, -0.72);
      rod(spine, [0, -2.14, 0], [0, 2.12, 0], 0.009, brightCyan);
      rod(spine, [0, -2.14, 0], [0, 2.12, 0], 0.05, lightCyan);
      building.add(spine);
      const pillarGeometry = rememberGeometry(
        new T.BoxGeometry(0.028, 4.06, 0.028),
      );
      [-1.32, 1.3].forEach((x) => {
        const support = new T.Mesh(pillarGeometry, titanium);
        support.position.set(x, 0, -0.87);
        building.add(support);
      });

      const record = new T.Group();
      record.rotation.y = 0.48;
      const recordGeometry = rememberGeometry(
        new T.BoxGeometry(0.58, 0.64, 0.025),
      );
      const recordEdges = rememberGeometry(new T.EdgesGeometry(recordGeometry));
      const recordGlass = makeGlass(cyan, 1, true);
      const recordEdge = rememberMaterial(
        new T.LineBasicMaterial({
          color: 0x80eaff,
          transparent: true,
          opacity: 0.83,
          toneMapped: false,
        }),
      );
      for (let index = 0; index < 4; index++) {
        const pane = new T.Group();
        pane.position.set(index * 0.075, index * 0.035, -index * 0.14);
        pane.add(new T.Mesh(recordGeometry, recordGlass));
        pane.add(new T.LineSegments(recordEdges, recordEdge));
        record.add(pane);
      }
      const startingFloor = floors[startIndex];
      record.position.set(
        startingFloor.group.position.x + 0.48,
        startingFloor.baseY + 0.42,
        startingFloor.group.position.z + 0.9,
      );
      building.add(record);
      const wantedRecord = new T.Vector3();

      const connector = new T.Mesh(cylinderGeometry, polishedCyan);
      building.add(connector);
      const connectorA = new T.Vector3();
      const connectorB = new T.Vector3();

      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = glowCanvas.height = 128;
      const context = glowCanvas.getContext("2d");
      if (context) {
        const gradient = context.createRadialGradient(64, 64, 1, 64, 64, 64);
        gradient.addColorStop(0, "rgba(255,255,255,.9)");
        gradient.addColorStop(0.18, "rgba(255,255,255,.28)");
        gradient.addColorStop(0.55, "rgba(255,255,255,.06)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 128, 128);
        const glowTexture = new T.CanvasTexture(glowCanvas);
        textures.add(glowTexture);
        const glowMaterial = rememberMaterial(
          new T.SpriteMaterial({
            map: glowTexture,
            color: 0x8c5ef9,
            transparent: true,
            opacity: 0.29,
            blending: T.AdditiveBlending,
            depthWrite: false,
          }),
        );
        const glow = new T.Sprite(glowMaterial);
        glow.position.set(-0.9, 0.2, -1.2);
        glow.scale.set(5.8, 6.3, 1);
        scene.add(glow);
        const baseGlow = new T.Sprite(
          rememberMaterial(
            new T.SpriteMaterial({
              map: glowTexture,
              color: 0x00bcde,
              transparent: true,
              opacity: 0.24,
              blending: T.AdditiveBlending,
              depthWrite: false,
            }),
          ),
        );
        baseGlow.position.set(-0.6, -2.3, -0.5);
        baseGlow.scale.set(3.1, 0.9, 1);
        scene.add(baseGlow);
        const shadow = new T.Mesh(
          rememberGeometry(new T.PlaneGeometry(5, 3.8)),
          rememberMaterial(
            new T.MeshBasicMaterial({
              map: glowTexture,
              color: 0x000000,
              transparent: true,
              opacity: 0.5,
              depthWrite: false,
              toneMapped: false,
            }),
          ),
        );
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.set(0, -2.22, 0.2);
        building.add(shadow);
      }

      function scheduleFrame() {
        if (
          disposed ||
          contextLost ||
          !started ||
          !visible ||
          document.hidden ||
          frame
        )
          return;
        frame = requestAnimationFrame(renderFrame);
      }
      function renderFrame(time: number) {
        frame = 0;
        if (disposed || contextLost || !visible || document.hidden) return;
        const dt = previousTime
          ? Math.min(0.05, (time - previousTime) / 1000)
          : 1 / 60;
        previousTime = time;
        const animate =
          latest.current.motionEnabled && !latest.current.reducedMotion;
        const smoothing = animate ? 1 - Math.exp(-8.3 * dt) : 1;
        const active = selectedIndex(latest.current.activePillar);
        let unsettled = false;
        floors.forEach((floor, index) => {
          const target = index === active ? 1 : 0;
          const difference = target - floor.emphasis;
          floor.emphasis =
            Math.abs(difference) < 0.0005
              ? target
              : floor.emphasis + difference * smoothing;
          unsettled ||= Math.abs(target - floor.emphasis) > 0.0005;
          floor.group.position.x = floor.baseX + floor.emphasis * 0.3;
          floor.group.position.z = floor.baseZ + floor.emphasis * 1.05;
          floor.glass.uniforms.uTint.value
            .copy(violet)
            .lerp(cyan, floor.emphasis);
          floor.glass.uniforms.uActive.value = floor.emphasis;
          floor.edge.color.copy(violet).lerp(cyan, floor.emphasis);
          floor.edge.opacity = 0.48 + floor.emphasis * 0.45;
          floor.glyph.scale.setScalar(0.7 + floor.emphasis * 0.08);
        });
        const activeFloor = floors[active];
        wantedRecord.set(
          activeFloor.group.position.x + 0.48,
          activeFloor.baseY + 0.42,
          activeFloor.group.position.z + 0.9,
        );
        record.position.lerp(wantedRecord, smoothing);
        if (record.position.distanceToSquared(wantedRecord) < 0.000001)
          record.position.copy(wantedRecord);
        else unsettled = true;

        connectorA.set(-0.86, activeFloor.baseY + 0.085, -0.72);
        connectorB.set(
          activeFloor.group.position.x + 0.48,
          activeFloor.baseY + 0.085,
          activeFloor.group.position.z + 0.9,
        );
        delta.subVectors(connectorB, connectorA);
        connector.position.copy(connectorA).add(connectorB).multiplyScalar(0.5);
        connector.quaternion.setFromUnitVectors(axis, delta.normalize());
        connector.scale.set(0.009, connectorA.distanceTo(connectorB), 0.009);

        wantedCamera.copy(baseCamera);
        if (animate && !coarseQuery.matches) {
          wantedCamera.x += pointer.x * 0.36;
          wantedCamera.y += pointer.y * 0.2;
        }
        camera.position.lerp(wantedCamera, smoothing);
        if (camera.position.distanceToSquared(wantedCamera) < 0.000001)
          camera.position.copy(wantedCamera);
        else unsettled = true;
        camera.lookAt(lookAt);
        view.render(scene, camera);
        if (unsettled) scheduleFrame();
      }

      const resize = () => {
        if (disposed || contextLost) return;
        const width = Math.max(1, host.clientWidth);
        const height = Math.max(1, host.clientHeight);
        const pixelRatio = Math.min(
          window.devicePixelRatio || 1,
          smallDevice() ? 1.25 : 1.75,
        );
        view.setPixelRatio(pixelRatio);
        view.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const distance = Math.max(11.4, 7.9 / camera.aspect);
        baseCamera.copy(cameraDirection).multiplyScalar(distance).add(lookAt);
        camera.position.copy(baseCamera);
        camera.lookAt(lookAt);
        scheduleFrame();
      };

      const hitPillar = (event: PointerEvent | MouseEvent) => {
        const rect = view.domElement.getBoundingClientRect();
        if (!rect.width || !rect.height) return undefined;
        rayPointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        raycaster.setFromCamera(rayPointer, camera);
        const hit = raycaster.intersectObjects(
          floors.map((floor) => floor.hit),
          false,
        )[0];
        return hit?.object.userData.pillar as number | undefined;
      };
      const pointerMove = (event: PointerEvent) => {
        if (coarseQuery.matches || contextLost) return;
        const rect = view.domElement.getBoundingClientRect();
        pointer.set(
          ((event.clientX - rect.left) / rect.width - 0.5) * 2,
          -((event.clientY - rect.top) / rect.height - 0.5) * 2,
        );
        view.domElement.style.cursor =
          hitPillar(event) === undefined ? "default" : "pointer";
        if (latest.current.motionEnabled && !latest.current.reducedMotion)
          scheduleFrame();
      };
      const pointerLeave = () => {
        pointer.set(0, 0);
        view.domElement.style.cursor = "default";
        if (latest.current.motionEnabled && !latest.current.reducedMotion)
          scheduleFrame();
      };
      const click = (event: MouseEvent) => {
        if (contextLost) return;
        const index = hitPillar(event);
        if (index !== undefined) latest.current.onSelectPillar(index);
      };
      const visibilityChange = () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else {
          previousTime = 0;
          scheduleFrame();
        }
      };
      const contextLoss = (event: Event) => {
        event.preventDefault();
        if (disposed) return;
        contextLost = true;
        cancelAnimationFrame(frame);
        frame = 0;
        setReady(false);
        announceReady();
      };
      view.domElement.addEventListener("pointermove", pointerMove);
      view.domElement.addEventListener("pointerleave", pointerLeave);
      view.domElement.addEventListener("click", click);
      view.domElement.addEventListener("webglcontextlost", contextLoss);
      document.addEventListener("visibilitychange", visibilityChange);
      window.addEventListener("resize", resize, { passive: true });
      removers.push(
        () => view.domElement.removeEventListener("pointermove", pointerMove),
        () => view.domElement.removeEventListener("pointerleave", pointerLeave),
        () => view.domElement.removeEventListener("click", click),
        () =>
          view.domElement.removeEventListener("webglcontextlost", contextLoss),
        () =>
          document.removeEventListener("visibilitychange", visibilityChange),
        () => window.removeEventListener("resize", resize),
      );
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
      }
      if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (!visible) {
              cancelAnimationFrame(frame);
              frame = 0;
            } else {
              previousTime = 0;
              scheduleFrame();
            }
          },
          { rootMargin: "80px" },
        );
        observer.observe(host);
      }
      resize();
      await view.compileAsync(scene, camera);
      if (disposed || contextLost) return;
      started = true;
      requestRender.current = scheduleFrame;
      renderFrame(performance.now());
      setReady(true);
      announceReady();
    }

    const beginLoading = () => {
      loadingObserver?.disconnect();
      initialise().catch(() => {
        cleanup?.();
        cleanup = undefined;
        if (!disposed) {
          setReady(false);
          announceReady();
        }
      });
    };
    if (typeof IntersectionObserver !== "undefined") {
      loadingObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) beginLoading();
        },
        { rootMargin: "350px" },
      );
      loadingObserver.observe(host);
    } else {
      beginLoading();
    }

    return () => {
      disposed = true;
      loadingObserver?.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div
      className={styles.scene}
      data-ready={ready}
      data-motion={props.motionEnabled && !props.reducedMotion}
      role="img"
      aria-label={`Five architectural layers represent the five pillars of AI accountability. ${PILLARS[selectedIndex(props.activePillar)]} is selected.`}
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.fallback}>
        <ArchitecturalFallback
          active={selectedIndex(props.activePillar)}
          id={fallbackId}
        />
      </div>
      <div className={styles.canvasHost} ref={hostRef} />
    </div>
  );
}
