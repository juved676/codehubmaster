import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  BookOpen, 
  Code2, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronRight,
  BarChart3,
  Database,
  Lightbulb,
  Target,
  Clock,
  Download,
  ExternalLink,
  Brain,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Zap,
  TrendingUp,
  FileText,
  Play
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { InArticleAd } from "@/components/AdUnit";

// Code block component with copy functionality
const CodeBlock = ({ code, language = "python", title }: { code: string; language?: string; title?: string }) => {
  const [copied, setCopied] = useState(false);
  
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{title}</span>
          </div>
          <Badge variant="secondary" className="text-xs">{language}</Badge>
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyCode}
          className="absolute top-2 right-2 h-8 opacity-70 hover:opacity-100"
        >
          {copied ? (
            <><Check className="h-4 w-4 mr-1" /> Copied!</>
          ) : (
            <><Copy className="h-4 w-4 mr-1" /> Copy</>
          )}
        </Button>
        <pre className="bg-muted/30 p-4 overflow-x-auto">
          <code className="text-sm text-foreground font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
};

// Collapsible section component
const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = false,
  id
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  id?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
      <CollapsibleTrigger asChild>
        <button 
          id={id}
          className="flex items-center gap-2 w-full p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
        >
          {isOpen ? <ChevronDown className="h-5 w-5 text-primary" /> : <ChevronRight className="h-5 w-5 text-primary" />}
          <span className="font-semibold text-lg">{title}</span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4 px-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// Table of Contents item
const TOCItem = ({ href, children, level = 1 }: { href: string; children: React.ReactNode; level?: number }) => (
  <a 
    href={href} 
    className={`block py-1 text-muted-foreground hover:text-primary transition-colors ${level === 2 ? 'pl-4 text-sm' : ''}`}
  >
    {children}
  </a>
);

