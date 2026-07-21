import React, { useEffect, useRef } from 'react';
import {
  Vector3 as Vector3Alias,
  MeshPhysicalMaterial as MeshPhysicalMaterialAlias,
  InstancedMesh as InstancedMeshAlias,
  Timer as TimerAlias,
  AmbientLight as AmbientLightAlias,
  SphereGeometry as SphereGeometryAlias,
  ShaderChunk as ShaderChunkAlias,
  Scene as SceneAlias,
  Color as ColorAlias,
  Object3D as Object3DAlias,
  SRGBColorSpace as SRGBColorSpaceAlias,
  MathUtils as MathUtilsAlias,
  PMREMGenerator as PMREMGeneratorAlias,
  Vector2 as Vector2Alias,
  WebGLRenderer as WebGLRendererAlias,
  PerspectiveCamera as PerspectiveCameraAlias,
  PointLight as PointLightAlias,
  ACESFilmicToneMapping as ACESFilmicToneMappingAlias,
  Plane as PlaneAlias,
  Raycaster as RaycasterAlias
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface BallpitConfig {
  count?: number;
  colors?: number[];
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  materialParams?: {
    metalness?: number;
    roughness?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
  };
  minSize?: number;
  maxSize?: number;
  size0?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
  controlSphere0?: boolean;
  followCursor?: boolean;
  size?: 'parent' | { width: number; height: number };
  canvas?: HTMLCanvasElement;
  id?: string;
  rendererOptions?: Record<string, any>;
}

class ThreeCanvas {
  private config: BallpitConfig;
  canvas!: HTMLCanvasElement;
  camera!: PerspectiveCameraAlias;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov?: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene!: SceneAlias;
  renderer!: WebGLRendererAlias;
  private postprocessingEffect?: any;
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render = this.defaultRender;
  onBeforeRender: (data: { elapsed: number; delta: number }) => void = () => {};
  onAfterRender: (data: { elapsed: number; delta: number }) => void = () => {};
  onAfterResize: (size: typeof this.size) => void = () => {};
  private isIntersecting = false;
  private isAnimating = false;
  isDisposed = false;
  private intersectionObserver?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private resizeTimeout?: any;
  private timer = new TimerAlias();
  private clockData = { elapsed: 0, delta: 0 };
  private animationFrameId?: number;

  constructor(config: BallpitConfig) {
    this.config = { ...config };
    this.initCamera();
    this.initScene();
    this.initRenderer();
    this.resize();
    this.initEvents();
  }

  private initCamera() {
    this.camera = new PerspectiveCameraAlias();
    this.cameraFov = this.camera.fov;
  }

  private initScene() {
    this.scene = new SceneAlias();
  }

  private initRenderer() {
    if (this.config.canvas) {
      this.canvas = this.config.canvas;
    } else if (this.config.id) {
      this.canvas = document.getElementById(this.config.id) as HTMLCanvasElement;
    } else {
      console.error('Three: Missing canvas or id parameter');
    }
    this.canvas.style.display = 'block';
    const opts = {
      canvas: this.canvas,
      powerPreference: 'high-performance',
      ...(this.config.rendererOptions ?? {})
    };
    this.renderer = new WebGLRendererAlias(opts);
    this.renderer.outputColorSpace = SRGBColorSpaceAlias;
  }

  private initEvents() {
    if (!(this.config.size instanceof Object)) {
      window.addEventListener('resize', this.onWindowResize.bind(this));
      if (this.config.size === 'parent' && this.canvas.parentNode) {
        this.resizeObserver = new ResizeObserver(this.onWindowResize.bind(this));
        this.resizeObserver.observe(this.canvas.parentNode as Element);
      }
    }
    this.intersectionObserver = new IntersectionObserver(this.onIntersection.bind(this), {
      root: null,
      rootMargin: '0px',
      threshold: 0
    });
    this.intersectionObserver.observe(this.canvas);
    document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
  }

  private removeEvents() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibilityChange.bind(this));
  }

  private onIntersection(entries: IntersectionObserverEntry[]) {
    this.isIntersecting = entries[0].isIntersecting;
    this.isIntersecting ? this.startLoop() : this.stopLoop();
  }

  private onVisibilityChange() {
    if (this.isIntersecting) {
      document.hidden ? this.stopLoop() : this.startLoop();
    }
  }

  private onWindowResize() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.resize.bind(this), 100);
  }

  resize() {
    let w: number, h: number;
    if (this.config.size instanceof Object) {
      w = this.config.size.width;
      h = this.config.size.height;
    } else if (this.config.size === 'parent' && this.canvas.parentNode) {
      w = (this.canvas.parentNode as HTMLElement).offsetWidth;
      h = (this.canvas.parentNode as HTMLElement).offsetHeight;
    } else {
      w = window.innerWidth;
      h = window.innerHeight;
    }
    this.size.width = w;
    this.size.height = h;
    this.size.ratio = w / h;
    this.updateCameraAspect();
    this.updateRendererSize();
    this.onAfterResize(this.size);
  }

  private updateCameraAspect() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.clampFov(this.cameraMinAspect);
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        this.clampFov(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }

  private clampFov(aspect: number) {
    const tan = Math.tan(MathUtilsAlias.degToRad(this.cameraFov! / 2)) / (this.camera.aspect / aspect);
    this.camera.fov = 2 * MathUtilsAlias.radToDeg(Math.atan(tan));
  }

  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const fovRad = (this.camera.fov * Math.PI) / 180;
      this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    } else if ((this.camera as any).isOrthographicCamera) {
      const cam = this.camera as any;
      this.size.wHeight = cam.top - cam.bottom;
      this.size.wWidth = cam.right - cam.left;
    }
  }

  private updateRendererSize() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.postprocessingEffect?.setSize(this.size.width, this.size.height);
    let ratio = window.devicePixelRatio;
    if (this.maxPixelRatio && ratio > this.maxPixelRatio) {
      ratio = this.maxPixelRatio;
    } else if (this.minPixelRatio && ratio < this.minPixelRatio) {
      ratio = this.minPixelRatio;
    }
    this.renderer.setPixelRatio(ratio);
    this.size.pixelRatio = ratio;
  }

  get postprocessing() {
    return this.postprocessingEffect;
  }

  set postprocessing(val: any) {
    this.postprocessingEffect = val;
    this.render = val.render.bind(val);
  }

  private startLoop() {
    if (this.isAnimating) return;
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      this.timer.update();
      this.clockData.delta = this.timer.getDelta();
      this.clockData.elapsed += this.clockData.delta;
      this.onBeforeRender(this.clockData);
      this.render();
      this.onAfterRender(this.clockData);
    };
    this.isAnimating = true;
    this.timer.reset();
    animate();
  }

  private stopLoop() {
    if (this.isAnimating) {
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      this.isAnimating = false;
    }
  }

  private defaultRender() {
    this.renderer.render(this.scene, this.camera);
  }

  clear() {
    this.scene.traverse((obj: any) => {
      if (obj.isMesh && typeof obj.material === 'object' && obj.material !== null) {
        Object.keys(obj.material).forEach(key => {
          const matProp = obj.material[key];
          if (matProp !== null && typeof matProp === 'object' && typeof matProp.dispose === 'function') {
            matProp.dispose();
          }
        });
        obj.material.dispose();
        obj.geometry.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    this.removeEvents();
    this.stopLoop();
    this.timer.dispose();
    this.clear();
    this.postprocessingEffect?.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.isDisposed = true;
  }
}

interface PointerState {
  domElement: HTMLElement;
  position: Vector2Alias;
  nPosition: Vector2Alias;
  hover: boolean;
  touching: boolean;
  onEnter: (st: PointerState) => void;
  onMove: (st: PointerState) => void;
  onClick: (st: PointerState) => void;
  onLeave: (st: PointerState) => void;
  dispose?: () => void;
}

const pointerListeners = new Map<HTMLElement, PointerState>();
const sharedPointerPos = new Vector2Alias();
let isPointerGlobalRegistered = false;

function initPointerTracking(options: Partial<PointerState> & { domElement: HTMLElement }): PointerState {
  const state: PointerState = {
    position: new Vector2Alias(),
    nPosition: new Vector2Alias(),
    hover: false,
    touching: false,
    onEnter() {},
    onMove() {},
    onClick() {},
    onLeave() {},
    ...options
  };

  if (!pointerListeners.has(options.domElement)) {
    pointerListeners.set(options.domElement, state);
    if (!isPointerGlobalRegistered) {
      document.body.addEventListener('pointermove', onGlobalPointerMove);
      document.body.addEventListener('pointerleave', onGlobalPointerLeave);
      document.body.addEventListener('click', onGlobalClick);

      document.body.addEventListener('touchstart', onGlobalTouchStart, { passive: false });
      document.body.addEventListener('touchmove', onGlobalTouchMove, { passive: false });
      document.body.addEventListener('touchend', onGlobalTouchEnd, { passive: false });
      document.body.addEventListener('touchcancel', onGlobalTouchEnd, { passive: false });

      isPointerGlobalRegistered = true;
    }
  }

  state.dispose = () => {
    pointerListeners.delete(options.domElement);
    if (pointerListeners.size === 0) {
      document.body.removeEventListener('pointermove', onGlobalPointerMove);
      document.body.removeEventListener('pointerleave', onGlobalPointerLeave);
      document.body.removeEventListener('click', onGlobalClick);

      document.body.removeEventListener('touchstart', onGlobalTouchStart);
      document.body.removeEventListener('touchmove', onGlobalTouchMove);
      document.body.removeEventListener('touchend', onGlobalTouchEnd);
      document.body.removeEventListener('touchcancel', onGlobalTouchEnd);

      isPointerGlobalRegistered = false;
    }
  };

  return state;
}

function onGlobalPointerMove(e: MouseEvent) {
  sharedPointerPos.x = e.clientX;
  sharedPointerPos.y = e.clientY;
  processPointerInteractions();
}

function processPointerInteractions() {
  for (const [elem, state] of pointerListeners) {
    const rect = elem.getBoundingClientRect();
    if (isInsideRect(rect)) {
      updatePointerCoords(state, rect);
      if (!state.hover) {
        state.hover = true;
        state.onEnter(state);
      }
      state.onMove(state);
    } else if (state.hover && !state.touching) {
      state.hover = false;
      state.onLeave(state);
    }
  }
}

function onGlobalClick(e: MouseEvent) {
  sharedPointerPos.x = e.clientX;
  sharedPointerPos.y = e.clientY;
  for (const [elem, state] of pointerListeners) {
    const rect = elem.getBoundingClientRect();
    updatePointerCoords(state, rect);
    if (isInsideRect(rect)) state.onClick(state);
  }
}

function onGlobalPointerLeave() {
  for (const state of pointerListeners.values()) {
    if (state.hover) {
      state.hover = false;
      state.onLeave(state);
    }
  }
}

function onGlobalTouchStart(e: TouchEvent) {
  if (e.touches.length > 0) {
    sharedPointerPos.x = e.touches[0].clientX;
    sharedPointerPos.y = e.touches[0].clientY;

    for (const [elem, state] of pointerListeners) {
      const rect = elem.getBoundingClientRect();
      if (isInsideRect(rect)) {
        state.touching = true;
        updatePointerCoords(state, rect);
        if (!state.hover) {
          state.hover = true;
          state.onEnter(state);
        }
        state.onMove(state);
      }
    }
  }
}

function onGlobalTouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    sharedPointerPos.x = e.touches[0].clientX;
    sharedPointerPos.y = e.touches[0].clientY;

    for (const [elem, state] of pointerListeners) {
      const rect = elem.getBoundingClientRect();
      updatePointerCoords(state, rect);

      if (isInsideRect(rect)) {
        if (!state.hover) {
          state.hover = true;
          state.touching = true;
          state.onEnter(state);
        }
        state.onMove(state);
      } else if (state.hover && state.touching) {
        state.onMove(state);
      }
    }
  }
}

