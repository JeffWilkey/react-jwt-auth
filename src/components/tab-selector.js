import React from 'react';
import '../assets/stylesheets/tab-selector.css';
export default function TabSelector(props) {
  const renderTabs = props.tabs.map((tab) => (
    <a
      key={tab.value}
      onClick={() => props.handleSelect(tab.value)}
      className={tab.value === props.selectedTab ? 'tab selected' : 'tab'}
    >
      {tab.label}
    </a>
  ))
  return (
    <div className="tab-selector">
      {renderTabs}
    </div>
  )
}
