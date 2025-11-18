import { GoogleGenAI, Type } from "@google/genai";
import { Campaign, CampaignContent } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateCampaignText = async (prompt: string): Promise<CampaignContent> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate an email marketing campaign based on this prompt: "${prompt}". Provide a compelling subject line, persuasive email body copy, and a concise, descriptive prompt for an image that would visually represent this campaign.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        subject: {
                            type: Type.STRING,
                            description: "A compelling, short email subject line."
                        },
                        body: {
                            type: Type.STRING,
                            description: "The full email body copy, formatted with paragraphs. Use markdown for simple formatting like bolding or italics if needed."
                        },
                        imagePrompt: {
                            type: Type.STRING,
                            description: "A descriptive prompt for a text-to-image model to generate a relevant marketing visual."
                        }
                    },
                    required: ["subject", "body", "imagePrompt"]
                }
            }
        });
        
        const text = response.text.trim();
        return JSON.parse(text) as CampaignContent;

    } catch (error) {
        console.error("Error generating campaign text:", error);
        throw new Error("Failed to generate campaign text from Gemini.");
    }
};

const generateCampaignImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                aspectRatio: "16:9",
                outputMimeType: 'image/jpeg',
            }
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating campaign image:", error);
        throw new Error("Failed to generate campaign image from Imagen.");
    }
};

export const generateCampaign = async (prompt: string): Promise<Campaign> => {
    const campaignContent = await generateCampaignText(prompt);
    const imageUrl = await generateCampaignImage(campaignContent.imagePrompt);

    return {
        subject: campaignContent.subject,
        body: campaignContent.body,
        imageUrl: imageUrl,
    };
};
