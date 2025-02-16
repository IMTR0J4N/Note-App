'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

// @ts-ignore
import { AnimatedTabsProps, FadeInDivProps, Tab } from '@types/AnimatedTab';

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: AnimatedTabsProps) => {
  // On stocke l'indice de l'onglet actif pour toujours utiliser propTabs à jour
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  // On crée une version ordonnée des onglets avec l'onglet actif en première position,
  // pour l'animation du contenu.
  const orderedTabs = [
    propTabs[activeIndex],
    ...propTabs.slice(0, activeIndex),
    ...propTabs.slice(activeIndex + 1),
  ];

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <FadeInDiv
        tabs={orderedTabs}
        active={propTabs[activeIndex]}
        key={propTabs[activeIndex].value}
        hovering={hovering}
        className={`mt-20 ${contentClassName ?? ''}`}
      />
      <div
        className={`flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full ${containerClassName}`}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => handleTabClick(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={`relative px-4 py-2 rounded-full ${tabClassName}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {activeIndex === idx && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={`absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ${activeTabClassName}`}
              />
            )}
            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  hovering,
}: FadeInDivProps) => {
  const isActive = (tab: Tab) => tab.value === active.value;
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => {
        // Permet de supporter des contenus dynamiques :
        // s'il s'agit d'une fonction, on l'appelle pour obtenir le contenu actuel.
        const content =
          typeof tab.content === 'function' ? tab.content() : tab.content;

        return (
          <motion.div
            key={tab.value}
            layoutId={tab.value}
            style={{
              scale: 1 - idx * 0.1,
              top: hovering ? idx * -50 : 0,
              zIndex: -idx,
              opacity: idx < 3 ? 1 - idx * 0.1 : 0,
            }}
            animate={{
              y: isActive(tab) ? [0, 40, 0] : 0,
            }}
            className={`w-full h-full absolute top-0 left-0 ${className}`}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
};