function onGlobalTouchEnd() {
  for (const [, state] of pointerListeners) {
    if (state.touching) {
      state.touching = false;
      if (state.hover) {
        state.hover = false;
        state.onLeave(state);
      }
    }
  }
}

function updatePointerCoords(state: PointerState, rect: DOMRect) {
  state.position.x = sharedPointerPos.x - rect.left;
  state.position.y = sharedPointerPos.y - rect.top;
  state.nPosition.x = (state.position.x / rect.width) * 2 - 1;
  state.nPosition.y = (-state.position.y / rect.height) * 2 + 1;
}

function isInsideRect(rect: DOMRect) {
  const { x, y } = sharedPointerPos;
  return x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height;
}

const { randFloat, randFloatSpread } = MathUtilsAlias;
const tmpVec0 = new Vector3Alias();
const tmpVec1 = new Vector3Alias();
const tmpVec2 = new Vector3Alias();
const tmpVec3 = new Vector3Alias();
const tmpVec4 = new Vector3Alias();
const tmpVec5 = new Vector3Alias();
const tmpVec6 = new Vector3Alias();
const tmpVec7 = new Vector3Alias();
const tmpVec8 = new Vector3Alias();
const tmpVec9 = new Vector3Alias();

class PhysicsEngine {
  config: BallpitConfig;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center = new Vector3Alias();

