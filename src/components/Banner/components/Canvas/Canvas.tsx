import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Swatches } from '../Swatches/Swatches';
import { Data } from '../../../../interfaces/Data';

type CanvasProps = {
  activeData: Data;
  swatchData: Data[];
  handleSwatchClick: (item: Data) => void;
};
export class Canvas extends React.Component<CanvasProps, CanvasState> {
  private readonly containerRef: React.RefObject<HTMLDivElement>;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls | null = null;
  private model: THREE.Group | null = null;
  private mousePosition: THREE.Vector2;
  private mouseDirection: THREE.Vector3;

  constructor(props: CanvasProps) {
    super(props);
    this.containerRef = React.createRef();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer();
    this.mousePosition = new THREE.Vector2();
    this.mouseDirection = new THREE.Vector3();
  }

  componentDidMount() {
    const container = this.containerRef.current;
    if (container) {
      this.initThree(container);
      this.loadModel();
      this.addEventListeners();
      this.animate();
    }
  }

  private initThree(container: HTMLDivElement) {
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    this.camera.position.set(0, 0, 5);
    this.scene.add(this.camera);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.update();
  }

  private loadModel() {
    const loader = new GLTFLoader();
    loader.load(
      '/public/assets/model/electric_guitar_stratocaster_red/scene.gltf',
      (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
      },
    );
  }

  private addEventListeners() {
    document.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.handleWindowResize);
  }

  private handleWindowResize = () => {
    const container = this.containerRef.current;
    if (container) {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    }
  };

  private onMouseMove = (event: MouseEvent) => {
    const container = this.containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      this.mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mousePosition.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.mouseDirection
        .set(this.mousePosition.x, this.mousePosition.y, -1)
        .unproject(this.camera)
        .sub(this.camera.position)
        .normalize();

      if (this.model) {
        this.model.lookAt(this.mouseDirection);
      }
    }
  };

  private animate() {
    const animate = () => {
      requestAnimationFrame(animate);
      if (this.controls) this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  render() {
    const { activeData, swatchData, handleSwatchClick } = this.props;

    return (
      <div
        ref={this.containerRef}
        className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full"
      >
        <Swatches
          activeData={activeData}
          swatchData={swatchData}
          handleSwatchClick={handleSwatchClick}
        />
      </div>
    );
  }
}
