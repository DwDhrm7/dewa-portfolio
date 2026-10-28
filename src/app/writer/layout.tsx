export default function WriterLayout({ children }: { children: React.ReactNode }) {
  // overflow-x-clip (not hidden) so tilted sheets never cause sideways scroll and sticky still works.
  return <div className="writer-realm min-h-screen overflow-x-clip bg-paper text-ink">{children}</div>;
}
