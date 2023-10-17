import React from 'react';

interface LayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ header, content, footer }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header>{header}</header>
      <main style={{ flex: 1 }}>{content}</main>
      <footer>{footer}</footer>
    </div>
  );
};

export default Layout;
