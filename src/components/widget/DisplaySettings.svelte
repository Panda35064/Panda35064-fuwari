<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import {
	getDefaultHue,
	getDefaultOpacity, // 👈 新增导入
	getHue,
	getOpacity, // 👈 新增导入
	setHue,
	setOpacity, // 👈 新增导入
} from "@utils/setting-utils";

let hue = getHue();
const defaultHue = getDefaultHue();

// 👇 新增：透明度相关
let opacity = getOpacity();
const defaultOpacity = getDefaultOpacity();

function resetHue() {
	hue = getDefaultHue();
}

// 👇 新增：重置透明度
function resetOpacity() {
	opacity = getDefaultOpacity();
}

// 👇 新增：响应式语句：当 opacity 改变时自动调用 setOpacity
$: if (opacity !== undefined) {
	setOpacity(opacity);
}

$: if (hue || hue === 0) {
	setHue(hue);
}
</script>

<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4">
    <div class="flex flex-row gap-2 mb-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            {i18n(I18nKey.themeColor)}
            <button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md  active:scale-90 will-change-transform"
                    class:opacity-0={hue === defaultHue} class:pointer-events-none={hue === defaultHue} on:click={resetHue}>
                <div class="text-[var(--btn-content)]">
                    <Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
                </div>
            </button>
        </div>
        <div class="flex gap-1">
            <div id="hueValue" class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
            font-bold text-sm items-center text-[var(--btn-content)]">
                {hue}
            </div>
        </div>
    </div>
    <div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
        <input aria-label={i18n(I18nKey.themeColor)} type="range" min="0" max="360" bind:value={hue}
               class="slider" id="colorSlider" step="5" style="width: 100%">
    </div>

    <!-- ========== 透明度部分（新增） ========== -->
    <div class="flex flex-row gap-2 mb-3 items-center justify-between">
        <!-- 标题和重置按钮 -->
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            {i18n(I18nKey.panelOpacity)}
            <button
                aria-label="Reset to Default"
                class="btn-regular w-7 h-7 rounded-md active:scale-90 will-change-transform"
                class:opacity-0={opacity === defaultOpacity}
                class:pointer-events-none={opacity === defaultOpacity}
                on:click={resetOpacity}
            >
                <div class="text-[var(--btn-content)]">
                    <Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
                </div>
            </button>
        </div>
        <!-- 当前值显示 -->
        <div class="flex gap-1">
            <div id="opacityValue" class="transition bg-[var(--btn-regular-bg)] w-12 h-7 rounded-md flex justify-center
            font-bold text-sm items-center text-[var(--btn-content)]">
                {Math.round(opacity * 100)}%
            </div>
        </div>
    </div>
    <!-- 透明度滑块 -->
    <div class="w-full h-6 px-1 bg-gradient-to-r from-black/10 via-black/50 to-black/90 dark:from-white/10 dark:via-white/50 dark:to-white/90 rounded select-none">
        <input
            aria-label={i18n(I18nKey.panelOpacity)}
            type="range"
            min="0"
            max="1"
            bind:value={opacity}
            class="slider opacity-slider"
            id="opacitySlider"
            step="0.01"
            style="width: 100%"
        >
    </div>
</div>


<style lang="stylus">
    #display-setting
      input[type="range"]
        -webkit-appearance none
        height 1.5rem
        background-image var(--color-selection-bar)
        transition background-image 0.15s ease-in-out

        /* Input Thumb */
        &::-webkit-slider-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-moz-range-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          border-width 0
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-ms-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

</style>
