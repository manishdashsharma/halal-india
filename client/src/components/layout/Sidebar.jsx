import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeSidebarItemState, isMobileMenuOpenState } from '../../state/atom';

const AnimatedLink = motion(Link);

const Sidebar = ({ menuItems, basePath }) => {
  // Get the current active item from Recoil
  const activeItem = useRecoilValue(activeSidebarItemState);
  // Get the setter for the active item
  const setActiveItem = useSetRecoilState(activeSidebarItemState);
  // Get the mobile menu state
  const isMobileMenuOpen = useRecoilValue(isMobileMenuOpenState);

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <div
      className={`fixed z-49 left-0 top-0 h-screen w-[250px] bg-white border-r border-gray-200 pt-20 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : 'max-lg:translate-x-[-100%]'
      }`}
    >
      <div className="flex flex-col p-4 text-neutral4">
        {menuItems.map((item, index) => (
          <AnimatedLink
            whileTap={{ scale: 0.95 }}
            key={index}
            to={`${basePath}${item.path}`}
            onClick={() => handleItemClick(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-md mb-1 ${
              activeItem === item.path || window.location.pathname.includes(item.path)
                ? 'bg-custom-primary text-white'
                : 'hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </AnimatedLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 