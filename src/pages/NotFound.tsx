
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="relative flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <span className="text-6xl font-bold">4</span>
            <span className="text-6xl font-bold text-primary">0</span>
            <span className="text-6xl font-bold">4</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted.
        </p>
        
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
          <ArrowLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
