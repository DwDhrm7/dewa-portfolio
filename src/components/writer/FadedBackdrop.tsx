/** A photo washed almost entirely into the paper, so it reads as a faint memory of a room. */
export default function FadedBackdrop({ src, position = "center" }: { src: string; position?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover opacity-[0.12] grayscale"
        style={{ backgroundImage: `url(${src})`, backgroundPosition: position }}
      />
    </div>
  );
}
