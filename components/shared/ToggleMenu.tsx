'use client';
// this component is like a custom select/options component
// i made it because the html option elements are hard to customize
// it also has other usecases, like a dropdown, ...

import { useState, useRef, useEffect, ReactNode } from 'react';

interface ChildrenProps {
  close: () => void;
}

interface ToggleMenuProps {
  children: (props: ChildrenProps) => ReactNode;
  toggleButton: (toggleOpen: () => void) => ReactNode;
}

const ToggleMenu: React.FC<ToggleMenuProps> = ({ children, toggleButton }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // close the menu when clicked outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {toggleButton(toggleOpen)}
      {isOpen && <div>{children({ close: toggleOpen })}</div>}
    </div>
  );
};

export default ToggleMenu;
