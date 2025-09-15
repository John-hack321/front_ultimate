import { ReactNode } from 'react';

export default function ChessAbilitiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
