import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from '../../components/Layout';

function ExamsPage() {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">Upcoming Exams</h1>
        <Card>
          <CardHeader>
            <CardTitle>Exam Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your upcoming exams and preparation status will be displayed here.</p>
            <p>Use the AI Tutor to get exam-specific study materials and practice questions.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default ExamsPage;