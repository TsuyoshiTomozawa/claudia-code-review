import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SlackPostList } from '@/components/slack/SlackPostList';
import { TaskList } from '@/components/tasks/TaskList';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { ReviewDashboard } from '@/components/review/ReviewDashboard';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  const handleTestConnection = async () => {
    try {
      await invoke('test_slack_connection');
      toast({
        title: 'Success',
        description: 'Slack connection is working!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Connection failed: ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CR</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Claudia Code Review
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestConnection}
              >
                Test Connection
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">📊 Dashboard</TabsTrigger>
            <TabsTrigger value="slack">💬 Slack Posts</TabsTrigger>
            <TabsTrigger value="tasks">📋 Tasks</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <ReviewDashboard />
            </TabsContent>

            <TabsContent value="slack" className="space-y-6">
              <SlackPostList />
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <TaskList />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <SettingsPanel />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <Toaster />
    </div>
  );
}

export default App;