export default function EDATutorial() {
  const [progress, setProgress] = useState(0);

  const canonicalUrl = "https://codehubmaster.lovable.app/eda-tutorial-python";
  const pageTitle = "Complete Exploratory Data Analysis (EDA) Tutorial Python 2025 | Step-by-Step Guide with Code";
  const pageDescription = "Master EDA with Python! Step-by-step tutorial with pandas, seaborn. Learn data analysis, visualization, cleaning techniques. Perfect for beginners. Download free code.";

  // Comprehensive FAQ data for schema
  const faqData = [
    { question: "What is Exploratory Data Analysis (EDA)?", answer: "Exploratory Data Analysis (EDA) is a critical first step in data science where you analyze datasets to summarize their main characteristics using visual methods, statistical summaries, and data profiling techniques. EDA helps identify patterns, spot anomalies, test hypotheses, and check assumptions using Python libraries like pandas and seaborn." },
    { question: "Why is EDA important in data science?", answer: "EDA is crucial because it helps you understand your data before applying machine learning algorithms. It reveals data quality issues, missing values, outliers, and relationships between variables. Without proper EDA, your models may produce inaccurate results or fail completely." },
    { question: "What Python libraries are used for EDA?", answer: "The most commonly used Python libraries for EDA are pandas for data manipulation, NumPy for numerical operations, Matplotlib and Seaborn for data visualization, and specialized tools like pandas-profiling (ydata-profiling) and Sweetviz for automated EDA reports." },
    { question: "How long does EDA typically take?", answer: "EDA typically takes 20-40% of the total data science project time. For a small dataset, it might take a few hours, while complex datasets with millions of rows can require days or weeks of thorough exploration and analysis." },
    { question: "What is the difference between univariate and bivariate analysis?", answer: "Univariate analysis examines one variable at a time using histograms, box plots, and summary statistics. Bivariate analysis explores relationships between two variables using scatter plots, correlation matrices, and cross-tabulations." },
    { question: "How do I handle missing values in EDA?", answer: "Missing values can be handled by: 1) Dropping rows/columns with dropna(), 2) Imputation with mean/median/mode, 3) Forward/backward fill for time series, 4) Advanced techniques like KNN imputation. The choice depends on the percentage of missing data and the analysis goals." },
    { question: "What are outliers and how do I detect them?", answer: "Outliers are data points that significantly differ from other observations. Detection methods include: box plots (IQR method), Z-score analysis, scatter plots, and statistical tests. Outliers can be valid extreme values or errors that need investigation." },
    { question: "Can I automate EDA in Python?", answer: "Yes! Libraries like pandas-profiling (ydata-profiling), Sweetviz, and D-Tale can generate comprehensive EDA reports automatically. These tools create HTML reports with statistics, visualizations, and correlation analysis with minimal code." },
    { question: "What is the best dataset for learning EDA?", answer: "Popular datasets for learning EDA include the Titanic dataset (classification), Iris dataset (basic exploration), Boston Housing (regression), and Tips dataset from Seaborn. These datasets are well-documented and perfect for beginners." },
    { question: "How do I visualize categorical vs numerical data?", answer: "Categorical data is best visualized with bar charts, pie charts, and count plots. Numerical data uses histograms, box plots, and density plots. For relationships between categorical and numerical, use box plots grouped by category or violin plots." },
    { question: "What is correlation analysis in EDA?", answer: "Correlation analysis measures the statistical relationship between variables. Pearson correlation (-1 to 1) measures linear relationships, while Spearman correlation measures monotonic relationships. Heatmaps are commonly used to visualize correlation matrices." },
    { question: "How do I check data quality during EDA?", answer: "Data quality checks include: examining data types with df.dtypes, checking for missing values with df.isnull().sum(), identifying duplicates with df.duplicated(), validating value ranges, and checking for inconsistent formatting or spelling variations." },
    { question: "What is feature engineering in EDA?", answer: "Feature engineering is the process of creating new variables from existing data to improve model performance. During EDA, you identify opportunities for feature creation like date decomposition, binning numerical variables, or combining related features." },
    { question: "Should I normalize data during EDA?", answer: "Data normalization is typically done during preprocessing, not EDA. However, during EDA, you should identify features that need normalization by examining their distributions and scales. This informs your preprocessing decisions." },
    { question: "How do I create an EDA report in Python?", answer: "Create EDA reports using: 1) Manual approach with pandas, matplotlib, and seaborn, 2) Automated tools like pandas-profiling with profile.to_file('report.html'), or 3) Jupyter notebooks with markdown documentation. Export as HTML or PDF for sharing." },
    { question: "What is the EDA workflow for machine learning?", answer: "The ML EDA workflow includes: 1) Load and understand data structure, 2) Check target variable distribution, 3) Handle missing values, 4) Analyze feature distributions, 5) Examine feature-target relationships, 6) Identify multicollinearity, 7) Detect and handle outliers, 8) Document insights for feature selection." },
    { question: "How do I handle large datasets in EDA?", answer: "For large datasets: 1) Use sampling with df.sample(), 2) Work with data chunks using pd.read_csv(chunksize=), 3) Use efficient data types, 4) Leverage Dask for parallel processing, 5) Use database connections instead of loading all data into memory." },
    { question: "What are the common mistakes in EDA?", answer: "Common EDA mistakes include: skipping the exploration phase, not checking for data leakage, ignoring outliers without investigation, assuming normal distribution, not documenting findings, and spending too much or too little time on exploration." },
    { question: "Is EDA necessary for every project?", answer: "Yes, EDA is essential for every data project. Even if you've worked with similar data before, each dataset has unique characteristics. Skipping EDA leads to poor model performance, incorrect conclusions, and wasted time debugging issues that EDA would have revealed." },
    { question: "How do I practice EDA skills?", answer: "Practice EDA by: 1) Working on Kaggle datasets and competitions, 2) Analyzing public datasets from UCI ML Repository, 3) Exploring real-world data from government sources, 4) Following along with EDA tutorials and courses, 5) Building a portfolio of EDA projects on GitHub." }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://codehubmaster.lovable.app" },
    { name: "Topics", url: "https://codehubmaster.lovable.app/topics" },
    { name: "Data Science", url: "https://codehubmaster.lovable.app/topic/data-science" },
    { name: "EDA Tutorial Python", url: canonicalUrl }
  ];

  // Tutorial/Course Schema
  const tutorialSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": pageTitle,
    "description": pageDescription,
    "author": {
      "@type": "Organization",
      "name": "CodeHubMaster"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CodeHubMaster",
      "logo": {
        "@type": "ImageObject",
        "url": "https://codehubmaster.lovable.app/favicon.png"
      }
    },
    "datePublished": "2025-01-15T00:00:00Z",
    "dateModified": "2025-02-03T00:00:00Z",
    "mainEntityOfPage": canonicalUrl,
    "keywords": "exploratory data analysis python, EDA tutorial, pandas EDA, data visualization Python, data science tutorial, Python data analysis",
    "articleSection": "Data Science",
    "wordCount": 3500
  };

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        keywords="exploratory data analysis python, EDA tutorial for beginners, Python data analysis step by step, pandas EDA examples, data visualization Python tutorial, EDA techniques data science, how to analyze data with Python, Python data exploration tutorial, EDA using pandas and seaborn, data analysis project Python, EDA for machine learning, Python data cleaning tutorial, statistical analysis Python, data preprocessing Python, EDA report Python, Python for data analysts, data exploration techniques, Python EDA code examples, EDA best practices, data analysis for beginners"
        faqData={faqData}
        breadcrumbs={breadcrumbs}
        schemaData={tutorialSchema}
        articleData={{
          publishedTime: "2025-01-15T00:00:00Z",
          modifiedTime: "2025-02-03T00:00:00Z",
          author: "CodeHubMaster",
          section: "Data Science"
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
          <div className="max-w-5xl mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/topics" className="hover:text-primary">Topics</Link>
              <span>/</span>
              <Link to="/topic/data-science" className="hover:text-primary">Data Science</Link>
              <span>/</span>
              <span className="text-foreground">EDA Tutorial</span>
            </nav>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <BookOpen className="h-3 w-3 mr-1" /> Complete Guide
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" /> 45 min read
              </Badge>
              <Badge variant="outline">
                <Target className="h-3 w-3 mr-1" /> Beginner to Intermediate
              </Badge>
              <Badge variant="outline">
                <TrendingUp className="h-3 w-3 mr-1" /> Updated 2025
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Complete Exploratory Data Analysis (EDA) Tutorial with Python 2025
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
              Master <strong>exploratory data analysis Python</strong> techniques with this comprehensive step-by-step guide. 
              Learn <strong>pandas EDA examples</strong>, <strong>data visualization Python tutorial</strong> methods, 
              and <strong>EDA best practices</strong> with real code examples. Perfect for beginners and data analysts.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#getting-started">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/topics/eda-python" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Download Notebook
                </a>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Code Examples</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">EDA Techniques</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Real Datasets</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl font-bold text-primary">20</div>
                <div className="text-sm text-muted-foreground">FAQ Answered</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Table of Contents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <TOCItem href="#what-is-eda">1. What is EDA?</TOCItem>
                    <TOCItem href="#getting-started" level={2}>Getting Started</TOCItem>
                    <TOCItem href="#python-libraries">2. Python Libraries for EDA</TOCItem>
                    <TOCItem href="#pandas-numpy" level={2}>Pandas & NumPy</TOCItem>
                    <TOCItem href="#visualization-libs" level={2}>Visualization Libraries</TOCItem>
                    <TOCItem href="#eda-workflow">3. EDA Workflow</TOCItem>
                    <TOCItem href="#data-loading">4. Data Loading & Overview</TOCItem>
                    <TOCItem href="#data-cleaning">5. Data Cleaning Tutorial</TOCItem>
                    <TOCItem href="#missing-values" level={2}>Handling Missing Values</TOCItem>
                    <TOCItem href="#univariate-analysis">6. Univariate Analysis</TOCItem>
                    <TOCItem href="#bivariate-analysis">7. Bivariate Analysis</TOCItem>
                    <TOCItem href="#correlation">8. Correlation Analysis</TOCItem>
                    <TOCItem href="#outliers">9. Outlier Detection</TOCItem>
                    <TOCItem href="#visualizations">10. EDA Visualizations</TOCItem>
                    <TOCItem href="#automated-eda">11. Automated EDA Tools</TOCItem>
                    <TOCItem href="#case-study">12. Case Study: Titanic</TOCItem>
                    <TOCItem href="#best-practices">13. EDA Best Practices</TOCItem>
                    <TOCItem href="#common-mistakes">14. Common Mistakes</TOCItem>
                    <TOCItem href="#faq">15. FAQ Section</TOCItem>
                    <TOCItem href="#resources">16. Resources & Next Steps</TOCItem>
                  </CardContent>
                </Card>

                {/* Newsletter CTA */}
                <Card className="mt-6 bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">📚 Free Python EDA Cheatsheet</h4>
                    <p className="text-sm text-muted-foreground mb-4">Get our comprehensive EDA commands reference guide!</p>
                    <Button className="w-full" size="sm" asChild>
                      <Link to="/ask">Get Free Access</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              {/* Section 1: What is EDA */}
              <section id="what-is-eda" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Database className="h-8 w-8 text-primary" />
                  1. What is Exploratory Data Analysis (EDA)?
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6">
                  <strong>Exploratory Data Analysis (EDA)</strong> is the critical first step in any <strong>data analysis project Python</strong> workflow. 
                  It involves analyzing datasets to summarize their main characteristics, often using visual methods and statistical summaries. 
                  If you're learning <strong>how to analyze data with Python</strong>, understanding EDA is essential.
                </p>

                <div className="bg-muted/30 rounded-lg p-6 mb-6 border border-border">
                  <h3 className="font-semibold text-lg mb-3">🎯 Why is EDA Important?</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Understand data structure before building machine learning models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Identify <strong>data quality</strong> issues, missing values, and anomalies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Discover patterns and relationships between variables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Generate hypotheses for further analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Prepare data for <strong>EDA for machine learning</strong> pipelines</span>
                    </li>
                  </ul>
                </div>

                <p className="text-muted-foreground mb-6">
                  This <strong>EDA tutorial for beginners</strong> covers everything from basic <strong>Python data analysis step by step</strong> 
                  to advanced <strong>EDA techniques data science</strong> professionals use daily. Whether you're a student looking for 
                  <strong> Python EDA for students</strong> resources or a professional seeking <strong>EDA best practices</strong>, 
                  this <strong>complete EDA guide Python</strong> has you covered.
                </p>

                <div id="getting-started" className="scroll-mt-24">
                  <h3 className="text-xl font-semibold mb-4">Getting Started with EDA</h3>
                  <p className="text-muted-foreground mb-4">
                    To begin your <strong>Python data exploration tutorial</strong>, you'll need to set up your environment. 
                    This <strong>data analysis tutorial 2025</strong> uses the latest versions of all libraries.
                  </p>

                  <CodeBlock 
                    title="Environment Setup" 
                    language="bash"
                    code={`# Install required libraries for EDA Python
pip install pandas numpy matplotlib seaborn

# For automated EDA tools
pip install ydata-profiling sweetviz

# For Jupyter notebooks
pip install notebook jupyterlab`}
                  />
                </div>
              </section>

              {/* Ad Placement */}
              <InArticleAd />

              {/* Section 2: Python Libraries */}
              <section id="python-libraries" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Code2 className="h-8 w-8 text-primary" />
                  2. Python Data Analysis Libraries
                </h2>

                <p className="text-muted-foreground mb-6">
                  Understanding the <strong>Python data analysis libraries</strong> is crucial for effective EDA. 
                  These <strong>EDA tools Python</strong> form the foundation of any data science workflow.
                </p>

                <div id="pandas-numpy" className="scroll-mt-24">
                  <h3 className="text-xl font-semibold mb-4">Pandas & NumPy - The Foundation</h3>
                  <p className="text-muted-foreground mb-4">
                    <strong>Pandas</strong> is the primary library for <strong>how to use pandas for EDA</strong>. 
                    Combined with NumPy, it provides powerful <strong>data exploration techniques</strong>.
                  </p>

                  <CodeBlock 
                    title="Core Library Imports" 
                    language="python"
                    code={`# Standard EDA imports - Python EDA code examples
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Configure display settings
pd.set_option('display.max_columns', 100)
pd.set_option('display.max_rows', 100)
pd.set_option('display.float_format', '{:.2f}'.format)

# Set visualization style
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("husl")

print("✅ EDA environment ready!")`}
                  />
                </div>

                <div id="visualization-libs" className="scroll-mt-24 mt-8">
                  <h3 className="text-xl font-semibold mb-4">Visualization Libraries</h3>
                  <p className="text-muted-foreground mb-4">
                    For <strong>data visualization Python tutorial</strong> and <strong>EDA visualization techniques</strong>, 
                    Matplotlib and Seaborn are essential. These enable powerful visual <strong>data exploration Python code</strong>.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <Card className="border-border">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2">📊 Matplotlib</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Low-level plotting control</li>
                          <li>• Highly customizable</li>
                          <li>• All chart types supported</li>
                          <li>• Publication-quality figures</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-border">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2">🎨 Seaborn</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Beautiful default styles</li>
                          <li>• Statistical visualizations</li>
                          <li>• Pandas integration</li>
                          <li>• Complex plots simplified</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Section 3: EDA Workflow */}
              <section id="eda-workflow" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Target className="h-8 w-8 text-primary" />
                  3. EDA Workflow Python - Step by Step
                </h2>

                <p className="text-muted-foreground mb-6">
                  A structured <strong>EDA workflow Python</strong> ensures thorough data exploration. 
                  Follow these <strong>EDA steps in Python</strong> for consistent results:
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { step: 1, title: "Data Loading", desc: "Import dataset and initial inspection" },
                    { step: 2, title: "Data Overview", desc: "Shape, types, and basic statistics" },
                    { step: 3, title: "Missing Value Analysis", desc: "Identify and handle null values" },
                    { step: 4, title: "Data Cleaning", desc: "Fix errors, duplicates, and inconsistencies" },
                    { step: 5, title: "Univariate Analysis", desc: "Analyze individual variable distributions" },
                    { step: 6, title: "Bivariate Analysis", desc: "Explore relationships between variables" },
                    { step: 7, title: "Correlation Analysis", desc: "Measure statistical relationships" },
                    { step: 8, title: "Outlier Detection", desc: "Identify and handle extreme values" },
                    { step: 9, title: "Feature Engineering Ideas", desc: "Document insights for new features" },
                    { step: 10, title: "Summary & Documentation", desc: "Create EDA report Python" }
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="font-bold text-primary">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Data Loading */}
              <section id="data-loading" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Database className="h-8 w-8 text-primary" />
                  4. Data Loading & Overview - Python Data Analysis Guide
                </h2>

                <p className="text-muted-foreground mb-6">
                  The first step in any <strong>Python data analysis guide</strong> is loading and understanding your data. 
                  These <strong>pandas EDA examples</strong> show essential commands for initial exploration.
                </p>

                <CodeBlock 
                  title="Loading Data - Data Analysis Examples Python" 
                  language="python"
                  code={`# Load the Titanic dataset - EDA Python project example
import pandas as pd
import seaborn as sns

# Load data from various sources
df = sns.load_dataset('titanic')  # Built-in dataset

# Or from CSV file
# df = pd.read_csv('your_data.csv')

# Or from Excel
# df = pd.read_excel('your_data.xlsx')

# Basic overview - Data profiling Python
print("=" * 50)
print("DATASET OVERVIEW")
print("=" * 50)

print(f"\\n📊 Shape: {df.shape[0]} rows × {df.shape[1]} columns")
print(f"\\n📋 Columns: {list(df.columns)}")

# First few rows
print("\\n🔍 First 5 rows:")
display(df.head())

# Data types
print("\\n📝 Data Types:")
print(df.dtypes)

# Statistical summary - Statistical analysis Python
print("\\n📈 Statistical Summary:")
display(df.describe())

# Include categorical columns
print("\\n📊 All Columns Summary:")
display(df.describe(include='all'))`}
                />

                <div className="bg-muted/30 rounded-lg p-6 mb-6 border border-border">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Pro Tip: Quick Data Quality Check
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Use <code className="bg-muted px-2 py-1 rounded">df.info()</code> for a comprehensive overview 
                    including memory usage and non-null counts. This is essential for <strong>data quality check Python</strong>.
                  </p>
                </div>

                <CodeBlock 
                  title="Comprehensive Data Overview" 
                  language="python"
                  code={`# Detailed data info - EDA basics Python
print("\\n📋 Detailed Data Info:")
df.info()

# Memory usage
print(f"\\n💾 Memory Usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")

# Check for duplicates - Data quality check Python
duplicates = df.duplicated().sum()
print(f"\\n🔄 Duplicate Rows: {duplicates}")

# Unique values per column
print("\\n🔢 Unique Values per Column:")
for col in df.columns:
    print(f"  {col}: {df[col].nunique()} unique values")`}
                />
              </section>

              {/* Ad Placement */}
              <InArticleAd />

              {/* Section 5: Data Cleaning */}
              <section id="data-cleaning" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Zap className="h-8 w-8 text-primary" />
                  5. Python Data Cleaning Tutorial
                </h2>

                <p className="text-muted-foreground mb-6">
                  <strong>Data preprocessing Python</strong> is crucial for accurate analysis. 
                  This <strong>Python data cleaning tutorial</strong> covers essential techniques for preparing your data.
                </p>

                <div id="missing-values" className="scroll-mt-24">
                  <h3 className="text-xl font-semibold mb-4">Handling Missing Values</h3>
                  
                  <CodeBlock 
                    title="Missing Value Analysis" 
                    language="python"
                    code={`# Check missing values - EDA techniques data science
print("\\n🔍 Missing Values Analysis:")
missing = df.isnull().sum()
missing_pct = (missing / len(df)) * 100

# Create missing value summary
missing_df = pd.DataFrame({
    'Missing Count': missing,
    'Missing %': missing_pct
}).sort_values('Missing %', ascending=False)

print(missing_df[missing_df['Missing Count'] > 0])

# Visualize missing values
import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 6))
sns.heatmap(df.isnull(), cbar=True, yticklabels=False, cmap='viridis')
plt.title('Missing Value Heatmap - Data Visualization Python')
plt.tight_layout()
plt.show()`}
                  />

                  <CodeBlock 
                    title="Handling Missing Data Strategies" 
                    language="python"
                    code={`# Strategy 1: Drop rows with missing values
df_clean = df.dropna()

# Strategy 2: Drop columns with too many missing values (>50%)
threshold = len(df) * 0.5
df_clean = df.dropna(thresh=threshold, axis=1)

# Strategy 3: Fill with mean (numerical columns)
df['age'] = df['age'].fillna(df['age'].mean())

# Strategy 4: Fill with median (better for skewed data)
df['age'] = df['age'].fillna(df['age'].median())

# Strategy 5: Fill with mode (categorical columns)
df['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])

# Strategy 6: Forward/Backward fill (time series)
df['value'] = df['value'].fillna(method='ffill')  # Forward fill
df['value'] = df['value'].fillna(method='bfill')  # Backward fill

# Strategy 7: Custom value
df['deck'] = df['deck'].fillna('Unknown')

print("✅ Missing values handled!")`}
                  />
                </div>
              </section>

              {/* Section 6: Univariate Analysis */}
              <section id="univariate-analysis" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  6. Univariate Analysis - EDA Methods Python
                </h2>

                <p className="text-muted-foreground mb-6">
                  Univariate analysis examines one variable at a time. These <strong>data analysis techniques Python</strong> 
                  help understand individual feature distributions.
                </p>

                <CodeBlock 
                  title="Numerical Variable Analysis" 
                  language="python"
                  code={`# Numerical column analysis - EDA using pandas and seaborn
numerical_cols = df.select_dtypes(include=[np.number]).columns.tolist()

print(f"📊 Numerical Columns: {numerical_cols}")

# Distribution analysis for each numerical column
for col in numerical_cols[:5]:  # Analyze first 5
    print(f"\\n{'='*50}")
    print(f"Column: {col}")
    print(f"{'='*50}")
    
    # Statistics
    print(f"Mean: {df[col].mean():.2f}")
    print(f"Median: {df[col].median():.2f}")
    print(f"Std Dev: {df[col].std():.2f}")
    print(f"Min: {df[col].min():.2f}")
    print(f"Max: {df[col].max():.2f}")
    print(f"Skewness: {df[col].skew():.2f}")
    print(f"Kurtosis: {df[col].kurtosis():.2f}")
    
    # Visualization
    fig, axes = plt.subplots(1, 3, figsize=(15, 4))
    
    # Histogram
    axes[0].hist(df[col].dropna(), bins=30, edgecolor='black', alpha=0.7)
    axes[0].set_title(f'{col} - Histogram')
    axes[0].set_xlabel(col)
    axes[0].set_ylabel('Frequency')
    
    # Box plot
    axes[1].boxplot(df[col].dropna())
    axes[1].set_title(f'{col} - Box Plot')
    axes[1].set_ylabel(col)
    
    # KDE plot
    df[col].dropna().plot(kind='kde', ax=axes[2])
    axes[2].set_title(f'{col} - Density Plot')
    axes[2].set_xlabel(col)
    
    plt.tight_layout()
    plt.show()`}
                />

                <CodeBlock 
                  title="Categorical Variable Analysis" 
                  language="python"
                  code={`# Categorical column analysis - Python for data analysts
categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()

print(f"📝 Categorical Columns: {categorical_cols}")

for col in categorical_cols[:5]:  # Analyze first 5
    print(f"\\n{'='*50}")
    print(f"Column: {col}")
    print(f"{'='*50}")
    
    # Value counts
    value_counts = df[col].value_counts()
    value_pct = df[col].value_counts(normalize=True) * 100
    
    print("\\nValue Distribution:")
    for idx, (count, pct) in enumerate(zip(value_counts[:10], value_pct[:10])):
        print(f"  {value_counts.index[idx]}: {count} ({pct:.1f}%)")
    
    # Visualization
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    
    # Bar chart
    value_counts[:10].plot(kind='bar', ax=axes[0], color='steelblue', edgecolor='black')
    axes[0].set_title(f'{col} - Value Counts')
    axes[0].set_xlabel(col)
    axes[0].set_ylabel('Count')
    axes[0].tick_params(axis='x', rotation=45)
    
    # Pie chart (if few categories)
    if len(value_counts) <= 8:
        value_counts.plot(kind='pie', ax=axes[1], autopct='%1.1f%%')
        axes[1].set_title(f'{col} - Distribution')
        axes[1].set_ylabel('')
    else:
        value_counts[:8].plot(kind='barh', ax=axes[1], color='coral')
        axes[1].set_title(f'{col} - Top 8 Categories')
    
    plt.tight_layout()
    plt.show()`}
                />
              </section>

              {/* Section 7: Bivariate Analysis */}
              <section id="bivariate-analysis" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  7. Bivariate Analysis - Learn EDA Python
                </h2>

                <p className="text-muted-foreground mb-6">
                  Bivariate analysis explores relationships between two variables. 
                  These <strong>EDA Python examples</strong> demonstrate key techniques for relationship analysis.
                </p>

                <CodeBlock 
                  title="Numerical vs Numerical Analysis" 
                  language="python"
                  code={`# Scatter plot - EDA visualization techniques
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# Example: Age vs Fare in Titanic dataset
axes[0, 0].scatter(df['age'], df['fare'], alpha=0.5, c='steelblue')
axes[0, 0].set_xlabel('Age')
axes[0, 0].set_ylabel('Fare')
axes[0, 0].set_title('Age vs Fare - Scatter Plot')

# With regression line
sns.regplot(x='age', y='fare', data=df, ax=axes[0, 1], scatter_kws={'alpha':0.5})
axes[0, 1].set_title('Age vs Fare - With Regression Line')

# Hexbin plot for dense data
axes[1, 0].hexbin(df['age'].dropna(), df['fare'].dropna(), gridsize=20, cmap='YlOrRd')
axes[1, 0].set_xlabel('Age')
axes[1, 0].set_ylabel('Fare')
axes[1, 0].set_title('Age vs Fare - Hexbin Plot')
plt.colorbar(axes[1, 0].collections[0], ax=axes[1, 0])

# 2D Histogram
axes[1, 1].hist2d(df['age'].dropna(), df['fare'].dropna(), bins=30, cmap='Blues')
axes[1, 1].set_xlabel('Age')
axes[1, 1].set_ylabel('Fare')
axes[1, 1].set_title('Age vs Fare - 2D Histogram')
plt.colorbar(axes[1, 1].collections[0], ax=axes[1, 1])

plt.tight_layout()
plt.show()`}
                />

                <CodeBlock 
                  title="Categorical vs Numerical Analysis" 
                  language="python"
                  code={`# Box plots and violin plots - Data analysis for beginners
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Box plot: Fare by Passenger Class
sns.boxplot(x='pclass', y='fare', data=df, ax=axes[0, 0], palette='Set2')
axes[0, 0].set_title('Fare by Passenger Class - Box Plot')

# Violin plot: Age by Survival
sns.violinplot(x='survived', y='age', data=df, ax=axes[0, 1], palette='Set3')
axes[0, 1].set_title('Age by Survival Status - Violin Plot')

# Bar plot with error bars
sns.barplot(x='pclass', y='fare', data=df, ax=axes[1, 0], palette='Blues_d', ci='sd')
axes[1, 0].set_title('Mean Fare by Class (with Std Dev)')

# Strip plot
sns.stripplot(x='pclass', y='age', data=df, ax=axes[1, 1], jitter=True, alpha=0.5)
axes[1, 1].set_title('Age Distribution by Class - Strip Plot')

plt.tight_layout()
plt.show()

# Statistical comparison
print("\\n📊 Mean Fare by Passenger Class:")
print(df.groupby('pclass')['fare'].agg(['mean', 'median', 'std']))`}
                />
              </section>

              {/* Ad Placement */}
              <InArticleAd />

              {/* Section 8: Correlation Analysis */}
              <section id="correlation" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Brain className="h-8 w-8 text-primary" />
                  8. Correlation Analysis - Statistical Analysis Python
                </h2>

                <p className="text-muted-foreground mb-6">
                  Correlation analysis is essential for <strong>EDA for machine learning</strong>. 
                  Understanding variable relationships helps with feature selection and model building.
                </p>

                <CodeBlock 
                  title="Correlation Matrix & Heatmap" 
                  language="python"
                  code={`# Calculate correlation matrix - EDA for datasets
numerical_df = df.select_dtypes(include=[np.number])
correlation_matrix = numerical_df.corr()

print("📊 Correlation Matrix:")
display(correlation_matrix)

# Visualize with heatmap - EDA visualization techniques
plt.figure(figsize=(12, 10))
mask = np.triu(np.ones_like(correlation_matrix, dtype=bool))  # Upper triangle mask

sns.heatmap(
    correlation_matrix,
    mask=mask,
    annot=True,
    fmt='.2f',
    cmap='RdBu_r',
    center=0,
    square=True,
    linewidths=0.5,
    cbar_kws={'shrink': 0.8}
)
plt.title('Correlation Heatmap - EDA Python Tutorial', fontsize=14)
plt.tight_layout()
plt.show()

# Find highly correlated pairs
print("\\n🔗 Highly Correlated Pairs (|r| > 0.5):")
high_corr = []
for i in range(len(correlation_matrix.columns)):
    for j in range(i+1, len(correlation_matrix.columns)):
        if abs(correlation_matrix.iloc[i, j]) > 0.5:
            high_corr.append({
                'Feature 1': correlation_matrix.columns[i],
                'Feature 2': correlation_matrix.columns[j],
                'Correlation': correlation_matrix.iloc[i, j]
            })

pd.DataFrame(high_corr).sort_values('Correlation', key=abs, ascending=False)`}
                />

                <CodeBlock 
                  title="Correlation with Target Variable" 
                  language="python"
                  code={`# Correlation with target - EDA for machine learning
target = 'survived'  # Replace with your target variable

# Get correlations with target
target_corr = correlation_matrix[target].drop(target).sort_values(key=abs, ascending=False)

print(f"\\n🎯 Correlation with Target ({target}):")
print(target_corr)

# Visualize
plt.figure(figsize=(10, 6))
colors = ['green' if x > 0 else 'red' for x in target_corr.values]
target_corr.plot(kind='barh', color=colors)
plt.xlabel('Correlation Coefficient')
plt.title(f'Feature Correlation with {target}')
plt.axvline(x=0, color='black', linestyle='--', linewidth=0.5)
plt.tight_layout()
plt.show()`}
                />
              </section>

              {/* Section 9: Outlier Detection */}
              <section id="outliers" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                  9. Outlier Detection - Data Analysis Pipeline Python
                </h2>

                <p className="text-muted-foreground mb-6">
                  Outlier detection is a critical part of <strong>data preprocessing Python</strong>. 
                  Learn multiple methods for identifying extreme values in your data.
                </p>

                <CodeBlock 
                  title="Outlier Detection Methods" 
                  language="python"
                  code={`# Method 1: IQR Method - EDA best practices
def detect_outliers_iqr(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    return outliers, lower_bound, upper_bound

# Method 2: Z-Score Method
from scipy import stats

def detect_outliers_zscore(df, column, threshold=3):
    z_scores = np.abs(stats.zscore(df[column].dropna()))
    outliers = df[z_scores > threshold]
    return outliers

# Apply outlier detection
column = 'fare'
outliers_iqr, lb, ub = detect_outliers_iqr(df, column)
print(f"\\n📊 Outlier Detection for '{column}':")
print(f"IQR Method: {len(outliers_iqr)} outliers found")
print(f"Lower Bound: {lb:.2f}, Upper Bound: {ub:.2f}")

# Visualize outliers
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Box plot
sns.boxplot(x=df[column], ax=axes[0])
axes[0].set_title(f'{column} - Box Plot (Outliers Visible)')

# Histogram with bounds
axes[1].hist(df[column].dropna(), bins=50, edgecolor='black', alpha=0.7)
axes[1].axvline(lb, color='red', linestyle='--', label=f'Lower Bound: {lb:.2f}')
axes[1].axvline(ub, color='red', linestyle='--', label=f'Upper Bound: {ub:.2f}')
axes[1].legend()
axes[1].set_title(f'{column} Distribution with IQR Bounds')

plt.tight_layout()
plt.show()`}
                />

                <CodeBlock 
                  title="Handling Outliers" 
                  language="python"
                  code={`# Strategy 1: Remove outliers
df_no_outliers = df[(df[column] >= lb) & (df[column] <= ub)]
print(f"Rows before: {len(df)}, After removing outliers: {len(df_no_outliers)}")

# Strategy 2: Cap outliers (Winsorization)
df_capped = df.copy()
df_capped[column] = df_capped[column].clip(lower=lb, upper=ub)

# Strategy 3: Log transformation (for right-skewed data)
df['log_fare'] = np.log1p(df['fare'])

# Strategy 4: Replace with median
median_val = df[column].median()
df_median = df.copy()
df_median.loc[(df_median[column] < lb) | (df_median[column] > ub), column] = median_val

# Compare distributions
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
axes[0, 0].hist(df[column].dropna(), bins=30, edgecolor='black')
axes[0, 0].set_title('Original')

axes[0, 1].hist(df_no_outliers[column].dropna(), bins=30, edgecolor='black')
axes[0, 1].set_title('Outliers Removed')

axes[1, 0].hist(df_capped[column].dropna(), bins=30, edgecolor='black')
axes[1, 0].set_title('Capped (Winsorized)')

axes[1, 1].hist(df['log_fare'].dropna(), bins=30, edgecolor='black')
axes[1, 1].set_title('Log Transformed')

plt.tight_layout()
plt.show()`}
                />
              </section>

              {/* Section 10: EDA Visualizations */}
              <section id="visualizations" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  10. EDA Visualization Techniques
                </h2>

                <p className="text-muted-foreground mb-6">
                  Master <strong>data visualization Python tutorial</strong> techniques for effective data storytelling. 
                  These visualizations are essential for any <strong>EDA notebook Python</strong>.
                </p>

                <CodeBlock 
                  title="Comprehensive Visualization Suite" 
                  language="python"
                  code={`# Pair Plot - Multivariate EDA visualization
# Perfect for exploring relationships between multiple numerical variables
sns.pairplot(df[['age', 'fare', 'pclass', 'survived']].dropna(), 
             hue='survived', 
             palette='Set1',
             diag_kind='kde')
plt.suptitle('Pair Plot - Multiple Variable Relationships', y=1.02)
plt.show()

# FacetGrid for conditional distributions
g = sns.FacetGrid(df, col='pclass', row='sex', hue='survived', height=4)
g.map(plt.hist, 'age', alpha=0.7, bins=20)
g.add_legend()
plt.show()

# Joint Plot - Two variables with marginal distributions
sns.jointplot(x='age', y='fare', data=df, kind='hex', cmap='YlGnBu')
plt.show()

# Categorical plots combined
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

sns.countplot(x='pclass', hue='survived', data=df, ax=axes[0, 0], palette='Set2')
axes[0, 0].set_title('Survival by Passenger Class')

sns.countplot(x='sex', hue='survived', data=df, ax=axes[0, 1], palette='Set2')
axes[0, 1].set_title('Survival by Gender')

# Stacked bar chart
survival_by_class = df.groupby(['pclass', 'survived']).size().unstack()
survival_by_class.plot(kind='bar', stacked=True, ax=axes[1, 0], colormap='RdYlGn')
axes[1, 0].set_title('Survival Distribution by Class')
axes[1, 0].legend(['Died', 'Survived'])

# Age distribution by survival
sns.kdeplot(data=df[df['survived']==0]['age'].dropna(), label='Died', ax=axes[1, 1])
sns.kdeplot(data=df[df['survived']==1]['age'].dropna(), label='Survived', ax=axes[1, 1])
axes[1, 1].set_title('Age Distribution by Survival')
axes[1, 1].legend()

plt.tight_layout()
plt.show()`}
                />
              </section>

              {/* Section 11: Automated EDA */}
              <section id="automated-eda" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Zap className="h-8 w-8 text-primary" />
                  11. Automated EDA Python Tools
                </h2>

                <p className="text-muted-foreground mb-6">
                  <strong>Automated EDA Python</strong> tools save time by generating comprehensive reports automatically. 
                  These tools are perfect for quick <strong>data profiling Python</strong>.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">🔍 Pandas Profiling</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Generates comprehensive HTML reports with statistics, correlations, and warnings.
                      </p>
                      <Badge variant="secondary">Most Popular</Badge>
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">📊 Sweetviz</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Beautiful visualizations and comparison reports for train/test splits.
                      </p>
                      <Badge variant="secondary">Best for Comparisons</Badge>
                    </CardContent>
                  </Card>
                </div>

                <CodeBlock 
                  title="Automated EDA Tools" 
                  language="python"
                  code={`# Method 1: Pandas Profiling (ydata-profiling) - EDA report Python
from ydata_profiling import ProfileReport

# Generate comprehensive report
profile = ProfileReport(
    df,
    title="EDA Report - Titanic Dataset",
    explorative=True,
    dark_mode=True
)

# Save to HTML file
profile.to_file("eda_report.html")

# Display in Jupyter notebook
profile.to_notebook_iframe()

# Method 2: Sweetviz
import sweetviz as sv

# Create report
report = sv.analyze(df)
report.show_html("sweetviz_report.html")

# Compare two datasets (e.g., train vs test)
# report = sv.compare([train_df, "Train"], [test_df, "Test"])

# Method 3: D-Tale (Interactive EDA)
import dtale

# Launch interactive EDA tool
d = dtale.show(df)
# Opens in browser with interactive charts and filters

print("✅ Automated EDA reports generated!")`}
                />
              </section>

              {/* Section 12: Case Study */}
              <section id="case-study" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                  12. EDA Case Study Python - Titanic Dataset
                </h2>

                <p className="text-muted-foreground mb-6">
                  Let's apply everything in a complete <strong>EDA case study Python</strong>. 
                  This <strong>EDA Python project</strong> demonstrates a real-world workflow.
                </p>

                <CollapsibleSection title="Complete Titanic EDA Code" defaultOpen={false} id="titanic-code">
                  <CodeBlock 
                    title="Complete EDA Project Example" 
                    language="python"
                    code={`"""
Complete EDA Tutorial with Code - Titanic Dataset
Author: CodeHubMaster
Date: 2025

This EDA Python examples GitHub-ready notebook demonstrates
a complete exploratory data analysis workflow.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

# Load data
df = sns.load_dataset('titanic')
print("="*60)
print("TITANIC DATASET - COMPLETE EDA GUIDE PYTHON")
print("="*60)

# 1. DATA OVERVIEW
print("\\n📊 STEP 1: DATA OVERVIEW")
print(f"Shape: {df.shape}")
print(f"\\nColumns: {list(df.columns)}")
print(f"\\nData Types:\\n{df.dtypes}")

# 2. MISSING VALUES
print("\\n🔍 STEP 2: MISSING VALUE ANALYSIS")
missing = df.isnull().sum()
missing_pct = (missing / len(df)) * 100
print(f"\\nMissing Values:\\n{missing[missing > 0]}")

# Handle missing values
df['age'].fillna(df['age'].median(), inplace=True)
df['embarked'].fillna(df['embarked'].mode()[0], inplace=True)
df['deck'].fillna('Unknown', inplace=True)

# 3. STATISTICAL SUMMARY
print("\\n📈 STEP 3: STATISTICAL SUMMARY")
print(df.describe())

# 4. TARGET VARIABLE ANALYSIS
print("\\n🎯 STEP 4: TARGET VARIABLE (SURVIVED)")
survival_rate = df['survived'].mean() * 100
print(f"Overall Survival Rate: {survival_rate:.1f}%")

# 5. FEATURE ANALYSIS
print("\\n📋 STEP 5: FEATURE ANALYSIS")

# Categorical features
for col in ['sex', 'pclass', 'embarked']:
    print(f"\\n{col.upper()}:")
    survival_by_cat = df.groupby(col)['survived'].mean() * 100
    print(survival_by_cat)

# 6. CORRELATION ANALYSIS
print("\\n🔗 STEP 6: CORRELATION ANALYSIS")
numerical_cols = df.select_dtypes(include=[np.number]).columns
print(df[numerical_cols].corr()['survived'].sort_values(ascending=False))

# 7. KEY INSIGHTS
print("\\n💡 KEY INSIGHTS:")
print("1. Female passengers had higher survival rate (~74%)")
print("2. First-class passengers survived more (~63%)")
print("3. Children (age < 16) had higher survival rate")
print("4. Passengers with fewer siblings/spouses survived more")

# 8. VISUALIZATION SUMMARY
fig, axes = plt.subplots(2, 3, figsize=(15, 10))

# Survival by Gender
sns.countplot(x='sex', hue='survived', data=df, ax=axes[0, 0], palette='Set2')
axes[0, 0].set_title('Survival by Gender')

# Survival by Class
sns.countplot(x='pclass', hue='survived', data=df, ax=axes[0, 1], palette='Set2')
axes[0, 1].set_title('Survival by Class')

# Age Distribution
sns.histplot(data=df, x='age', hue='survived', kde=True, ax=axes[0, 2])
axes[0, 2].set_title('Age Distribution by Survival')

# Fare Distribution
sns.boxplot(x='survived', y='fare', data=df, ax=axes[1, 0])
axes[1, 0].set_title('Fare by Survival')

# Correlation Heatmap
sns.heatmap(df[numerical_cols].corr(), annot=True, cmap='RdBu_r', ax=axes[1, 1])
axes[1, 1].set_title('Correlation Matrix')

# Survival by Embarked
sns.countplot(x='embarked', hue='survived', data=df, ax=axes[1, 2], palette='Set2')
axes[1, 2].set_title('Survival by Embarkation')

plt.tight_layout()
plt.savefig('titanic_eda_summary.png', dpi=300, bbox_inches='tight')
plt.show()

print("\\n✅ EDA Complete! Report saved as 'titanic_eda_summary.png'")`}
                  />
                </CollapsibleSection>
              </section>

              {/* Ad Placement */}
              <InArticleAd />

              {/* Section 13: Best Practices */}
              <section id="best-practices" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  13. EDA Best Practices
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-lg mb-4 text-green-600">✅ Do This</h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Always start with data overview (shape, types, head)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Document findings as you explore</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Use multiple visualization types</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Check for data leakage in ML projects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Investigate outliers before removing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Create reproducible notebooks</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-lg mb-4 text-red-600">❌ Avoid This</h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Skipping EDA to "save time"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Assuming data is clean without checking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Removing outliers without investigation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Ignoring missing value patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Over-engineering features too early</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>Assuming normal distribution</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Section 14: Common Mistakes */}
              <section id="common-mistakes" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                  14. Common EDA Mistakes to Avoid
                </h2>

                <div className="space-y-4">
                  {[
                    { mistake: "Not checking data types", fix: "Always use df.dtypes and convert types appropriately (e.g., dates, categories)" },
                    { mistake: "Ignoring data distributions", fix: "Visualize every variable's distribution before analysis" },
                    { mistake: "Treating correlation as causation", fix: "Correlation shows relationships, not cause-effect" },
                    { mistake: "Not handling duplicates", fix: "Always check df.duplicated().sum() and handle appropriately" },
                    { mistake: "Overlooking class imbalance", fix: "Check target variable distribution for classification problems" },
                    { mistake: "Not validating data ranges", fix: "Verify values are within expected ranges (e.g., age > 0)" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-border bg-card">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                          <span className="text-red-600 dark:text-red-400 font-bold text-sm">{idx + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 dark:text-red-400">{item.mistake}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            <strong className="text-green-600 dark:text-green-400">Fix:</strong> {item.fix}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 15: FAQ */}
              <section id="faq" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                  15. Frequently Asked Questions (FAQ)
                </h2>

                <p className="text-muted-foreground mb-6">
                  Common questions about <strong>exploratory data analysis Python</strong> answered by experts.
                </p>

                <div className="space-y-4">
                  {faqData.slice(0, 15).map((item, idx) => (
                    <CollapsibleSection key={idx} title={item.question} defaultOpen={idx === 0}>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </CollapsibleSection>
                  ))}
                </div>
              </section>

              {/* Section 16: Resources */}
              <section id="resources" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <ExternalLink className="h-8 w-8 text-primary" />
                  16. Resources & Next Steps
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">📚 Further Learning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• <a href="https://pandas.pydata.org/docs/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pandas Official Documentation</a></li>
                        <li>• <a href="https://seaborn.pydata.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Seaborn Gallery</a></li>
                        <li>• <a href="https://www.kaggle.com/learn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Kaggle Learn Courses</a></li>
                        <li>• <a href="https://github.com/topics/eda-python" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">EDA Python Examples GitHub</a></li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">🎯 Practice Datasets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Titanic (Classification)</li>
                        <li>• Iris (Basic EDA)</li>
                        <li>• Boston Housing (Regression)</li>
                        <li>• Tips (Visualization)</li>
                        <li>• UCI ML Repository datasets</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Related Tutorials */}
                <div className="bg-muted/30 rounded-lg p-6 border border-border">
                  <h3 className="font-semibold text-lg mb-4">📖 Related Tutorials on CodeHubMaster</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link to="/topic/data-science" className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                      <Database className="h-5 w-5 text-primary" />
                      <span>Data Science Tutorials</span>
                    </Link>
                    <Link to="/topic/machine-learning" className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                      <Brain className="h-5 w-5 text-primary" />
                      <span>Machine Learning Guide</span>
                    </Link>
                    <Link to="/topic/python-basics" className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                      <Code2 className="h-5 w-5 text-primary" />
                      <span>Python Basics</span>
                    </Link>
                    <Link to="/ai-tools-for-data-science" className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                      <Zap className="h-5 w-5 text-primary" />
                      <span>AI Tools for Data Science</span>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <section className="mb-12">
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4">🚀 Ready to Practice EDA?</h3>
                      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Ask our AI coding assistant any <strong>Python data analysis</strong> question and get instant, 
                        accurate answers with code examples. Free to try!
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" asChild>
                          <Link to="/ask">
                            <Brain className="mr-2 h-5 w-5" />
                            Ask AI Now - Free
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <Link to="/topic/data-science">
                            <BookOpen className="mr-2 h-5 w-5" />
                            More Data Science Tutorials
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Author & Update Info */}
              <section className="border-t border-border pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                  <div>
                    <p><strong>Author:</strong> CodeHubMaster Team</p>
                    <p><strong>Last Updated:</strong> February 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">Python 3.10+</Badge>
                    <Badge variant="outline">Pandas 2.0</Badge>
                    <Badge variant="outline">Seaborn 0.13</Badge>
                  </div>
                </div>
              </section>

              {/* Topic Tags for SEO */}
              <section className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "exploratory data analysis python",
                    "EDA tutorial",
                    "pandas EDA",
                    "data visualization Python",
                    "Python data analysis",
                    "EDA for machine learning",
                    "data science tutorial",
                    "Python data cleaning",
                    "statistical analysis",
                    "automated EDA"
                  ].map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
