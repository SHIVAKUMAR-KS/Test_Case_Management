export const evaluateCode = async (code: string, input: string): Promise<string> => {
  try {
    // Extract the actual function body from the code
    const functionBody = code.replace(/^function\s+solution\s*\([^)]*\)\s*{/, '')
                            .replace(/}$/, '')
                            .trim();
    
    // Create a safe evaluation environment with the extracted function body
    const fn = new Function('input', `
      "use strict";
      ${functionBody}
      return solution(input);
    `);
    
    const result = fn(input);
    return String(result);
  } catch (error) {
    console.error('Evaluation error:', error);
    return `Error: ${(error as Error).message}`;
  }
};

export const runTestCases = async (
  code: string,
  testCases: { input: string; expectedOutput: string }[]
): Promise<('passed' | 'failed')[]> => {
  const results = await Promise.all(
    testCases.map(async (testCase) => {
      try {
        const output = await evaluateCode(code, testCase.input);
        return output.trim() === testCase.expectedOutput.trim() ? 'passed' : 'failed';
      } catch (error) {
        console.error('Test case error:', error);
        return 'failed';
      }
    })
  );
  return results;
};