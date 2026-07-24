import React, { useState } from 'react';
import { Search, Users, SlidersHorizontal, Github, Award, Mail, ExternalLink, Calendar, GitCommit, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScoreDial } from '@/components/ScoreDial';
import { SkillPill } from '@/components/SkillPill';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { recruiterService } from '@/services/recruiterService';
import { toast } from 'sonner';

export const RecruiterDashboard = () => {
  const { logout } = useAuth();
  const [skillFilter, setSkillFilter] = useState('');
  const [minScore, setMinScore] = useState([0]);
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const { data: candidates = [], isLoading } = useQuery({
    queryKey: ['candidates', skillFilter, minScore[0], locationFilter],
    queryFn: () => recruiterService.searchCandidates(skillFilter, minScore[0], locationFilter)
  });

  const [invitedCandidates, setInvitedCandidates] = useState(new Set());

  const handleInvite = (candidate) => {
    setInvitedCandidates((prev) => new Set(prev).add(candidate.id));
    toast.success(`Invite sent to ${candidate.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">SkillProof</h1>
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                Recruiter
              </span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold mb-2">Candidate Search</h2>
            <p className="text-lg text-muted-foreground">Find verified talent with real skills</p>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </CardTitle>
              <CardDescription>Refine your candidate search</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="skills">Name or Skills</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="skills"
                      data-testid="recruiter-skills-filter"
                      placeholder="e.g., Alex, React, Python"
                      value={skillFilter}
                      onChange={(e) => setSkillFilter(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-score">Minimum Score: {minScore[0]}</Label>
                  <Slider
                    id="min-score"
                    data-testid="recruiter-min-score-slider"
                    value={minScore}
                    onValueChange={setMinScore}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Remote, San Francisco"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Searching...' : `${candidates.length} candidates found`}
            </p>
            <Button data-testid="recruiter-search-btn">Export Results</Button>
          </div>

          {/* Candidate Grid */}
          {isLoading ? (
            <div className="py-16 text-center">
              <div className="animate-pulse">Loading candidates...</div>
            </div>
          ) : candidates.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No candidates found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSkillFilter('');
                    setMinScore([0]);
                    setLocationFilter('');
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {candidates.map((candidate) => (
                <Card
                  key={candidate.id}
                  data-testid={`recruiter-candidate-card-${candidate.id}`}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-start gap-4">
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg truncate">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            @{candidate.github.username}
                          </p>
                          <p className="text-sm text-muted-foreground">{candidate.location}</p>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="flex items-center justify-center" data-testid={`recruiter-candidate-dial-${candidate.id}`}>
                        <ScoreDial score={candidate.overallScore} size="md" />
                      </div>

                      {/* Skills */}
                      <div>
                        <p className="text-sm font-medium mb-2">Top Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.topSkills.map((skill, idx) => (
                            <SkillPill key={idx} skill={skill} variant="default" />
                          ))}
                        </div>
                      </div>

                      {/* GitHub Activity */}
                      <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                        <p className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          GitHub Activity
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Commits</p>
                            <p className="font-semibold">{candidate.github.commits}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Stars</p>
                            <p className="font-semibold">{candidate.github.stars}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {candidate.github.activity}
                        </p>
                      </div>

                      {/* Latest Interview */}
                      {candidate.latestInterview && (
                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4 text-accent" />
                            Latest AI Interview
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold">Score: {candidate.latestInterview.score}%</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(candidate.latestInterview.date), 'MMM d, yyyy')}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1" onClick={() => setSelectedCandidate(candidate)}>
                            View Profile
                          </Button>
                          <Button variant="outline" className="flex-1">Contact</Button>
                        </div>
                        <Button 
                          className="w-full"
                          variant={invitedCandidates.has(candidate.id) ? "secondary" : "default"}
                          onClick={() => handleInvite(candidate)}
                          disabled={invitedCandidates.has(candidate.id)}
                        >
                          {invitedCandidates.has(candidate.id) ? "✓ Invite Sent" : "Request Live AI Interview"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Detailed Candidate Profile Sheet */}
      <Sheet open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selectedCandidate && (
            <div className="space-y-8 py-6">
              <SheetHeader>
                <div className="flex items-center gap-4">
                  <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-20 h-20 rounded-full" />
                  <div>
                    <SheetTitle className="text-2xl">{selectedCandidate.name}</SheetTitle>
                    <SheetDescription className="flex items-center gap-1 mt-1">
                      <Github className="w-4 h-4" />
                      @{selectedCandidate.github.username}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6">
                {/* Overall Score */}
                <div className="flex flex-col items-center p-6 bg-accent/5 rounded-xl border border-accent/10">
                  <h3 className="text-lg font-medium mb-4">SkillProof Score</h3>
                  <ScoreDial score={selectedCandidate.overallScore} size="lg" />
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Verified Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.topSkills.map((skill, idx) => (
                      <SkillPill key={idx} skill={skill} variant="default" />
                    ))}
                    <SkillPill skill="TypeScript" variant="outline" />
                    <SkillPill skill="Tailwind CSS" variant="outline" />
                    <SkillPill skill="System Design" variant="outline" />
                  </div>
                </div>

                {/* GitHub Deep Dive */}
                <div>
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">GitHub Deep Dive</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-secondary/20">
                      <CardContent className="p-4 flex items-center gap-3">
                        <GitCommit className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xl font-bold">{selectedCandidate.github.commits}</p>
                          <p className="text-xs text-muted-foreground">Commits (1 yr)</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/20">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Star className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xl font-bold">{selectedCandidate.github.stars}</p>
                          <p className="text-xs text-muted-foreground">Stars Earned</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <p className="text-sm mt-3 bg-secondary/50 p-3 rounded-md text-muted-foreground">
                    {selectedCandidate.github.activity}
                  </p>
                </div>

                {/* Interview Analysis */}
                {selectedCandidate.latestInterview && (
                  <div>
                    <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Latest AI Interview</h3>
                    <Card className="bg-accent/5 border-accent/20">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-border pb-3">
                          <span className="font-medium text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> 
                            {format(new Date(selectedCandidate.latestInterview.date), 'MMMM d, yyyy')}
                          </span>
                          <span className="text-accent font-bold">{selectedCandidate.latestInterview.score}% Score</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Candidate demonstrated strong problem-solving skills in React hooks. Showed excellent understanding of closures, but could improve optimization strategies for large lists.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="pt-4 flex gap-3">
                  <Button className="flex-1" onClick={() => handleInvite(selectedCandidate)}>
                    <Mail className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Full Resume
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};