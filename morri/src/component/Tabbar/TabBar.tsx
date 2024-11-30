import React, { useState } from 'react';
import './TabBar.css'; 

interface TabBarProps {
  tabs: string[];
  onTabChange?: (tab: string) => void;
  defaultTab?: string;
  styleType?: 'default' | 'custom'; 
}

const TabBar: React.FC<TabBarProps> = ({ 
  tabs, 
  onTabChange, 
  defaultTab = tabs[0], 
  styleType = 'default' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className={`tab-bar-container ${styleType === 'default' ? 'default-style' : 'custom-style'}`}>
      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`tab-item ${styleType === 'default' ? 'default-style' : 'custom-style'} ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;