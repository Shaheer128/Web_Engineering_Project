// components/Layout.tsx
import { ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="drag-container">
      {children}
    </div>
  );
};