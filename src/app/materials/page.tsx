import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from '@/components/Layout';

function StudyMaterialsPage() {
  return (
    <Layout>
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Study Materials</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Access and organize your study materials, notes, and resources here.</p>
          <p>Use the AI Tutor to find additional learning resources or get explanations on complex topics.</p>
        </CardContent>
      </Card>
    </div>
    </Layout>
  );
}

export default StudyMaterialsPage;