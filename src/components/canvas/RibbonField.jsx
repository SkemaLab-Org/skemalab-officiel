"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Generated light for the hero: three ribbons drawn in the browser.
 *
 * Runs a fragment shader with additive bloom for both dark and light modes,
 * reacting dynamically to scroll progress (scroll-pinned interaction).
 */

const TINTS = {
	dark: ["#3ad9bf", "#17a08c", "#0d6d60"],
	light: ["#099280", "#088070", "#066557"],
};

/* Kept in sync with the constants inside the fragment shader. */
const RIBBONS = [
	{ base: 0.4, a1: 0.085, f1: 2.1, p1: 0.0, a2: 0.032, f2: 5.3, p2: 1.1 },
	{ base: 0.5, a1: 0.07, f1: 1.7, p1: 1.9, a2: 0.04, f2: 4.1, p2: 0.4 },
	{ base: 0.6, a1: 0.095, f1: 2.6, p1: 3.4, a2: 0.028, f2: 6.2, p2: 2.2 },
];

const DPR_CAP = 2;
const STATIC_TIME = 9.4;

const VERTEX_SRC = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision mediump float;

uniform vec2 u_res;
uniform float u_time;
uniform float u_intensity;
uniform float u_isDark;
uniform vec3 u_tint0;
uniform vec3 u_tint1;
uniform vec3 u_tint2;

float ribbon(float x, float base, float a1, float f1, float p1, float a2, float f2, float p2) {
  return base
    + a1 * sin(f1 * x + p1 + u_time * 0.26)
    + a2 * sin(f2 * x + p2 - u_time * 0.17);
}

