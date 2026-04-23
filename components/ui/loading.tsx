import React from 'react';
import { Loader2 } from 'lucide-react'; // Using Lucide for the spinner icon

interface LoadingProps {
  message?: string;
  subtext?: string;
}

const Loading = ({ 
  message = "Synthesizing Your Book", 
  subtext = "Please wait while we process your PDF and prepare your interactive literary experience." 
}: LoadingProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-2xl">
        {/* Animated Spinner */}
        <div className="mb-6 flex justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-amber-900" strokeWidth={1.5} />
        </div>

        {/* Primary Heading */}
        <h2 className="mb-3 text-xl font-bold tracking-tight text-gray-900">
          {message}
        </h2>

        {/* Descriptive Subtext */}
        <p className="text-[13px] leading-relaxed text-gray-500">
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default Loading;
