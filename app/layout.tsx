export const metadata = { title: 'CoachFocus', description: 'Role-based daily planner' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#f7f7f7' }}>
        {children}
      </body>
    </html>
  );
}
