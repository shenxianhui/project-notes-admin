<template>
  <canvas :id="canvasTargetId" :height="height" :width="width" />
</template>

<script>
import FrameAnimation from '@/plugin/frame-animation';

export default {
  props: {
    canvasTargetId: {
      type: String,
      required: true
    },
    framesUrl: {
      type: Array,
      required: true
    },
    frequency: {
      type: Number,
      default: 20
    },
    loop: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
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
      width,
      height
    }) {
      const ani = new FrameAnimation({
        canvasTargetId, // target canvas ID
        framesUrl, // frames url
        frequency, // count of frames in one second
        loop, // if loop
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
        // $("#loading").hide();
        ani.play();
      });
    }
  }
};
</script>
