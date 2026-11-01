"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const VERTEX_SHADER = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_base;

float ribbon(float y, float center, float thickness) {
  return 1.0 - smoothstep(0.0, thickness, abs(y - center));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time;
  float x = uv.x;
  float pointer = (u_pointer.y - 0.5) * 0.045;

  float y1 = 0.575
    + 0.105 * sin(x * 5.1 + t * 0.18 + 0.6)
    + 0.042 * sin(x * 12.7 - t * 0.11 + 1.8);
  float y2 = 0.505
    + 0.125 * sin(x * 4.2 - t * 0.15 + 2.4)
    + 0.050 * sin(x * 10.9 + t * 0.09 + 0.4);
  float y3 = 0.445
    + 0.095 * sin(x * 6.4 + t * 0.21 + 4.2)
    + 0.038 * sin(x * 14.3 - t * 0.07 + 3.1);

  y1 += pointer;
  y2 += pointer * 0.65;
  y3 += pointer * 1.15;

  float thickness = 0.0065 + 0.0015 * sin(t * 0.4);

  float b1 = ribbon(uv.y, y1, thickness);
  float b2 = ribbon(uv.y, y2, thickness);
  float b3 = ribbon(uv.y, y3, thickness);

  float h1 = exp(-abs(uv.y - y1) * 48.0) * 0.18;
  float h2 = exp(-abs(uv.y - y2) * 44.0) * 0.16;
  float h3 = exp(-abs(uv.y - y3) * 52.0) * 0.13;

  vec3 col = u_base;
  col += u_c1 * (b1 * 0.82 + h1);
  col += u_c2 * (b2 * 0.70 + h2);
  col += u_c3 * (b3 * 0.58 + h3);

  float bloom = exp(
    -length(vec2((uv.x - 0.52) * 1.15, (uv.y - 0.50) * 2.4)) * 3.4
  ) * 0.055;
  col += u_c2 * bloom;

  gl_FragColor = vec4(col, 1.0);
}
`;

const COLORS = {
  base: [0.027, 0.067, 0.055],
  teal: [0.09, 0.63, 0.55],
  mint: [0.37, 0.92, 0.83],
  gold: [0.77, 0.66, 0.5],
};

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function buildProgram(gl) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function drawFallback(ctx, width, height, time) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#07110e";
  ctx.fillRect(0, 0, width, height);

  const ribbons = [
    { color: "rgba(23,160,140,0.72)", phase: 0.6, speed: 0.18, amp: 0.105, freq: 5.1, second: 0.042 },
    { color: "rgba(94,234,212,0.58)", phase: 2.4, speed: -0.15, amp: 0.125, freq: 4.2, second: 0.05 },
    { color: "rgba(197,168,128,0.42)", phase: 4.2, speed: 0.21, amp: 0.095, freq: 6.4, second: 0.038 },
  ];

  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";

  for (const ribbon of ribbons) {
    const points = [];
    const steps = Math.max(90, Math.round(width / 8));
    for (let i = 0; i <= steps; i += 1) {
      const x = i / steps;
      const y =
        0.51 +
        ribbon.amp * Math.sin(x * ribbon.freq + time * ribbon.speed + ribbon.phase) +
        ribbon.second *
          Math.sin(x * ribbon.freq * 2.4 - time * ribbon.speed * 0.6 + ribbon.phase * 1.7);
      points.push([x * width, (1 - y) * height]);
    }

    for (const [lineWidth, alpha] of [
      [Math.max(22, height * 0.055), 0.18],
      [Math.max(5, height * 0.014), 1],
    ]) {
      ctx.beginPath();
      points.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = ribbon.color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

export default function RibbonCanvas({ className = "" }) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });

    const context2d = gl ? null : canvas.getContext("2d");
    if (!gl && !context2d) return undefined;

    const program = gl ? buildProgram(gl) : null;
    const locations = program
      ? {
          position: gl.getAttribLocation(program, "a_position"),
          resolution: gl.getUniformLocation(program, "u_resolution"),
          time: gl.getUniformLocation(program, "u_time"),
          pointer: gl.getUniformLocation(program, "u_pointer"),
          c1: gl.getUniformLocation(program, "u_c1"),
          c2: gl.getUniformLocation(program, "u_c2"),
          c3: gl.getUniformLocation(program, "u_c3"),
          base: gl.getUniformLocation(program, "u_base"),
        }
      : null;

    let buffer = null;
    if (gl && program && locations) {
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1, 1, -1, -1, 1,
          -1, 1, 1, -1, 1, 1,
        ]),
        gl.STATIC_DRAW,
      );
      gl.useProgram(program);
      gl.enableVertexAttribArray(locations.position);
      gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform3fv(locations.c1, COLORS.teal);
      gl.uniform3fv(locations.c2, COLORS.mint);
      gl.uniform3fv(locations.c3, COLORS.gold);
      gl.uniform3fv(locations.base, COLORS.base);
    }

    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = null;
    let visible = true;
    let last = 0;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
      draw(performance.now());
    };

    const draw = (now) => {
      const time = (now - start) / 1000;

      const pointer = pointerRef.current;
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      if (gl && program && locations) {
        gl.uniform2f(locations.resolution, canvas.width, canvas.height);
        gl.uniform1f(locations.time, time);
        gl.uniform2f(locations.pointer, pointer.x, pointer.y);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        return;
      }

      if (context2d) drawFallback(context2d, width, height, time);
    };

    const frame = (now) => {
      raf = null;
      if (!visible || document.hidden) {
        raf = requestAnimationFrame(frame);
        return;
      }
      if (now - last < 30) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const begin = () => {
      if (reduce || raf) return;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) begin();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onPointerMove = (event) => {
      pointerRef.current.targetX = event.clientX / window.innerWidth;
      pointerRef.current.targetY = 1 - event.clientY / window.innerHeight;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else begin();
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    const observerResize = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(resize)
      : null;
    observerResize?.observe(canvas);

    resize();
    if (!reduce) begin();

    return () => {
      stop();
      observer.disconnect();
      observerResize?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      if (gl && buffer) gl.deleteBuffer(buffer);
      if (gl && program) gl.deleteProgram(program);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
