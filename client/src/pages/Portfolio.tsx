import Lanyard from "@/components/Lanyard";

export default function Portfolio() {
  return (
    <div className="relative h-[calc(100vh-4rem)] sm:h-[calc(100vh-4.5rem)] overflow-hidden">
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </div>
  );
}
