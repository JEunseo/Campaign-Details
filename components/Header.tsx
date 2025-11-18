import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 2v20" />
                <path d="M12 12a4.17 4.17 0 0 1-4-4h8a4.17 4.17 0 0 1-4 4z"/>
             </svg>
            <h1 className="text-xl font-bold text-slate-100">
              AI Email Campaign Generator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
