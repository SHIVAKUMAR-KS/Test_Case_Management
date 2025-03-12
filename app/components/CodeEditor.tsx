'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Problem, TestCase } from '../types';
import { runTestCases } from '../utils/evaluator';
import { Play, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CodeEditorProps {
  problem: Problem;
}

export default function CodeEditor({ problem }: CodeEditorProps) {
  const [code, setCode] = useState(problem.defaultCode);
  const [testCases, setTestCases] = useState<TestCase[]>(problem.testCases);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = async () => {
    try {
      setIsRunning(true);
      const results = await runTestCases(
        code,
        testCases.map(({ input, expectedOutput }) => ({ input, expectedOutput }))
      );

      setTestCases((prev) =>
        prev.map((testCase, index) => ({
          ...testCase,
          status: results[index],
        }))
      );

      const passedCount = results.filter((r) => r === 'passed').length;
      toast.success(`Test execution completed: ${passedCount}/${results.length} tests passed`);
    } catch (error) {
      toast.error('Failed to run tests: ' + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const addTestCase = () => {
    setTestCases((prev) => [
      ...prev,
      {
        id: `tc-${Date.now()}`,
        input: '',
        expectedOutput: '',
        status: 'pending',
      },
    ]);
  };

  const removeTestCase = (id: string) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  const updateTestCase = (id: string, field: 'input' | 'expectedOutput', value: string) => {
    setTestCases((prev) =>
      prev.map((tc) =>
        tc.id === id
          ? {
              ...tc,
              [field]: value,
              status: 'pending',
            }
          : tc
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{problem.title}</h2>
          <div className="prose dark:prose-invert">
            <p>{problem.description}</p>
          </div>
        </div>
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Test Cases</h3>
            <Button onClick={addTestCase} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Test Cases
            </Button>
          </div>
          <div className="space-y-4">
            {testCases.map((testCase) => (
              <div key={testCase.id} className="space-y-2 bg-muted/30 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Input"
                      value={testCase.input}
                      onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                      className="w-full p-2 text-sm bg-background border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Expected Output"
                      value={testCase.expectedOutput}
                      onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                      className="w-full p-2 text-sm bg-background border rounded"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <div
                      className={`w-24 text-center p-1 text-sm font-medium rounded ${
                        testCase.status === 'passed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : testCase.status === 'failed'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {testCase.status}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeTestCase(testCase.id)}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="h-[600px] relative">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
        <Button
          className="absolute bottom-4 right-4"
          onClick={handleRunTests}
          disabled={isRunning}
        >
          <Play className="w-4 h-4 mr-2" />
          {isRunning ? 'Running...' : 'Run Tests'}
        </Button>
      </div>
    </div>
  );
}