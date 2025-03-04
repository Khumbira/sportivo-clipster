
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { StatData } from '@/types';
import { cn } from '@/lib/utils';

interface StatCardProps {
  stat: StatData;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ stat, className }) => {
  const { label, value, change, icon } = stat;
  
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  return (
    <div className={cn(
      "glass-panel p-6 hover-card-effect",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "flex items-center text-xs font-medium",
                isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-muted-foreground"
              )}>
                {isPositive ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : isNegative ? (
                  <ArrowDown className="mr-1 h-3 w-3" />
                ) : null}
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
