// Source : https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/

// parameters to ensure the model is georeferenced correctly on the map
let modelOrigin = [16.47, -22.79];
let modelAltitude = 1000;
let modelRotate = [Math.PI / 2, 0, 0];

let modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
);

// transformation parameters to position, rotate and scale the 3D model onto the map
let modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since the 3D model is in real world meters, a scale transform needs to be
    * applied since the CustomLayerInterface expects units in MercatorCoordinates.
    */
    scale: 0.0000008
};

const THREE = window.THREE;

// configuration of the custom layer for a 3D model per the CustomLayerInterface
const customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // create two three.js lights to illuminate the model
        const directionalLight = new THREE.DirectionalLight(0xe9f1f5);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xe9f1f5);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        const light = new THREE.AmbientLight(0xe9f1f5); // soft white light
        this.scene.add(light);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        const loader = new THREE.GLTFLoader();
        loader.load(
            '3d/toyota.gltf',
            (gltf) => {
                this.scene.add(gltf.scene);
            }
        );
        this.map = map;

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });

        this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
            .makeTranslation(
                modelTransform.translateX,
                modelTransform.translateY,
                modelTransform.translateZ
            )
            .scale(
                new THREE.Vector3(
                    modelTransform.scale,
                    -modelTransform.scale,
                    modelTransform.scale
                )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
};

// Move the car
function moveCar(lngLat) {

    // Get altitude
    let elevation = Math.floor(map.queryTerrainElevation(lngLat, { exaggerated: true }));

    modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        lngLat,
        elevation
    );
    
    // transformation parameters to position, rotate and scale the 3D model onto the map
    modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since the 3D model is in real world meters, a scale transform needs to be
        * applied since the CustomLayerInterface expects units in MercatorCoordinates.
        */
        scale: 0.0000001
    };
    
};