  constructor(config: BallpitConfig) {
    this.config = config;
    const count = config.count || 100;
    this.positionData = new Float32Array(3 * count).fill(0);
    this.velocityData = new Float32Array(3 * count).fill(0);
    this.sizeData = new Float32Array(count).fill(1);
    this.initPositions();
    this.setSizes();
  }

  private initPositions() {
    const { config, positionData } = this;
    const count = config.count || 100;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < count; i++) {
      const idx = 3 * i;
      positionData[idx] = randFloatSpread(2 * (config.maxX || 5));
      positionData[idx + 1] = randFloatSpread(2 * (config.maxY || 5));
      positionData[idx + 2] = randFloatSpread(2 * (config.maxZ || 2));
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    const count = config.count || 100;
    sizeData[0] = config.size0 || 1;
    for (let i = 1; i < count; i++) {
      sizeData[i] = randFloat(config.minSize || 0.5, config.maxSize || 1);
    }
  }

  update(clock: { delta: number }) {
    const { config, center, positionData, sizeData, velocityData } = this;
    const count = config.count || 100;
    let startIdx = 0;

    if (config.controlSphere0) {
      startIdx = 1;
      tmpVec0.fromArray(positionData, 0);
      tmpVec0.lerp(center, 0.1).toArray(positionData, 0);
      tmpVec3.set(0, 0, 0).toArray(velocityData, 0);
    }

    for (let idx = startIdx; idx < count; idx++) {
      const base = 3 * idx;
      tmpVec1.fromArray(positionData, base);
      tmpVec4.fromArray(velocityData, base);
      tmpVec4.y -= clock.delta * (config.gravity ?? 0.01) * sizeData[idx];
      tmpVec4.multiplyScalar(config.friction ?? 0.9975);
      tmpVec4.clampLength(0, config.maxVelocity ?? 0.15);
      tmpVec1.add(tmpVec4);
      tmpVec1.toArray(positionData, base);
      tmpVec4.toArray(velocityData, base);
    }

    for (let idx = startIdx; idx < count; idx++) {
      const base = 3 * idx;
      tmpVec1.fromArray(positionData, base);
      tmpVec4.fromArray(velocityData, base);
      const radius = sizeData[idx];

      for (let jdx = idx + 1; jdx < count; jdx++) {
        const otherBase = 3 * jdx;
        tmpVec2.fromArray(positionData, otherBase);
        tmpVec5.fromArray(velocityData, otherBase);
        const otherRadius = sizeData[jdx];
        tmpVec6.copy(tmpVec2).sub(tmpVec1);
        const dist = tmpVec6.length();
        const sumRadius = radius + otherRadius;

        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          tmpVec7.copy(tmpVec6).normalize().multiplyScalar(0.5 * overlap);
          tmpVec8.copy(tmpVec7).multiplyScalar(Math.max(tmpVec4.length(), 1));
          tmpVec9.copy(tmpVec7).multiplyScalar(Math.max(tmpVec5.length(), 1));
          tmpVec1.sub(tmpVec7);
          tmpVec4.sub(tmpVec8);
          tmpVec1.toArray(positionData, base);
          tmpVec4.toArray(velocityData, base);
          tmpVec2.add(tmpVec7);
          tmpVec5.add(tmpVec9);
          tmpVec2.toArray(positionData, otherBase);
          tmpVec5.toArray(velocityData, otherBase);
        }
      }

      if (config.controlSphere0) {
        tmpVec6.copy(tmpVec0).sub(tmpVec1);
        const dist = tmpVec6.length();
        const sumRadius0 = radius + sizeData[0];
        if (dist < sumRadius0) {
          const diff = sumRadius0 - dist;
          tmpVec7.copy(tmpVec6.normalize()).multiplyScalar(diff);
          tmpVec8.copy(tmpVec7).multiplyScalar(Math.max(tmpVec4.length(), 2));
          tmpVec1.sub(tmpVec7);
          tmpVec4.sub(tmpVec8);
        }
      }

      const maxX = config.maxX || 5;
      const maxY = config.maxY || 5;
      const maxZ = config.maxZ || 2;
      const bounce = config.wallBounce ?? 0.95;

      if (Math.abs(tmpVec1.x) + radius > maxX) {
        tmpVec1.x = Math.sign(tmpVec1.x) * (maxX - radius);
        tmpVec4.x = -tmpVec4.x * bounce;
      }
      if (config.gravity === 0) {
        if (Math.abs(tmpVec1.y) + radius > maxY) {
          tmpVec1.y = Math.sign(tmpVec1.y) * (maxY - radius);
          tmpVec4.y = -tmpVec4.y * bounce;
        }
      } else if (tmpVec1.y - radius < -maxY) {
        tmpVec1.y = -maxY + radius;
        tmpVec4.y = -tmpVec4.y * bounce;
      }

      const maxBoundary = Math.max(maxZ, config.maxSize || 1);
      if (Math.abs(tmpVec1.z) + radius > maxBoundary) {
        tmpVec1.z = Math.sign(tmpVec1.z) * (maxZ - radius);
        tmpVec4.z = -tmpVec4.z * bounce;
      }
      tmpVec1.toArray(positionData, base);
      tmpVec4.toArray(velocityData, base);
    }
  }
}

