import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

// @ts-expect-error — meshline extend
extend({ MeshLineGeometry, MeshLineMaterial });

function Lanyard() {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.2, 0]]);

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (band.current?.geometry && j1.current && j2.current && j3.current && fixed.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
    }
    if (card.current && !dragged) {
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      <RigidBody ref={fixed} type="fixed" />
      <RigidBody position={[0.5, 0, 0]} ref={j1}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1, 0, 0]} ref={j2}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1.5, 0, 0]} ref={j3}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#1a1a1a"
          resolution={[width, height]}
          lineWidth={0.8}
        />
      </mesh>
      <RigidBody
        ref={card}
        type={dragged ? "kinematicPosition" : "dynamic"}
        position={[1.5, -1.5, 0]}
      >
        <mesh
          onPointerUp={() => setDragged(false)}
          onPointerDown={(e) => {
            const offset = new THREE.Vector3()
              .copy(e.point)
              .sub(vec.copy(card.current.translation()));
            setDragged(offset);
          }}
        >
          <planeGeometry args={[1.6, 2.25]} />
          <meshBasicMaterial color="#faf8f5" side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>
    </>
  );
}

export function LanyardScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--background)]">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]" />
        }
      >
        <Canvas
          camera={{ position: [0, 0, 12], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Physics gravity={[0, -9.81, 0]}>
            <Lanyard />
          </Physics>
        </Canvas>
      </Suspense>
    </div>
  );
}
