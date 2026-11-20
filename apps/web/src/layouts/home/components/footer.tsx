export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Atlas
      </div>
    </footer>
  );
}
