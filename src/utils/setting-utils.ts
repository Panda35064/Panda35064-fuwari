import {
	AUTO_MODE,
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
} from "@constants/constants.ts";
import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback, 10);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
	// 👇 新增：Hue 改变后重新应用透明度
	// 虽然当前实现简化了颜色转换（忽略了 hue），但为了保持一致性，
	// 以及为将来可能的精确颜色转换做准备，这里也重新应用透明度
	applyOpacityOnThemeChange();
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	switch (theme) {
		case LIGHT_MODE:
			document.documentElement.classList.remove("dark");
			break;
		case DARK_MODE:
			document.documentElement.classList.add("dark");
			break;
		case AUTO_MODE:
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			break;
	}

	// Set the theme for Expressive Code
	document.documentElement.setAttribute(
		"data-theme",
		expressiveCodeConfig.theme,
	);

	// 👇 新增：主题切换后重新应用透明度
	// 因为亮色和暗色模式使用不同的颜色计算方式，切换主题时需要重新计算
	applyOpacityOnThemeChange();
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}

/**
 * 获取默认透明度值
 * 优先从配置文件读取，如果没有配置则返回 1.0（完全不透明）
 * @returns 默认透明度，1.0 表示完全不透明
 */
export function getDefaultOpacity(): number {
	const fallback = "0.8";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseFloat(configCarrier?.dataset.opacity || fallback);
}

/**
 * 从 localStorage 获取保存的透明度值
 * 如果未保存过，返回默认值
 * @returns 透明度值，范围 0-1
 */
export function getOpacity(): number {
	const stored = localStorage.getItem("panelOpacity");
	// 如果 localStorage 中有值，解析为浮点数；否则返回默认值
	return stored ? Number.parseFloat(stored) : getDefaultOpacity();
}

/**
 * 设置透明度并应用到 CSS 变量
 * 这是核心函数，负责：
 * 1. 保存透明度到 localStorage
 * 2. 根据当前主题模式计算背景颜色
 * 3. 动态设置 CSS 变量
 *
 * @param opacity 透明度值，范围 0-1（0=完全透明，1=完全不透明）
 */
export function setOpacity(opacity: number): void {
	// 1. 保存到 localStorage，实现持久化
	localStorage.setItem("panelOpacity", String(opacity));

	// 2. 获取根元素（:root），用于设置 CSS 变量
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		// 如果获取不到根元素（理论上不应该发生），直接返回
		return;
	}

	// 3. 检查当前是否为暗色模式
	const isDark = r.classList.contains("dark");

	// 4. 根据主题模式设置不同的背景颜色
	if (isDark) {
		// === 暗色模式 ===
		// 原始颜色定义：oklch(0.23 0.015 var(--hue))
		// 为了简化，我们将 lightness 0.23 转换为灰度值
		// lightness 范围是 0-1，需要乘以 255 转换为 RGB 值
		const gray = Math.round(0.23 * 255); // 约等于 59

		// 设置卡片背景：rgba(59, 59, 59, opacity)
		// 这样只有背景变透明，文字等子元素不受影响
		r.style.setProperty(
			"--card-bg",
			`rgba(${gray}, ${gray}, ${gray}, ${opacity})`,
		);

		// 浮动面板的背景色稍暗一些
		const grayPanel = Math.round(0.19 * 255); // 约等于 48
		r.style.setProperty(
			"--float-panel-bg",
			`rgba(${grayPanel}, ${grayPanel}, ${grayPanel}, ${opacity})`,
		);
	} else {
		// === 亮色模式 ===
		// 原始颜色是白色，直接使用 rgba(255, 255, 255, opacity)
		r.style.setProperty("--card-bg", `rgba(255, 255, 255, ${opacity})`);
		r.style.setProperty("--float-panel-bg", `rgba(255, 255, 255, ${opacity})`);
	}
}

/**
 * 当主题切换时，重新应用透明度设置
 * 这个函数会在主题切换和色相改变时被调用
 */
export function applyOpacityOnThemeChange(): void {
	const opacity = getOpacity();
	setOpacity(opacity);
}
