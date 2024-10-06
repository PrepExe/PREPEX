import React from 'react';
import Layout from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RoadmapPage() {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">Your Learning Roadmap</h1>
        <Card>
          <CardHeader>
            <CardTitle>Personalized Study Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your personalized roadmap will be generated here based on your goals and progress.</p>
            <p>Use the AI Tutor to get detailed recommendations and create a custom study plan.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default RoadmapPage;