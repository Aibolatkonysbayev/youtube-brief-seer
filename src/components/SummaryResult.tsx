
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummaryResultProps {
  isLoading: boolean;
  summary?: string;
  insights?: string[];
}

const SummaryResult: React.FC<SummaryResultProps> = ({
  isLoading,
  summary,
  insights
}) => {
  if (isLoading) {
    return (
      <Card className="bg-white/90 border-brand-200">
        <CardHeader>
          <CardTitle className="text-brand-800">Generating Summary...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-brand-100 rounded animate-pulse-slow"></div>
            <div className="h-4 bg-brand-100 rounded animate-pulse-slow"></div>
            <div className="h-4 bg-brand-100 rounded w-2/3 animate-pulse-slow"></div>
          </div>
          <div className="mt-6">
            <h4 className="font-medium text-brand-800 mb-2">Key Insights</h4>
            <ul className="space-y-2">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-start">
                  <div className="h-4 w-4 mt-1 mr-2 bg-brand-200 rounded animate-pulse-slow"></div>
                  <div className="flex-1 h-4 bg-brand-100 rounded animate-pulse-slow"></div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!summary && !insights?.length) {
    return null;
  }

  return (
    <Card className="bg-white/90 border-brand-200">
      <CardHeader>
        <CardTitle className="text-brand-800">Video Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {summary && <p className="text-gray-700 mb-6 leading-relaxed">{summary}</p>}
        
        {insights && insights.length > 0 && (
          <div>
            <h4 className="font-medium text-brand-800 mb-2">Key Insights</h4>
            <ul className="space-y-2">
              {insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-brand-600 font-medium mr-2">•</span>
                  <span className="text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryResult;
