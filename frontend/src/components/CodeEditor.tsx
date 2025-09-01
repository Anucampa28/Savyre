import React, { useState, useEffect } from 'react';
import { PlayIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';

interface CodeEditorProps {
  language: string;
  initialCode?: string;
  onCodeChange: (code: string) => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  initialCode = '',
  onCodeChange,
  readOnly = false,
  theme = 'light'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    onCodeChange(code);
  }, [code, onCodeChange]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const runCode = async () => {
    setIsRunning(true);
    try {
      // Simulate code execution - in real implementation, this would send to backend
      setOutput('Code executed successfully!\nOutput will be displayed here...');
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const getLanguageConfig = (lang: string) => {
    const configs: { [key: string]: { name: string; extension: string; syntax: string } } = {
      'Python': { name: 'Python', extension: '.py', syntax: 'python' },
      'JavaScript': { name: 'JavaScript', extension: '.js', syntax: 'javascript' },
      'Java': { name: 'Java', extension: '.java', syntax: 'java' },
      'C++': { name: 'C++', extension: '.cpp', syntax: 'cpp' },
      'C#': { name: 'C#', extension: '.cs', syntax: 'csharp' },
      'Go': { name: 'Go', extension: '.go', syntax: 'go' },
      'Rust': { name: 'Rust', extension: '.rs', syntax: 'rust' },
      'PHP': { name: 'PHP', extension: '.php', syntax: 'php' },
      'Ruby': { name: 'Ruby', extension: '.rb', syntax: 'ruby' },
      'Swift': { name: 'Swift', extension: '.swift', syntax: 'swift' },
      'Kotlin': { name: 'Kotlin', extension: '.kt', syntax: 'kotlin' },
      'Scala': { name: 'Scala', extension: '.scala', syntax: 'scala' },
      'SQL': { name: 'SQL', extension: '.sql', syntax: 'sql' },
      'HTML/CSS': { name: 'HTML/CSS', extension: '.html', syntax: 'html' }
    };
    return configs[lang] || { name: lang, extension: '.txt', syntax: 'text' };
  };

  const langConfig = getLanguageConfig(language);

  return (
    <div className={`rounded-lg border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}>
      {/* Editor Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            theme === 'dark' ? 'bg-red-500' : 'bg-red-400'
          }`}></div>
          <div className={`w-3 h-3 rounded-full ${
            theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400'
          }`}></div>
          <div className={`w-3 h-3 rounded-full ${
            theme === 'dark' ? 'bg-green-500' : 'bg-green-400'
          }`}></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {langConfig.name}
          </span>
          <span className={`text-xs px-2 py-1 rounded ${
            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
          }`}>
            {langConfig.extension}
          </span>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={handleCodeChange}
          readOnly={readOnly}
          className={`w-full h-64 p-4 font-mono text-sm resize-none focus:outline-none ${
            theme === 'dark' 
              ? 'bg-gray-900 text-gray-100 placeholder-gray-500' 
              : 'bg-white text-gray-900 placeholder-gray-400'
          }`}
          placeholder={`// Write your ${langConfig.name} code here...\n\n// Example:\n${getExampleCode(language)}`}
          style={{ lineHeight: '1.5' }}
        />
        
        {/* Line Numbers */}
        <div className={`absolute left-0 top-0 w-12 h-full p-4 font-mono text-xs text-right select-none ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {code.split('\n').map((_, index) => (
            <div key={index} className="leading-6">{index + 1}</div>
          ))}
        </div>
      </div>

      {/* Editor Footer */}
      <div className={`flex items-center justify-between px-4 py-2 border-t ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
      }`}>
        <div className="flex items-center space-x-2">
          <button
            onClick={runCode}
            disabled={isRunning || readOnly}
            className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
              isRunning || readOnly
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <PlayIcon className="h-4 w-4" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
          
          <button
            onClick={copyCode}
            className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
            <span>Copy</span>
          </button>
        </div>

        <div className={`text-xs ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {code.split('\n').length} lines
        </div>
      </div>

      {/* Output Panel */}
      {output && (
        <div className={`border-t ${
          theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'
        }`}>
          <div className={`px-4 py-2 border-b ${
            theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-100'
          }`}>
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Output
            </span>
          </div>
          <div className={`p-4 font-mono text-sm ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

const getExampleCode = (language: string): string => {
  const examples: { [key: string]: string } = {
    'Python': 'def hello_world():\n    print("Hello, World!")\n\nhello_world()',
    'JavaScript': 'function helloWorld() {\n    console.log("Hello, World!");\n}\n\nhelloWorld();',
    'Java': 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    'C++': '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
    'C#': 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
    'Go': 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    'Rust': 'fn main() {\n    println!("Hello, World!");\n}',
    'PHP': '<?php\necho "Hello, World!";\n?>',
    'Ruby': 'def hello_world\n    puts "Hello, World!"\nend\n\nhello_world',
    'Swift': 'print("Hello, World!")',
    'Kotlin': 'fun main() {\n    println("Hello, World!")\n}',
    'Scala': 'object HelloWorld {\n    def main(args: Array[String]): Unit = {\n        println("Hello, World!")\n    }\n}',
    'SQL': 'SELECT "Hello, World!" AS message;',
    'HTML/CSS': '<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>'
  };
  
  return examples[language] || '// Write your code here...';
};

export default CodeEditor;
