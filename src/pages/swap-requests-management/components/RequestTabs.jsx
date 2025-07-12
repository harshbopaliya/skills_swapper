import React from 'react';
import Button from '../../../components/ui/Button';

const RequestTabs = ({ activeTab, onTabChange, receivedCount, sentCount }) => {
  const tabs = [
    {
      id: 'received',
      label: 'Received',
      count: receivedCount,
      description: 'Requests from others'
    },
    {
      id: 'sent',
      label: 'Sent',
      count: sentCount,
      description: 'Your sent requests'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-1 mb-6">
      <div className="grid grid-cols-2 gap-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => onTabChange(tab.id)}
            className={`relative h-auto p-4 flex flex-col items-center justify-center transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-primary-foreground text-primary' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {tab.count}
                </span>
              )}
            </div>
            <span className={`text-xs ${
              activeTab === tab.id 
                ? 'text-primary-foreground/80' 
                : 'text-muted-foreground'
            }`}>
              {tab.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RequestTabs;