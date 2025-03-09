import CodeEditor from './components/CodeEditor';

const sampleProblem = {
  id: '1',
  title: 'Sum Two Numbers',
  description: 'Write a function that takes two numbers as input and returns their sum.',
  defaultCode: `function solution(input) {
  // input will be a string like "1,2"
  const [a, b] = input.split(',').map(Number);
  return a + b;
}`,
  testCases: [
    {
      id: 'tc1',
      input: '1,2',
      expectedOutput: '3',
      status: 'pending',
    },
    {
      id: 'tc2',
      input: '0,0',
      expectedOutput: '0',
      status: 'pending',
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Code Editor</h1>
        <CodeEditor problem={sampleProblem} />
      </div>
    </main>
  );
}