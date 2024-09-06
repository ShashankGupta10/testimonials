"use client";

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button'; // Import shadcn button
import { VariantProps } from "class-variance-authority"; // Helps with types for variants

interface LinkButtonProps {
  href: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'none';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xl';
  children: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, variant = 'default', size = 'default', children, className = '' }) => {
  return (
    <Link href={href} passHref>
      <Button variant={variant} size={size} className={className}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