class PhysicalSubsurfaceMaterial extends MeshPhysicalMaterialAlias {
  uniforms = {
    thicknessDistortion: { value: 0.1 },
    thicknessAmbient: { value: 0 },
    thicknessAttenuation: { value: 0.1 },
    thicknessPower: { value: 2 },
    thicknessScale: { value: 10 }
  };
  onBeforeCompile2?: (shader: any) => void;

  constructor(params: any) {
    super(params);
    this.defines.USE_UV = '';
    this.onBeforeCompile = (shader: any) => {
      Object.assign(shader.uniforms, this.uniforms);
      shader.fragmentShader =
        `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
      `
      );

      const lightsFragBegin = ShaderChunkAlias.lights_fragment_begin.replaceAll(
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
        `
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', lightsFragBegin);
      if (this.onBeforeCompile2) this.onBeforeCompile2(shader);
    };
  }
}

const DEFAULT_CONFIG: BallpitConfig = {
  count: 100,
  colors: [0x9d4edf, 0x7b2cbf, 0x00f5d4, 0xf72585, 0x480ca8],
  ambientColor: 0xffffff,
  ambientIntensity: 1.5,
  lightIntensity: 250,
  materialParams: {
    metalness: 0.3,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  },
  minSize: 0.5,
  maxSize: 1.2,
  size0: 1,
  gravity: 0.01,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 6,
  maxY: 6,
  maxZ: 3,
  controlSphere0: false,
  followCursor: false
};

const transformObj = new Object3DAlias();

class SpheresMeshGroup extends InstancedMeshAlias {
  config: BallpitConfig;
  physics: PhysicsEngine;
  ambientLight!: AmbientLightAlias;
  light!: PointLightAlias;

  constructor(renderer: WebGLRendererAlias, customConfig: BallpitConfig = {}) {
    const config = { ...DEFAULT_CONFIG, ...customConfig };
    const roomEnv = new RoomEnvironment();
    const envMap = new PMREMGeneratorAlias(renderer, 0.04).fromScene(roomEnv).texture;
    const geom = new SphereGeometryAlias(1, 32, 32);
    const mat = new PhysicalSubsurfaceMaterial({ envMap, ...config.materialParams });
    mat.envMapRotation.x = -Math.PI / 2;

    super(geom, mat, config.count || 100);
    this.config = config;
    this.physics = new PhysicsEngine(config);
    this.initLights();
    this.setColors(config.colors || [0x9d4edf, 0x00f5d4]);
  }

  private initLights() {
    this.ambientLight = new AmbientLightAlias(this.config.ambientColor || 0xffffff, this.config.ambientIntensity || 1);
    this.add(this.ambientLight);
    this.light = new PointLightAlias(this.config.colors?.[0] || 0xffffff, this.config.lightIntensity || 200);
    this.add(this.light);
  }

  setColors(colorList: number[]) {
    if (Array.isArray(colorList) && colorList.length > 0) {
      const parsedColors = colorList.map(c => new ColorAlias(c));
      const getColorAt = (ratio: number, out = new ColorAlias()) => {
        const scaled = Math.max(0, Math.min(1, ratio)) * (parsedColors.length - 1);
        const idx = Math.floor(scaled);
        const start = parsedColors[idx];
        if (idx >= parsedColors.length - 1) return start.clone();
        const alpha = scaled - idx;
        const end = parsedColors[idx + 1];
        out.r = start.r + alpha * (end.r - start.r);
        out.g = start.g + alpha * (end.g - start.g);
        out.b = start.b + alpha * (end.b - start.b);
        return out;
      };

      const count = this.count;
      for (let idx = 0; idx < count; idx++) {
        const col = getColorAt(idx / count);
        this.setColorAt(idx, col);
        if (idx === 0) {
          this.light.color.copy(col);
        }
      }
      if (this.instanceColor) this.instanceColor.needsUpdate = true;
    }
  }

  update(clock: { delta: number }) {
    this.physics.update(clock);
    const count = this.count;
    for (let idx = 0; idx < count; idx++) {
      transformObj.position.fromArray(this.physics.positionData, 3 * idx);
      if (idx === 0 && this.config.followCursor === false) {
        transformObj.scale.setScalar(0);
      } else {
        transformObj.scale.setScalar(this.physics.sizeData[idx]);
      }
      transformObj.updateMatrix();
      this.setMatrixAt(idx, transformObj.matrix);
      if (idx === 0) this.light.position.copy(transformObj.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

export function createBallpit(canvas: HTMLCanvasElement, customConfig: BallpitConfig = {}) {
  const threeApp = new ThreeCanvas({
    canvas,
    size: 'parent',
    rendererOptions: { antialias: true, alpha: true }
  });

  let spheresGroup: SpheresMeshGroup;
  threeApp.renderer.toneMapping = ACESFilmicToneMappingAlias;
  threeApp.camera.position.set(0, 0, 20);
  threeApp.camera.lookAt(0, 0, 0);
  threeApp.cameraMaxAspect = 1.5;
  threeApp.resize();

  const initSpheres = (cfg: BallpitConfig) => {
    if (spheresGroup) {
      threeApp.clear();
      threeApp.scene.remove(spheresGroup);
    }
    spheresGroup = new SpheresMeshGroup(threeApp.renderer, cfg);
    threeApp.scene.add(spheresGroup);
  };

  initSpheres(customConfig);

  const raycaster = new RaycasterAlias();
  const plane = new PlaneAlias(new Vector3Alias(0, 0, 1), 0);
  const intersectPos = new Vector3Alias();
  let isPaused = false;

  canvas.style.touchAction = 'none';
  canvas.style.userSelect = 'none';
  (canvas.style as any).webkitUserSelect = 'none';

  const pointerTracker = initPointerTracking({
    domElement: canvas,
    onMove() {
      raycaster.setFromCamera(pointerTracker.nPosition, threeApp.camera);
      threeApp.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, intersectPos);
      spheresGroup.physics.center.copy(intersectPos);
      spheresGroup.config.controlSphere0 = true;
    },
    onLeave() {
      spheresGroup.config.controlSphere0 = false;
    }
  });

  threeApp.onBeforeRender = clock => {
    if (!isPaused) spheresGroup.update(clock);
  };

  threeApp.onAfterResize = size => {
    spheresGroup.config.maxX = size.wWidth / 2;
    spheresGroup.config.maxY = size.wHeight / 2;
  };

  return {
    three: threeApp,
    get spheres() {
      return spheresGroup;
    },
    setCount(count: number) {
      initSpheres({ ...spheresGroup.config, count });
    },
    togglePause() {
      isPaused = !isPaused;
    },
    dispose() {
      pointerTracker.dispose?.();
      threeApp.dispose();
    }
  };
}

export interface BallpitProps extends BallpitConfig {
  className?: string;
  style?: React.CSSProperties;
}

export const Ballpit: React.FC<BallpitProps> = ({ className = '', style, followCursor = false, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const instanceRef = useRef<ReturnType<typeof createBallpit> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    instanceRef.current = createBallpit(canvas, { followCursor, ...props });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', pointerEvents: 'auto', ...style }}
    />
  );
};

export default Ballpit;
