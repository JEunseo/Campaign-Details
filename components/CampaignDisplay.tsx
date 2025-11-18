import React from 'react';
import { Campaign } from '../types';
import Spinner from './Spinner';

interface CampaignDisplayProps {
  campaign: Campaign | null;
  isLoading: boolean;
  error: string | null;
}

const CampaignDisplay: React.FC<CampaignDisplayProps> = ({ campaign, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700 p-8 text-center">
        <Spinner />
        <p className="mt-4 text-slate-400">Generating your campaign... this may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] bg-red-900/20 border-2 border-dashed border-red-500/50 rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-red-300">An Error Occurred</h3>
        <p className="mt-2 text-red-400">{error}</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700 p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-slate-300">Your Generated Campaign</h3>
        <p className="mt-2 text-slate-400">The generated subject, email body, and visual will appear here once you provide a prompt.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={campaign.imageUrl}
          alt="Campaign Visual"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 md:p-8">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Subject</h3>
        <p className="mt-1 text-2xl font-bold text-slate-100">{campaign.subject}</p>
        
        <hr className="my-6 border-slate-700" />
        
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Body</h3>
        <div 
          className="mt-2 prose prose-invert prose-p:text-slate-300 prose-strong:text-slate-100 max-w-none whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: campaign.body.replace(/\n/g, '<br />') }} 
        />
      </div>
    </div>
  );
};

export default CampaignDisplay;
