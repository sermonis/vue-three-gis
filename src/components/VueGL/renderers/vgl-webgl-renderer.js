import * as THREE from 'three';

import { boolean, string } from '../validators';
import { cameraPropRequiredMessage, scenePropRequiredMessage, cameraTypeUnknownMessage } from '../messages';

import vglWorld from '../core/vgl-world';

/**
 * This component creates a canvas that have WebGL context.
 * Options are corresponding [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/core/Object3D).
 *
 * Properties of [vglWorld](vgl-namespace) are also available as mixin.
 */

export default {
  mixins: [ vglWorld ],
  props: {
    /** Shader precision. Can be "highp", "mediump" or "lowp". */
    precision: string,
    /** Whether the canvas contains an alpha (transparency) buffer or not. */
    alpha: boolean,
    /** Whether the renderer will assume that colors have premultiplied alpha. */
    disablePremultipliedAlpha: boolean,
    /** Whether to perform antialiasing. */
    antialias: boolean,
    /** Whether the drawing buffer has a stencil buffer of at least 8 bits. */
    disableStencil: boolean,
    /**
     * A hint to the user agent indicating what configuration of GPU is suitable
     * for this WebGL context. Can be "high-performance", "low-power" or "default".
     */
    powerPreference: string,
    /** Whether to preserve the buffers until manually cleared or overwritten. */
    preserveDrawingBuffer: boolean,
    /** Whether the drawing buffer has a depth buffer of at least 16 bits. */
    disableDepth: boolean,
    /** Whether to use a logarithmic depth buffer. */
    logarithmicDepthBuffer: boolean,
    /** Name of the using camera. */
    camera: string,
    /** Name of the target scene. */
    scene: string,
    /** If set, use shadow maps in the scene. */
    shadowMapEnabled: boolean,
  },
  computed: {
    inst() {
      const inst = new THREE.WebGLRenderer({
        precision: this.precision,
        alpha: this.alpha,
        premultipliedAlpha: !this.disablePremultipliedAlpha,
        antialias: this.antialias,
        stencil: !this.disableStencil,
        preserveDrawingBuffer: this.preserveDrawingBuffer,
        depth: !this.disableDepth,
        logarithmicDepthBuffer: this.logarithmicDepthBuffer,
        powerPreference: this.powerPreference,
      });
      inst.shadowMap.enabled = this.shadowMapEnabled;
      return inst;
    },
    cameraInst() {
      if (this.camera !== undefined) return this.vglWorld.cameras[this.camera];
      let camera;
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const key in this.vglWorld.cameras) {
        if (camera) throw new ReferenceError(cameraPropRequiredMessage);
        camera = this.vglWorld.cameras[key];
      }
      return camera;
    },
    sceneInst() {
      if (this.scene !== undefined) return this.vglWorld.scenes[this.scene];
      let scene;
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const key in this.vglWorld.scenes) {
        if (scene) throw new ReferenceError(scenePropRequiredMessage);
        scene = this.vglWorld.scenes[key];
      }
      return scene;
    },
  },
  methods: {
    render() {
      const { inst, cameraInst, sceneInst } = this;
      if (cameraInst && sceneInst) {
        if (cameraInst.isPerspectiveCamera) {
          const aspect = this.$el.clientWidth / this.$el.clientHeight;
          if (cameraInst.aspect !== aspect) {
            cameraInst.aspect = aspect;
            cameraInst.updateProjectionMatrix();
          }
        } else if (cameraInst.isOrthographicCamera) {
          const width = this.$el.clientWidth / 2;
          const height = this.$el.clientHeight / 2;
          if (cameraInst.right !== width || cameraInst.top !== height) {
            cameraInst.left = -width;
            cameraInst.right = width;
            cameraInst.top = height;
            cameraInst.bottom = -height;
            cameraInst.updateProjectionMatrix();
          }
        } else {
          throw new TypeError(cameraTypeUnknownMessage);
        }
        inst.render(sceneInst, cameraInst);
      }
    },
  },
  watch: {
    inst(inst, oldInst) {
      if (this.$el) {
        inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
        this.$el.replaceChild(inst.domElement, oldInst.domElement);
        this.vglWorld.update();
      }
      oldInst.dispose();
    },
  },
  created() {
    this.vglWorld.renderers.push(this);
  },
  mounted() {
    this.inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
    this.$el.appendChild(this.inst.domElement);
    this.vglWorld.update();
  },
  beforeDestroy() {
    this.vglWorld.renderers.splice(this.vglWorld.renderers.indexOf(this), 1);
    this.inst.dispose();
  },
  render(h) {
    return h('div', [h('iframe', {
      style: {
        visibility: 'hidden',
        width: '100%',
        height: '100%',
        marginRight: '-100%',
        border: 'none',
      },
      on: {
        load: (event) => {
          event.target.contentWindow.addEventListener('resize', () => {
            this.inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
            this.vglWorld.update();
          }, false);
        },
      },
    }, this.$slots.default)]);
  },
};