float glow(float d, float w) {
  float q = d / w;
  return exp(-q * q * 1.6);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float x = uv.x;
  float y = 1.0 - uv.y;

  float sprd = 1.0 + u_intensity * 1.8;
  float y0 = ribbon(x, 0.40, 0.085 * sprd, 2.1, 0.0, 0.032 * sprd, 5.3, 1.1);
  float y1 = ribbon(x, 0.50, 0.070 * sprd, 1.7, 1.9, 0.040 * sprd, 4.1, 0.4);
  float y2 = ribbon(x, 0.60, 0.095 * sprd, 2.6, 3.4, 0.028 * sprd, 6.2, 2.2);

  float w = 0.021;
  float b0 = glow(y - y0, w);
  float b1 = glow(y - y1, w * 1.15);
  float b2 = glow(y - y2, w * 1.3);

  vec3 acc = u_tint0 * b0 * 0.95
    + u_tint1 * b1 * 0.85
    + u_tint2 * b2 * 0.72;

  // Soft centre glow so crossings line up with the headline mass.
  float d = distance(uv, vec2(0.5, 0.46));
  float core = smoothstep(0.62, 0.0, d) * 0.11;
  acc += vec3(0.05, 0.15, 0.13) * core;

  // Let the ground win near the bottom edge where the veil begins.
  acc *= 1.0 - smoothstep(0.82, 1.0, y);

  float total = max(max(acc.r, acc.g), acc.b);
  float alpha = clamp(total * (u_isDark > 0.5 ? 0.92 : 1.15), 0.0, 0.92);

  // Additive crossings bloom toward pale mint in dark mode, rich emerald in light mode.
  float bloom = smoothstep(0.55, 1.2, acc.g);
  vec3 col = u_isDark > 0.5
    ? mix(acc, vec3(0.84, 1.0, 0.96) * alpha, bloom * 0.4)
    : mix(acc, vec3(0.04, 0.38, 0.32), bloom * 0.3);

  gl_FragColor = vec4(col, alpha);
}
`;

function hexToRgb(hex) {
	const value = hex.replace("#", "");
	return [
		parseInt(value.slice(0, 2), 16) / 255,
		parseInt(value.slice(2, 4), 16) / 255,
		parseInt(value.slice(4, 6), 16) / 255,
	];
}

function curve(ribbon, x, time, sp = 1) {
	return (
		ribbon.base +
		ribbon.a1 * sp * Math.sin(ribbon.f1 * x + ribbon.p1 + time * 0.26) +
		ribbon.a2 * sp * Math.sin(ribbon.f2 * x + ribbon.p2 - time * 0.17)
	);
}

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

function createWebGLRenderer(canvas, theme = "dark") {
	const gl =
		canvas.getContext("webgl", {
			alpha: true,
			antialias: false,
			premultipliedAlpha: true,
			powerPreference: "low-power",
		}) || canvas.getContext("experimental-webgl");

	if (!gl) return null;

	const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
	const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
	const program = gl.createProgram();

	if (!vertex || !fragment || !program) {
		gl.getExtension("WEBGL_lose_context")?.loseContext();
		return null;
	}

	gl.attachShader(program, vertex);
	gl.attachShader(program, fragment);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		gl.getExtension("WEBGL_lose_context")?.loseContext();
		return null;
	}

	gl.useProgram(program);

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([-1, -1, 3, -1, -1, 3]),
		gl.STATIC_DRAW,
	);

	const position = gl.getAttribLocation(program, "a_pos");
	gl.enableVertexAttribArray(position);
	gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

	const isDark = theme === "dark";
	const uniforms = {
		res: gl.getUniformLocation(program, "u_res"),
		time: gl.getUniformLocation(program, "u_time"),
		intensity: gl.getUniformLocation(program, "u_intensity"),
		isDark: gl.getUniformLocation(program, "u_isDark"),
		tints: [0, 1, 2].map((i) => gl.getUniformLocation(program, `u_tint${i}`)),
	};

	gl.enable(gl.BLEND);
	if (isDark) {
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	} else {
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	}
	gl.clearColor(0, 0, 0, 0);
	gl.uniform1f(uniforms.isDark, isDark ? 1.0 : 0.0);
	const colors = TINTS[theme].map(hexToRgb);
	colors.forEach((rgb, index) => gl.uniform3fv(uniforms.tints[index], rgb));

	gl.clear(gl.COLOR_BUFFER_BIT);

	return {
		resize(width, height) {
			gl.viewport(0, 0, width, height);
			gl.uniform2f(uniforms.res, width, height);
			gl.clear(gl.COLOR_BUFFER_BIT);
		},
		draw(time, intensity = 0) {
			gl.uniform1f(uniforms.time, time);
			gl.uniform1f(uniforms.intensity, intensity);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		},
		dispose() {
			gl.deleteBuffer(buffer);
			gl.deleteProgram(program);
			gl.deleteShader(vertex);
			gl.deleteShader(fragment);
			gl.getExtension("WEBGL_lose_context")?.loseContext();
		},
	};
}

function create2DRenderer(canvas, theme) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;

	const dark = theme === "dark";
	const colors = TINTS[theme];
	const alphas = dark ? [0.34, 0.26, 0.2] : [0.45, 0.38, 0.3];
	const widths = dark ? [5, 4, 3.5] : [4.5, 3.8, 3.0];
	let cssWidth = 0;
	let cssHeight = 0;

	return {
		resize(width, height) {
			cssWidth = width;
			cssHeight = height;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const dpr = canvas.width / Math.max(width, 1);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		},
		draw(time, intensity = 0) {
			if (!cssWidth || !cssHeight) return;
			const sp = 1 + intensity * 1.8;

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const dpr = canvas.width / Math.max(cssWidth, 1);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
			ctx.lineCap = "round";
			ctx.lineJoin = "round";

			RIBBONS.forEach((ribbon, index) => {
				ctx.beginPath();
				const step = Math.max(2, cssWidth / 360);
				for (let x = -step; x <= cssWidth + step; x += step) {
					const y = curve(ribbon, x / cssWidth, time, sp) * cssHeight;
					if (x < 0) ctx.moveTo(0, y);
					else ctx.lineTo(x, y);
				}
				ctx.strokeStyle = colors[index];
				ctx.globalAlpha = alphas[index];
				ctx.lineWidth = widths[index];
				ctx.stroke();
			});

			ctx.globalAlpha = 1;
			ctx.globalCompositeOperation = "source-over";
		},
		dispose() {},
	};
}

export default function RibbonField({ className = "", scrollProgress }) {
	const wrapRef = useRef(null);
	const { theme } = useTheme();
	const reduce = useReducedMotion();

	useEffect(() => {
		const wrap = wrapRef.current;
		if (!wrap) return undefined;

		const makeCanvas = () => {
			const element = document.createElement("canvas");
			element.setAttribute("aria-hidden", "true");
			element.style.display = "block";
			element.style.width = "100%";
			element.style.height = "100%";
			return element;
		};

		let canvas = makeCanvas();
		let renderer = createWebGLRenderer(canvas, theme);

		if (!renderer) {
			canvas.remove();
			canvas = makeCanvas();
			renderer = create2DRenderer(canvas, theme);
		}

		if (!renderer) return undefined;

		wrap.appendChild(canvas);

		let raf = 0;
		let elapsed = STATIC_TIME;
		let last = 0;
		let inView = true;
		let mounted = true;

		const getScrollFactor = () => {
			if (scrollProgress && typeof scrollProgress.get === "function") {
				return scrollProgress.get() * 8.0;
			}
			return typeof window !== "undefined" ? window.scrollY * 0.0025 : 0;
		};

		const resize = () => {
			const rect = wrap.getBoundingClientRect();
			const width = Math.max(1, Math.round(rect.width));
			const height = Math.max(1, Math.round(rect.height));
			const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
			const pixelWidth = Math.round(width * dpr);
			const pixelHeight = Math.round(height * dpr);

			if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
				canvas.width = pixelWidth;
				canvas.height = pixelHeight;
			}

			renderer.resize(pixelWidth, pixelHeight);
			renderer.draw(elapsed + getScrollFactor());
		};

		const shouldRun = () => mounted && inView && !document.hidden && !reduce;

		let currentIntensity = 0;
		const heroEl = document.getElementById("hero");
		const tick = (now) => {
			raf = 0;
			if (!shouldRun()) return;
			if (last) elapsed += Math.min((now - last) / 1000, 0.1);
			last = now;
			if (heroEl) {
				const val = parseFloat(heroEl.style.getPropertyValue("--p"));
				if (!isNaN(val)) currentIntensity = val;
			}
			renderer.draw(elapsed + getScrollFactor(), currentIntensity);
			raf = requestAnimationFrame(tick);
		};

		const start = () => {
			if (raf || !shouldRun()) return;
			last = 0;
			raf = requestAnimationFrame(tick);
		};

		const stop = () => {
			if (raf) cancelAnimationFrame(raf);
			raf = 0;
			last = 0;
		};

		const observer =
			typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;

		if (observer) observer.observe(wrap);

		const intersection =
			typeof IntersectionObserver !== "undefined"
				? new IntersectionObserver(
						(entries) => {
							inView = entries.some((entry) => entry.isIntersecting);
							if (inView) start();
							else stop();
						},
						{ rootMargin: "0px", threshold: 0 },
					)
				: null;

		if (intersection) intersection.observe(wrap);

		const onVisibility = () => {
			if (document.hidden) stop();
			else start();
		};

		let unsubScroll = () => {};
		if (scrollProgress) {
			const updateIntensity = (latest) => {
				currentIntensity = Math.max(
					0,
					Math.min(1, typeof latest === "number" ? latest : 0),
				);
				if (shouldRun()) {
					renderer.draw(elapsed + currentIntensity * 4.0, currentIntensity);
				}
			};
			if (typeof scrollProgress.on === "function") {
				unsubScroll = scrollProgress.on("change", updateIntensity);
			} else if (typeof scrollProgress.onChange === "function") {
				unsubScroll = scrollProgress.onChange(updateIntensity);
			}
		}

		const onScrollFallback = () => {
			if (!scrollProgress && shouldRun()) {
				renderer.draw(elapsed + getScrollFactor(), currentIntensity);
			}
		};

		window.addEventListener("resize", resize);
		window.addEventListener("scroll", onScrollFallback, { passive: true });
		document.addEventListener("visibilitychange", onVisibility);

		const onContextLost = (event) => {
			event.preventDefault();
			stop();
			try {
				renderer.dispose();
			} catch {
				/* already gone */
			}
			canvas.remove();
			canvas = makeCanvas();
			const fallback = create2DRenderer(canvas, theme);
			if (!fallback) return;
			wrap.appendChild(canvas);
			renderer = fallback;
			resize();
			start();
		};

		canvas.addEventListener("webglcontextlost", onContextLost);

		resize();

		if (reduce) {
			renderer.draw(STATIC_TIME);
		} else {
			start();
		}

		return () => {
			mounted = false;
			stop();
			observer?.disconnect();
			intersection?.disconnect();
			unsubScroll();
			window.removeEventListener("resize", resize);
			window.removeEventListener("scroll", onScrollFallback);
			document.removeEventListener("visibilitychange", onVisibility);
			canvas.removeEventListener("webglcontextlost", onContextLost);
			renderer.dispose();
			canvas.remove();
		};
	}, [theme, reduce, scrollProgress]);

	return (
		<div
			ref={wrapRef}
			aria-hidden="true"
			className={`pointer-events-none absolute inset-0 ${className}`}
		/>
	);
}
