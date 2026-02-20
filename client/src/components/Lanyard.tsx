import { LanyardScene } from "./LanyardScene";

type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
};

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
}: LanyardProps) {
  return <LanyardScene position={position} gravity={gravity} />;
}
