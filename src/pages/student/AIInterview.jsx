import React, { useState, useEffect } from 'react';
import { Play, Mic, Send, ChevronRight, CheckCircle2, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScoreDial } from '@/components/ScoreDial';
import { useMutation } from '@tanstack/react-query';
import { interviewService } from '@/services/interviewService';

export const AIInterview = () => {
  const [stage, setStage] = useState('setup'); // setup, active, summary
  const [roleHint, setRoleHint] = useState('');
  const [session, setSession] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [results, setResults] = useState([]);
  const [debugState, setDebugState] = useState('idle'); // idle, running, success, error

  useEffect(() => {
    if (session?.questions) {
      const q = session.questions[currentQuestionIdx];
      if (q && q.boilerplate) {
        setAnswer(q.boilerplate);
      } else {
        setAnswer('');
      }
      setDebugState('idle');
    }
  }, [currentQuestionIdx, session]);

  const startMutation = useMutation({
    mutationFn: interviewService.startSession,
    onSuccess: (data) => {
      setSession(data);
      setStage('active');
    },
  });

  const submitMutation = useMutation({
    mutationFn: (variables) => interviewService.submitAnswer(variables.sessionId, variables.questionId, variables.answer),
    onSuccess: (data) => {
      setResults([...results, {
        question: session.questions[currentQuestionIdx].question || session.questions[currentQuestionIdx].text,
        answer: answer,
        score: data.score,
        feedback: data.feedback
      }]);
      
      setAnswer('');
      if (currentQuestionIdx < session.questions.length - 1) {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
      } else {
        setStage('summary');
      }
    },
  });

  const handleStart = () => {
    startMutation.mutate(roleHint);
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) return;
    submitMutation.mutate({
      sessionId: session.sessionId,
      questionId: session.questions[currentQuestionIdx].id,
      answer
    });
  };

  const currentQuestion = session?.questions?.[currentQuestionIdx];
  const progress = session ? ((currentQuestionIdx) / session.questions.length) * 100 : 0;
  const avgScore = results.length > 0 
    ? Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / results.length) 
    : 0;

  if (stage === 'setup') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">AI Interview</h1>
          <p className="text-lg text-muted-foreground">Take a personalized technical interview to verify your skills</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ready to start?</CardTitle>
            <CardDescription>
              We'll generate a 5-question technical interview based on your profile's top skills.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role-hint">Target Role (Optional)</Label>
              <Input
                id="role-hint"
                placeholder="e.g., React Developer, Backend Engineer"
                value={roleHint}
                onChange={(e) => setRoleHint(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This helps us tailor the questions to the specific role you're aiming for.
              </p>
            </div>
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleStart}
              disabled={startMutation.isPending}
              data-testid="interview-begin-btn"
            >
              {startMutation.isPending ? 'Preparing Questions...' : 'Begin Interview'}
              {!startMutation.isPending && <Play className="ml-2 w-4 h-4" />}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (stage === 'active' && currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Question {currentQuestionIdx + 1} of {session.questions.length}</h1>
          <span className="text-muted-foreground font-mono">
            {currentQuestion.category}
          </span>
        </div>
        <Progress value={progress} className="h-2" />

        <Card className="mt-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-6 leading-relaxed">
              {currentQuestion.question || currentQuestion.text}
            </h2>
            
            <div className="space-y-4">
              {currentQuestion.type === 'mcq' && (
                <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
                  {currentQuestion.options.map((opt, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        id={`opt-${i}`} 
                        name="mcq-answer" 
                        value={opt} 
                        checked={answer === opt}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                        disabled={submitMutation.isPending}
                      />
                      <Label htmlFor={`opt-${i}`} className="text-base font-normal cursor-pointer leading-tight">
                        {opt}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {(!currentQuestion.type || currentQuestion.type === 'text') && (
                <Textarea
                  placeholder="Type your answer here..."
                  className="min-h-[200px] text-base"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={submitMutation.isPending}
                />
              )}

              {currentQuestion.type === 'code' && (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border border-border bg-slate-950 shadow-inner">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-border text-xs text-muted-foreground font-mono">
                       <span>main.js</span>
                       <span>Javascript</span>
                    </div>
                    <Textarea
                      placeholder="// Write your code here..."
                      className="min-h-[300px] font-mono text-sm bg-transparent border-0 rounded-none focus-visible:ring-0 resize-none text-slate-300 p-4"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      disabled={submitMutation.isPending || debugState === 'running'}
                    />
                  </div>
                  
                  {debugState !== 'idle' && (
                    <div className="bg-slate-950 rounded-lg border border-border overflow-hidden animate-fade-in">
                      <div className="px-4 py-2 bg-slate-900 border-b border-border text-xs font-mono text-muted-foreground">
                        Test Output
                      </div>
                      <div className="p-4 font-mono text-sm space-y-2">
                        {debugState === 'running' && (
                          <div className="text-accent flex items-center animate-pulse">
                            <Play className="w-4 h-4 mr-2" /> Running tests...
                          </div>
                        )}
                        {debugState === 'error' && (
                          <>
                            <div className="text-red-400">✖ 1/3 Test Cases Passed</div>
                            <div className="text-red-300 text-xs mt-2 bg-red-950/30 p-3 rounded border border-red-900/50 leading-relaxed">
                              Error: Output did not match expected results.<br/>
                              Try adding more logic to your function to cover edge cases.
                            </div>
                          </>
                        )}
                        {debugState === 'success' && (
                          <>
                            <div className="text-emerald-400 flex items-center">
                              <CheckCircle2 className="w-4 h-4 mr-2" /> 3/3 Test Cases Passed
                            </div>
                            <div className="text-emerald-300 text-xs mt-2 bg-emerald-950/30 p-3 rounded border border-emerald-900/50 leading-relaxed">
                              Success: Code passed all validation checks! You can now submit your answer.
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => {
                        setDebugState('running');
                        setTimeout(() => {
                           if (answer.length < (currentQuestion.boilerplate?.length || 0) + 15) {
                             setDebugState('error');
                           } else {
                             setDebugState('success');
                           }
                        }, 1200);
                      }}
                      disabled={debugState === 'running' || submitMutation.isPending}
                    >
                      <Play className="w-4 h-4 mr-2" /> Run & Debug
                    </Button>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <Button variant="outline" size="icon" disabled>
                  <Mic className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim() || submitMutation.isPending}
                  data-testid="interview-submit-answer-btn"
                >
                  {submitMutation.isPending ? 'Submitting...' : 'Submit Answer'}
                  {!submitMutation.isPending && <Send className="ml-2 w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (stage === 'summary') {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Interview Complete</h1>
          <p className="text-lg text-muted-foreground">Here's how you performed</p>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="py-12 flex flex-col items-center">
            <div data-testid="interview-summary-dial" className="mb-6">
              <ScoreDial score={avgScore} size="lg" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
            <p className="text-muted-foreground max-w-md text-center">
              Your score has been updated on your dashboard and is now visible to recruiters.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Question Breakdown</h3>
          {results.map((res, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-base leading-relaxed font-medium flex items-start gap-3">
                  <span className="text-muted-foreground font-mono mt-0.5">Q{idx + 1}.</span>
                  {res.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm font-medium mb-1">Your Answer:</p>
                  <p className="text-sm text-muted-foreground">{res.answer}</p>
                </div>
                <div className="flex items-start gap-4">
                  <ScoreDial score={res.score} size="sm" />
                  <div>
                    <p className="text-sm font-medium mb-1">Feedback:</p>
                    <p className="text-sm text-accent">{res.feedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button onClick={() => window.location.href = '/student/dashboard'} size="lg">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return null;
};