export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-8">
      <p className="text-center text-lg font-bold text-navy">{title}</p>
      <p className="mt-1 text-center text-[13px] text-text-muted">
        Coming soon
      </p>
    </main>
  )
}
