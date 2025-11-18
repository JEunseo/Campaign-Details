import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import CampaignDisplay from './components/CampaignDisplay';
import { Campaign } from './types';
import { generateCampaign } from './services/geminiService';

const App: React.FC = () => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCampaign = useCallback(async (prompt: string) => {
    if (!prompt) {
      setError('Please enter a prompt for your campaign.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCampaign(null);

    try {
      const newCampaign = await generateCampaign(prompt);
      setCampaign(newCampaign);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? `Failed to generate campaign: ${err.message}`
          : 'An unknown error occurred.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">
                Campaign Details
              </h2>
              <p className="text-slate-400 mb-6">
                Describe your product, offer, and target audience. The more detail you provide, the better the result.
              </p>
              <PromptInput
                onGenerate={handleGenerateCampaign}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <CampaignDisplay
              campaign={campaign}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
