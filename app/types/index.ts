export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  status: 'pending' | 'passed' | 'failed';
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  testCases: TestCase[];
  defaultCode: string;
}