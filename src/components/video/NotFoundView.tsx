
import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import Button from '@/components/common/Button';

const NotFoundView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <Info size={48} className="text-muted-foreground mb-4" />
      <h1 className="text-2xl font-bold mb-2">Video Not Found</h1>
      <p className="text-muted-foreground mb-6">The video you're looking for doesn't exist or has been removed.</p>
      <Link to="/">
        <Button variant="default">Return to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundView;
