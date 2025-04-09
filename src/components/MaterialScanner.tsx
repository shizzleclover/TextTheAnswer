
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScanLine, Loader2, FileText } from 'lucide-react';
import GameCard from './GameCard';

interface MaterialScannerProps {
  onScanComplete?: (questions: Array<{
    question: string;
    correctAnswer: string;
    explanation?: string;
  }>) => void;
}

const MaterialScanner = ({ onScanComplete }: MaterialScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [studyMaterial, setStudyMaterial] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleScan = () => {
    if (!studyMaterial && !file) return;
    
    setIsScanning(true);
    
    // Mock generating questions from study material
    setTimeout(() => {
      const mockQuestions = [
        {
          question: "What is the capital of France?",
          correctAnswer: "Paris",
          explanation: "Paris is the capital and most populous city of France."
        },
        {
          question: "Who wrote 'Pride and Prejudice'?",
          correctAnswer: "Jane Austen",
          explanation: "Jane Austen published the novel anonymously in 1813."
        },
        {
          question: "What is the chemical symbol for gold?",
          correctAnswer: "Au",
          explanation: "The symbol comes from the Latin word for gold, 'aurum'."
        }
      ];
      
      if (onScanComplete) {
        onScanComplete(mockQuestions);
      }
      
      setIsScanning(false);
      setStudyMaterial('');
      setFile(null);
    }, 2000);
  };
  
  return (
    <GameCard
      title="Scan Study Materials"
      icon={<ScanLine className="h-5 w-5 text-blue-500" />}
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Upload your notes or paste text to automatically generate quiz questions based on your study materials.
        </p>
        
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors"
        >
          {file ? (
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="font-medium">{file.name}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setFile(null)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <>
              <ScanLine className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="font-medium">Drop files here or click to upload</p>
              <p className="text-sm text-gray-500 mt-1">PDF, DOCX, TXT files accepted</p>
              <Input 
                type="file" 
                className="hidden" 
                id="file-upload" 
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
              />
              <Button 
                variant="outline" 
                className="mt-3"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Select File
              </Button>
            </>
          )}
        </div>
        
        <div className="text-center text-gray-500">- OR -</div>
        
        <Textarea
          placeholder="Paste your study text here..."
          value={studyMaterial}
          onChange={(e) => setStudyMaterial(e.target.value)}
          className="min-h-[150px]"
        />
        
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600"
          disabled={isScanning || (!studyMaterial && !file)}
          onClick={handleScan}
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Questions...
            </>
          ) : (
            <>
              <ScanLine className="mr-2 h-4 w-4" />
              Generate Quiz Questions
            </>
          )}
        </Button>
      </div>
    </GameCard>
  );
};

export default MaterialScanner;
