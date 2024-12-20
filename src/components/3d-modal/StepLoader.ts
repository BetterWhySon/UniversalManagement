import occtimportjs from 'occt-import-js';
import * as THREE from 'three';

// const wasmBlob = dataURItoBlob(occtimportWasm);
// const wasmUrl = URL.createObjectURL(wasmBlob);
const wasmUrl = 'https://cdn.jsdelivr.net/npm/occt-import-js@0.0.12/dist/occt-import-js.wasm';

export async function LoadStep(fileUrl: string) {
  const targetObject = new THREE.Object3D();

  // init occt-import-js
  const occt = await occtimportjs({
    locateFile: () => {
      return wasmUrl;
    },
  });

  // // download a step file
  // let response = await fetch(fileUrl);
  // let buffer = await response.arrayBuffer();

  // // read the imported step file
  // let fileBuffer = new Uint8Array(buffer);
  // let result = occt.ReadStepFile(fileBuffer);

  // // process the geometries of the result
  // for (let resultMesh of result.meshes) {
  //   let geometry = new THREE.BufferGeometry();

  //   geometry.setAttribute('position', new THREE.Float32BufferAttribute(resultMesh.attributes.position.array, 3));
  //   if (resultMesh.attributes.normal) {
  //     geometry.setAttribute('normal', new THREE.Float32BufferAttribute(resultMesh.attributes.normal.array, 3));
  //   }
  //   const index = Uint16Array.from(resultMesh.index.array);
  //   geometry.setIndex(new THREE.BufferAttribute(index, 1));

  //   let material = null;
  //   if (resultMesh.color) {
  //     const color = new THREE.Color(resultMesh.color[0], resultMesh.color[1], resultMesh.color[2]);
  //     material = new THREE.MeshPhongMaterial({ color: color });
  //   } else {
  //     material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
  //   }

  //   const mesh = new THREE.Mesh(geometry, material);
  //   targetObject.add(mesh);
  // }
  // return targetObject;
}

function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString });
  return blob;
}
