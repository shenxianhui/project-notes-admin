<template>
  <canvas
    :id="canvasTargetId"
    :height="height"
    :width="width"
    :style="{ zoom }"
  />
</template>

<script>
import FrameAnimation from '@/plugin/frame-animation';

export default {
  props: {
    // canvas id
    canvasTargetId: {
      type: String,
      required: true
    },
    // 文件路径
    framesUrl: {
      type: Array,
      required: true
    },
    // 频率
    frequency: {
      type: Number,
      default: 20
    },
    // 循环
    loop: {
      type: Boolean,
      default: true
    },
    // 起始X
    startX: {
      type: Number,
      default: 0
    },
    // 起始Y
    startY: {
      type: Number,
      default: 0
    },
    // 宽度
    width: {
      type: Number,
      required: true
    },
    // 高度
    height: {
      type: Number,
      required: true
    },
    // 缩放
    zoom: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    this.play_animation(this);
  },
  methods: {
    play_animation({
      canvasTargetId,
      framesUrl,
      frequency = 20,
      loop = true,
      startX,
      startY,
      width,
      height
    }) {
      const ani = new FrameAnimation({
        canvasTargetId, // target canvas ID
        framesUrl, // frames url
        frequency, // count of frames in one second
        loop, // if loop
        startX,
        startY,
        width, // source image's width (px)
        height, // source image's height (px)
        // audioIonName: "bgm_1", // ion.sound audio name
        onComplete() {
          // complete callback
          console.log('Animation loop');
        }
      });

      // preload & play
      ani.initialize(() => {
        ani.play();
      });
    }
  }
};
</script>
