import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Globe, 
  Brain, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Trophy,
  Rocket
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  topics: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  link: string;
  steps: string[];
}

const learningPaths: LearningPath[] = [
  {
    id: 'python-app',
    title: 'Learn Python & Build Your First App',
    description: 'Master Python fundamentals and create real-world applications from scratch.',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    topics: ['Python Basics', 'Data Types', 'Functions', 'OOP', 'File I/O'],
    difficulty: 'Beginner',
    link: '/topic/python-basics',
    steps: ['Tutorial', 'Code Examples', 'Challenge', 'Build App']
  },
  {
    id: 'website',
    title: 'Create a Website from Scratch',
    description: 'Learn HTML, CSS, JavaScript and build responsive, modern websites.',
    icon: Globe,
    color: 'from-green-500 to-emerald-500',
    topics: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Deployment'],
    difficulty: 'Beginner',
    link: '/topic/web-development',
    steps: ['Learn Basics', 'Style It', 'Add Interactivity', 'Go Live']
  },
  {
    id: 'ml-project',
    title: 'Launch a Machine Learning Project',
    description: 'Dive into AI/ML with hands-on projects using Python and popular frameworks.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    topics: ['ML Fundamentals', 'Neural Networks', 'TensorFlow', 'Data Analysis'],
    difficulty: 'Intermediate',
    link: '/topic/machine-learning',
    steps: ['Learn Theory', 'Build Models', 'Train & Test', 'Deploy']
  }
];

interface LearningPathsProps {
  variant?: 'full' | 'compact';
  className?: string;
}

export const LearningPaths = ({ variant = 'full', className = '' }: LearningPathsProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/10 text-green-500';
      case 'Intermediate':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'Advanced':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`grid gap-4 ${className}`}>
        {learningPaths.map((path) => (
          <Link key={path.id} to={path.link}>
            <Card className="hover:border-primary/50 transition-all hover:shadow-md group">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center flex-shrink-0`}>
                  <path.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {path.title}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">{path.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="container">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <BookOpen className="mr-1 h-3 w-3" />
            Learning Paths
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Code, Build, Launch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow our structured learning paths to go from beginner to launching your own projects online.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <Card key={path.id} className="overflow-hidden hover:shadow-elegant transition-all group">
              <div className={`h-2 bg-gradient-to-r ${path.color}`} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4`}>
                    <path.icon className="h-7 w-7 text-white" />
                  </div>
                  <Badge className={getDifficultyColor(path.difficulty)}>
                    {path.difficulty}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {path.title}
                </CardTitle>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Learning Steps */}
                <div className="flex items-center gap-2 text-xs">
                  {path.steps.map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
                        {index === 0 && <BookOpen className="h-3 w-3" />}
                        {index === 1 && <Sparkles className="h-3 w-3" />}
                        {index === 2 && <Trophy className="h-3 w-3" />}
                        {index === 3 && <Rocket className="h-3 w-3" />}
                        <span>{step}</span>
                      </div>
                      {index < path.steps.length - 1 && (
                        <ArrowRight className="h-3 w-3 mx-1 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5">
                  {path.topics.slice(0, 4).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {path.topics.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{path.topics.length - 4} more
                    </Badge>
                  )}
                </div>

                <Button asChild className="w-full" variant="outline">
                  <Link to={path.link}>
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Launch CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to take your project live after learning?
          </p>
          <Button asChild size="lg" className="bg-gradient-primary hover:shadow-neon">
            <Link to="/hosting-guide">
              <Rocket className="mr-2 h-5 w-5" />
              Launch Your Project
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;
