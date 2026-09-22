import './globals.css';

export const metadata = {
  title: 'UniEvent',
  description: 'Plataforma universitaria de cursos y eventos académicos.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
