import type {
	CommentConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Panda君",
	subtitle: "个人Blog",
	lang: "zh_CN", // 语言代码，例如 'en', 'zh_CN', 'ja' 等
	themeColor: {
		hue: 250, // 主题颜色的默认色调，范围 0 到 360。例如 红色: 0, 青色: 200, 青蓝色: 250, 粉色: 345
		fixed: false, // 隐藏访客的主题颜色选择器
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // 相对于 /src 目录。如果以 '/' 开头则相对于 /public 目录
		position: "center", // 等同于 object-position，仅支持 'top', 'center', 'bottom'。默认为 'center'
		credit: {
			enable: false, // 显示横幅图像的归属文本
			text: "", // 要显示的归属文本
			url: "", // (可选) 原始作品或艺术家页面的 URL 链接
		},
	},
	toc: {
		enable: true, // 在文章右侧显示目录
		depth: 2, // 目录中显示的最大标题深度，范围 1 到 3
	},
	favicon: [
		// 保持此数组为空以使用默认的 favicon
		// {
		//   src: '/favicon/icon.png',    // favicon 的路径，相对于 /public 目录
		//   theme: 'light',              // (可选) 'light' 或 'dark'，仅在明暗模式下有不同 favicon 时设置
		//   sizes: '32x32',              // (可选) favicon 的大小，仅在有不同尺寸的 favicon 时设置
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png", // 相对于 /src 目录。如果以 '/' 开头则相对于 /public 目录
	name: "Panda君",
	bio: "当只有认定这是谷底时，才会一步一步向上走。",
	links: [
		{
			name: "BiliBili",
			icon: "fa6-brands:bilibili", // 访问 https://icones.js.org/ 获取图标代码
			// 如果尚未包含，需要安装对应的图标集合
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/402605295",
		},
		{
			name: "Tiktok",
			icon: "fa6-brands:tiktok", // 访问 https://icones.js.org/ 获取图标代码
			// 如果尚未包含，需要安装对应的图标集合
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://www.douyin.com/user/MS4wLjABAAAAB8-KQBEeX_JFPkVSar1dEvTr78MoN5UW59ftU8U6YNHdQAw0SVxz2RKfk1Nc4Eeo",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://steamcommunity.com/id/1557537359/",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Panda35064",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（如背景颜色）正在被覆盖，请查看 astro.config.mjs 文件。
	// 请选择深色主题，因为此博客主题目前仅支持深色背景颜色
	theme: "github-dark",
};

export const commentConfig: CommentConfig = {
	twikoo: {
		envId: "https://panda35064-twikoo.netlify.app/.netlify/functions/twikoo",
	},
};
