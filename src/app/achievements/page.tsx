import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from '@/components/Layout';

function AchievementsPage() {
  return (
    <Layout>
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Your Achievements</h1>
      <Card>
        <CardHeader>
          <CardTitle>Learning Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your academic achievements and learning milestones will be showcased here.</p>
          <p>Ask the AI Tutor about strategies to reach your next learning goals!</p>
        </CardContent>
      </Card>
    </div>
  </Layout>
  );
}

export default AchievementsPage;