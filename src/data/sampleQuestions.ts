export interface QuestionData {
  id: string;
  title: string;
  body: string;
  topic: string;
  views: number;
  answers: number;
  difficulty: string;
  answer: string;
  codeExample?: string;
}

export const sampleQuestions: QuestionData[] = [
  // Python Basics
  {
    id: "py-1",
    title: "How do I start learning Python for data science?",
    body: "I'm a complete beginner and want to learn Python specifically for data science. What's the best learning path?",
    topic: "python-basics",
    views: 1245,
    answers: 1,
    difficulty: "Beginner",
    answer: "Start with Python fundamentals first:\n\n1. Learn basic syntax, variables, and data types\n2. Master control flow (if/else, loops)\n3. Understand functions and modules\n4. Learn about lists, dictionaries, and tuples\n\nThen move to data science libraries:\n- NumPy for numerical computing\n- Pandas for data manipulation\n- Matplotlib/Seaborn for visualization\n- Scikit-learn for machine learning\n\nRecommended resources:\n- Python.org tutorials\n- DataCamp Python courses\n- Kaggle Learn\n\nPractice is key! Work on small projects and participate in Kaggle competitions.",
    codeExample: `# Example: Basic Python data analysis
import pandas as pd
import numpy as np

# Load data
data = pd.read_csv('data.csv')

# Basic statistics
print(data.describe())

# Filter data
filtered = data[data['age'] > 25]

# Group and aggregate
summary = data.groupby('category')['value'].mean()`
  },
  {
    id: "py-2",
    title: "What are Python list comprehensions?",
    body: "I keep seeing list comprehensions in Python code. What are they and when should I use them?",
    topic: "python-basics",
    views: 892,
    answers: 1,
    difficulty: "Beginner",
    answer: "List comprehensions provide a concise way to create lists in Python. They're faster and more readable than traditional for loops for simple operations.\n\nBasic syntax:\n[expression for item in iterable if condition]\n\nUse cases:\n- Transforming data\n- Filtering lists\n- Creating new lists from existing ones\n\nThey're more Pythonic and often run faster than equivalent for loops.",
    codeExample: `# Traditional approach
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension
squares = [x**2 for x in range(10)]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Nested comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]`
  },
  {
    id: "py-3",
    title: "How to handle exceptions in Python?",
    body: "What's the proper way to handle errors and exceptions in Python code?",
    topic: "python-basics",
    views: 756,
    answers: 1,
    difficulty: "Beginner",
    answer: "Python uses try/except blocks for exception handling:\n\nKey concepts:\n- try: Code that might raise an exception\n- except: Handle specific exceptions\n- else: Runs if no exception occurs\n- finally: Always runs, useful for cleanup\n\nBest practices:\n- Catch specific exceptions, not generic Exception\n- Use multiple except blocks for different errors\n- Log errors for debugging\n- Clean up resources in finally block",
    codeExample: `# Basic exception handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except ValueError as e:
    print(f"Value error: {e}")
else:
    print("Success!")
finally:
    print("Cleanup code here")

# File handling with context manager
try:
    with open('file.txt', 'r') as f:
        data = f.read()
except FileNotFoundError:
    print("File not found!")`
  },
  {
    id: "py-4",
    title: "Python mein Dictionary kaise use kare?",
    body: "Dictionary kya hoti hai aur ise kaise efficiently use kar sakte hain?",
    topic: "python-basics",
    views: 678,
    answers: 1,
    difficulty: "Beginner",
    answer: "Dictionary Python ka key-value pair data structure hai. Ye hash table pe based hai isliye bahut fast hai.\n\nMain features:\n- Keys unique honi chahiye\n- Values kuch bhi ho sakti hain\n- O(1) time mein access\n- Mutable hai (change ho sakti hai)\n\nUse cases:\n- Configuration settings\n- Counting occurrences\n- Caching data\n- JSON data handling",
    codeExample: `# Dictionary creation
student = {
    "name": "Rahul",
    "age": 20,
    "courses": ["Python", "ML", "Data Science"]
}

# Access values
print(student["name"])  # Rahul
print(student.get("email", "Not found"))  # Safe access

# Add/Update
student["email"] = "rahul@example.com"
student["age"] = 21

# Dictionary methods
print(student.keys())    # All keys
print(student.values())  # All values
print(student.items())   # Key-value pairs

# Loop through dictionary
for key, value in student.items():
    print(f"{key}: {value}")

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}`
  },
  {
    id: "py-5",
    title: "Python Functions aur Lambda expressions",
    body: "Functions kaise define karte hain aur lambda expressions kab use karni chahiye?",
    topic: "python-basics",
    views: 823,
    answers: 1,
    difficulty: "Beginner",
    answer: "Functions reusable code blocks hain. Lambda anonymous (bina naam ki) functions hain.\n\nRegular functions:\n- def keyword se define\n- Multiple lines ho sakti hain\n- Documentation add kar sakte hain\n- Complex logic ke liye\n\nLambda functions:\n- Single expression only\n- Anonymous (no name needed)\n- map(), filter(), sort() mein useful\n- Short, one-time operations ke liye",
    codeExample: `# Regular function
def add(a, b):
    """Add two numbers"""
    return a + b

# Function with default args
def greet(name, msg="Hello"):
    return f"{msg}, {name}!"

# *args and **kwargs
def flexible(*args, **kwargs):
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

flexible(1, 2, 3, name="Python", level="Easy")

# Lambda function
square = lambda x: x ** 2
print(square(5))  # 25

# Lambda with map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))

# Lambda with filter
evens = list(filter(lambda x: x % 2 == 0, numbers))

# Lambda with sorted
students = [("Alice", 85), ("Bob", 90), ("Charlie", 75)]
sorted_students = sorted(students, key=lambda x: x[1], reverse=True)`
  },
  {
    id: "py-6",
    title: "Python File Handling complete guide",
    body: "Python mein files kaise read/write karte hain? CSV aur JSON files kaise handle karein?",
    topic: "python-basics",
    views: 945,
    answers: 1,
    difficulty: "Intermediate",
    answer: "Python mein file handling ke liye open() function use hota hai with context manager.\n\nModes:\n- 'r': Read (default)\n- 'w': Write (overwrite)\n- 'a': Append\n- 'rb'/'wb': Binary mode\n\nBest practices:\n- Always use 'with' statement\n- Handle exceptions properly\n- Close files automatically with context manager\n- Use appropriate encoding (utf-8)",
    codeExample: `# Basic file operations
# Read file
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()        # Read all
    # or
    lines = f.readlines()     # List of lines

# Write file
with open('output.txt', 'w') as f:
    f.write("Hello World\\n")
    f.writelines(["Line 1\\n", "Line 2\\n"])

# Append to file
with open('log.txt', 'a') as f:
    f.write("New log entry\\n")

# CSV file handling
import csv

# Read CSV
with open('data.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['name'], row['age'])

# Write CSV
with open('output.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['name', 'age'])
    writer.writeheader()
    writer.writerow({'name': 'Rahul', 'age': 25})

# JSON file handling
import json

# Read JSON
with open('config.json', 'r') as f:
    data = json.load(f)

# Write JSON
with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)`
  },

  // Data Science
  {
    id: "ds-1",
    title: "How to clean missing data in pandas?",
    body: "I have a dataset with lots of missing values. What are the best practices for handling them?",
    topic: "data-science",
    views: 1103,
    answers: 1,
    difficulty: "Intermediate",
    answer: "Several strategies for handling missing data:\n\n1. **Detection**: Use isnull(), isna(), info()\n2. **Removal**: dropna() for rows/columns\n3. **Imputation**:\n   - Mean/median for numerical\n   - Mode for categorical\n   - Forward/backward fill for time series\n   - Advanced: KNN, interpolation\n\nChoice depends on:\n- Amount of missing data\n- Pattern (random vs systematic)\n- Domain knowledge\n- Impact on analysis",
    codeExample: `import pandas as pd
import numpy as np

# Create sample data
df = pd.DataFrame({
    'A': [1, 2, np.nan, 4],
    'B': [5, np.nan, np.nan, 8],
    'C': [9, 10, 11, 12]
})

# Check missing data
print(df.isnull().sum())

# Drop rows with any missing values
clean_df = df.dropna()

# Fill with mean
df['A'].fillna(df['A'].mean(), inplace=True)

# Forward fill
df['B'].fillna(method='ffill', inplace=True)

# Replace with specific value
df.fillna(0, inplace=True)`
  },
  {
    id: "ds-2",
    title: "What's the difference between NumPy and Pandas?",
    body: "Both seem to work with data. When should I use NumPy vs Pandas?",
    topic: "data-science",
    views: 934,
    answers: 1,
    difficulty: "Beginner",
    answer: "NumPy and Pandas serve different purposes:\n\n**NumPy**:\n- Numerical computing\n- Homogeneous arrays (same data type)\n- Fast mathematical operations\n- Foundation for Pandas\n- Use for: matrix operations, scientific computing\n\n**Pandas**:\n- Data manipulation and analysis\n- Heterogeneous data (different types)\n- DataFrame structure (labeled rows/columns)\n- Built on NumPy\n- Use for: data cleaning, analysis, CSV/Excel files\n\nGeneral rule: Use NumPy for numerical arrays, Pandas for structured data.",
    codeExample: `import numpy as np
import pandas as pd

# NumPy - numerical arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])
result = arr * 2  # Vectorized operation

# Pandas - structured data
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Salary': [50000, 60000, 75000]
})

# Data manipulation
df['Bonus'] = df['Salary'] * 0.1
avg_age = df['Age'].mean()
filtered = df[df['Age'] > 28]`
  },
  {
    id: "ds-3",
    title: "Data Visualization with Matplotlib aur Seaborn",
    body: "Python mein professional charts aur graphs kaise banaye?",
    topic: "data-science",
    views: 1087,
    answers: 1,
    difficulty: "Intermediate",
    answer: "Matplotlib basic plotting library hai, Seaborn uske upar statistical visualizations ke liye.\n\nMatplotlib:\n- Low-level control\n- Customizable\n- All chart types\n- Figure aur Axes concept\n\nSeaborn:\n- Beautiful default styles\n- Statistical plots built-in\n- Pandas integration\n- Complex visualizations easy\n\nChoose Seaborn for quick, beautiful plots. Matplotlib for complete customization.",
    codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Matplotlib basics
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Line plot
axes[0, 0].plot([1, 2, 3, 4], [1, 4, 2, 3], marker='o')
axes[0, 0].set_title('Line Plot')

# Bar chart
axes[0, 1].bar(['A', 'B', 'C'], [10, 20, 15], color='skyblue')
axes[0, 1].set_title('Bar Chart')

# Scatter plot
axes[1, 0].scatter(np.random.rand(50), np.random.rand(50), c='red', alpha=0.5)
axes[1, 0].set_title('Scatter Plot')

# Histogram
axes[1, 1].hist(np.random.randn(1000), bins=30, edgecolor='black')
axes[1, 1].set_title('Histogram')

plt.tight_layout()
plt.savefig('charts.png', dpi=300)

# Seaborn examples
df = sns.load_dataset('tips')

# Distribution plot
sns.histplot(data=df, x='total_bill', kde=True)

# Box plot
sns.boxplot(data=df, x='day', y='total_bill', hue='sex')

# Heatmap
correlation = df.corr()
sns.heatmap(correlation, annot=True, cmap='coolwarm')

# Pair plot
sns.pairplot(df, hue='sex')`
  },
  {
    id: "ds-4",
    title: "Pandas Data Manipulation advanced techniques",
    body: "Pandas mein groupby, merge, pivot tables kaise use karte hain?",
    topic: "data-science",
    views: 1234,
    answers: 1,
    difficulty: "Advanced",
    answer: "Pandas powerful data manipulation capabilities provide karta hai:\n\nGroupBy:\n- Data ko groups mein divide karo\n- Aggregate functions apply karo\n- Multiple columns pe group kar sakte ho\n\nMerge/Join:\n- SQL-like joins\n- inner, left, right, outer joins\n- Multiple DataFrames combine karo\n\nPivot Tables:\n- Data reshape karo\n- Summary tables banao\n- Excel pivot table jaisa",
    codeExample: `import pandas as pd

# Sample data
df = pd.DataFrame({
    'Date': pd.date_range('2024-01-01', periods=100),
    'Category': np.random.choice(['A', 'B', 'C'], 100),
    'Region': np.random.choice(['North', 'South', 'East'], 100),
    'Sales': np.random.randint(100, 1000, 100),
    'Quantity': np.random.randint(1, 50, 100)
})

# GroupBy operations
grouped = df.groupby('Category')['Sales'].agg(['sum', 'mean', 'count'])

# Multiple column groupby
multi_group = df.groupby(['Category', 'Region']).agg({
    'Sales': ['sum', 'mean'],
    'Quantity': 'sum'
})

# Merge DataFrames
customers = pd.DataFrame({
    'id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie']
})
orders = pd.DataFrame({
    'customer_id': [1, 2, 1, 3],
    'amount': [100, 200, 150, 300]
})
merged = pd.merge(customers, orders, left_on='id', right_on='customer_id')

# Pivot table
pivot = df.pivot_table(
    values='Sales',
    index='Category',
    columns='Region',
    aggfunc='sum',
    fill_value=0
)

# Crosstab
cross = pd.crosstab(df['Category'], df['Region'], margins=True)`
  },
  {
    id: "ds-5",
    title: "Exploratory Data Analysis (EDA) complete guide",
    body: "Naye dataset ko analyze karne ka systematic approach kya hai?",
    topic: "data-science",
    views: 1456,
    answers: 1,
    difficulty: "Intermediate",
    answer: "EDA data ko samajhne ka first step hai before modeling.\n\nEDA Steps:\n1. Data Loading & Overview\n2. Missing Values Check\n3. Data Types & Statistics\n4. Univariate Analysis\n5. Bivariate Analysis\n6. Correlation Analysis\n7. Outlier Detection\n8. Feature Engineering Ideas\n\nTools: Pandas Profiling, Sweetviz auto-generate EDA reports.",
    codeExample: `import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('dataset.csv')

# 1. Basic Overview
print(df.shape)           # Rows, Columns
print(df.head())          # First 5 rows
print(df.info())          # Data types, non-null counts
print(df.describe())      # Statistics

# 2. Missing Values
missing = df.isnull().sum()
missing_pct = (missing / len(df)) * 100
print(missing_pct[missing_pct > 0])

# 3. Visualize missing data
sns.heatmap(df.isnull(), cbar=True, yticklabels=False)

# 4. Distribution of numerical columns
for col in df.select_dtypes(include=[np.number]).columns:
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))
    df[col].hist(ax=axes[0], bins=30)
    df.boxplot(column=col, ax=axes[1])
    plt.suptitle(f'Distribution of {col}')
    plt.show()

# 5. Correlation matrix
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', center=0)

# 6. Categorical columns
for col in df.select_dtypes(include=['object']).columns:
    print(f"\\n{col}:")
    print(df[col].value_counts())

# 7. Auto EDA with pandas-profiling
from ydata_profiling import ProfileReport
profile = ProfileReport(df, title="EDA Report")
profile.to_file("eda_report.html")`
  },

  // Web Development
  {
    id: "web-1",
    title: "What's the difference between React and vanilla JavaScript?",
    body: "Should I learn React or stick with plain JavaScript? What are the real differences?",
    topic: "web-development",
    views: 1567,
    answers: 1,
    difficulty: "Intermediate",
    answer: "Key differences:\n\n**Vanilla JavaScript**:\n- Direct DOM manipulation\n- Manual event handling\n- More control, more code\n- Good for small projects\n- No build process needed\n\n**React**:\n- Component-based architecture\n- Virtual DOM for performance\n- Declarative UI updates\n- Reusable components\n- Rich ecosystem\n- Better for large applications\n\nRecommendation: Learn JavaScript fundamentals first, then React. React makes complex UIs easier but requires understanding JS basics.",
    codeExample: `// Vanilla JavaScript
const button = document.getElementById('myButton');
let count = 0;

button.addEventListener('click', () => {
  count++;
  document.getElementById('counter').textContent = count;
});

// React
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`
  },
  {
    id: "web-2",
    title: "How does CSS Grid differ from Flexbox?",
    body: "When should I use CSS Grid vs Flexbox for layouts?",
    topic: "web-development",
    views: 1289,
    answers: 1,
    difficulty: "Intermediate",
    answer: "**Flexbox** (1-dimensional):\n- Single row OR column\n- Content-first approach\n- Better for components\n- Navigation bars, card layouts\n- Align items along one axis\n\n**Grid** (2-dimensional):\n- Rows AND columns simultaneously\n- Layout-first approach\n- Better for page layouts\n- Complex responsive designs\n- Full page structure\n\nUse both together: Grid for overall layout, Flexbox for components within grid cells.",
    codeExample: `/* Flexbox - Navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Grid - Page layout */
.container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  gap: 1rem;
  height: 100vh;
}

.header { grid-column: 1 / -1; }
.sidebar { grid-row: 2; }
.main { grid-row: 2; }
.footer { grid-column: 1 / -1; }`
  },
  {
    id: "web-3",
    title: "What are REST API best practices?",
    body: "I'm building my first API. What are the essential best practices I should follow?",
    topic: "web-development",
    views: 1423,
    answers: 1,
    difficulty: "Intermediate",
    answer: "Essential REST API best practices:\n\n1. **Use proper HTTP methods**:\n   - GET: Read data\n   - POST: Create new\n   - PUT/PATCH: Update\n   - DELETE: Remove\n\n2. **Meaningful URLs**:\n   - /users not /getUsers\n   - /users/123 not /users?id=123\n\n3. **Status codes**:\n   - 200: Success\n   - 201: Created\n   - 400: Bad request\n   - 404: Not found\n   - 500: Server error\n\n4. **Versioning**: /api/v1/users\n5. **Authentication**: JWT, OAuth\n6. **Rate limiting**\n7. **Proper error messages**\n8. **Documentation**: Swagger/OpenAPI",
    codeExample: `// Express.js REST API example
const express = require('express');
const app = express();

app.use(express.json());

// GET - Read all users
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Create user
app.post('/api/v1/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT - Update user
app.put('/api/v1/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({ success: true, data: user });
});

// DELETE - Remove user
app.delete('/api/v1/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});`
  },
  {
    id: "web-4",
    title: "React Hooks complete tutorial",
    body: "useState, useEffect, useContext aur custom hooks kaise use karte hain?",
    topic: "web-development",
    views: 1876,
    answers: 1,
    difficulty: "Intermediate",
    answer: "React Hooks functional components mein state aur lifecycle features dete hain.\n\nEssential Hooks:\n- useState: State management\n- useEffect: Side effects (API calls, subscriptions)\n- useContext: Global state access\n- useRef: DOM references, mutable values\n- useMemo: Expensive calculations cache\n- useCallback: Function memoization\n\nCustom hooks logic reuse ke liye perfect hain.",
    codeExample: `import React, { useState, useEffect, useContext, useRef, useMemo, useCallback } from 'react';

// useState
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// useEffect - API call
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }
    fetchUser();
  }, [userId]); // Runs when userId changes

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}

// Custom Hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

// useMemo & useCallback
function ExpensiveComponent({ items, onSelect }) {
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  const handleClick = useCallback((id) => {
    onSelect(id);
  }, [onSelect]);

  return sortedItems.map(item => (
    <div key={item.id} onClick={() => handleClick(item.id)}>
      {item.name}
    </div>
  ));
}`
  },
  {
    id: "web-5",
    title: "Tailwind CSS se responsive design",
    body: "Tailwind CSS use karke mobile-first responsive websites kaise banaye?",
    topic: "web-development",
    views: 1543,
    answers: 1,
    difficulty: "Beginner",
    answer: "Tailwind CSS utility-first framework hai jo rapid UI development enable karta hai.\n\nBreakpoints:\n- sm: 640px+\n- md: 768px+\n- lg: 1024px+\n- xl: 1280px+\n- 2xl: 1536px+\n\nMobile-first approach: Base styles mobile ke liye, breakpoints pe larger screens ke liye.\n\nBenefits:\n- No CSS files needed\n- Consistent design system\n- Smaller bundle size (purge unused)\n- Fast prototyping",
    codeExample: `<!-- Responsive Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h3 class="text-lg md:text-xl font-bold">Card 1</h3>
    <p class="text-gray-600 text-sm md:text-base">Content</p>
  </div>
</div>

<!-- Responsive Navigation -->
<nav class="flex flex-col md:flex-row justify-between items-center p-4">
  <div class="text-2xl font-bold mb-4 md:mb-0">Logo</div>
  <ul class="flex flex-col md:flex-row gap-2 md:gap-6">
    <li><a href="#" class="hover:text-blue-500">Home</a></li>
    <li><a href="#" class="hover:text-blue-500">About</a></li>
    <li><a href="#" class="hover:text-blue-500">Contact</a></li>
  </ul>
</nav>

<!-- Hero Section -->
<section class="min-h-screen flex items-center justify-center 
                bg-gradient-to-r from-purple-500 to-pink-500 
                px-4 md:px-8 lg:px-16">
  <div class="text-center text-white">
    <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
      Welcome
    </h1>
    <p class="text-lg md:text-xl mb-8 max-w-2xl">
      Build beautiful websites faster
    </p>
    <button class="px-6 py-3 md:px-8 md:py-4 
                   bg-white text-purple-600 
                   rounded-full font-semibold
                   hover:bg-opacity-90 transition">
      Get Started
    </button>
  </div>
</section>

<!-- Responsive Table -->
<div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-4 py-3 text-left text-xs md:text-sm">Name</th>
        <th class="px-4 py-3 text-left text-xs md:text-sm hidden md:table-cell">Email</th>
        <th class="px-4 py-3 text-left text-xs md:text-sm">Status</th>
      </tr>
    </thead>
  </table>
</div>`
  },
  {
    id: "web-6",
    title: "TypeScript basics for React developers",
    body: "TypeScript React projects mein kaise use kare? Types aur Interfaces ka fayda kya hai?",
    topic: "web-development",
    views: 1678,
    answers: 1,
    difficulty: "Intermediate",
    answer: "TypeScript JavaScript mein static type checking add karta hai.\n\nBenefits:\n- Compile-time error detection\n- Better IDE support (autocomplete)\n- Self-documenting code\n- Easier refactoring\n- Catch bugs before runtime\n\nReact mein:\n- Props ko type karo\n- State types define karo\n- Event handlers type karo\n- API responses type karo",
    codeExample: `// Basic Types
let name: string = "Rahul";
let age: number = 25;
let isActive: boolean = true;
let items: string[] = ["a", "b", "c"];

// Interface for object shape
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;  // Optional property
}

// Type for union types
type Status = "pending" | "active" | "completed";

// React Component with Props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = "primary",
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
};

// useState with Types
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);

// Event Types
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // submit logic
};

// API Response typing
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch('/api/users');
  return response.json();
}`
  },

  // Machine Learning
  {
    id: "ml-1",
    title: "Best way to learn machine learning algorithms?",
    body: "Machine learning seems overwhelming. What's the best approach to learn ML algorithms effectively?",
    topic: "machine-learning",
    views: 1678,
    answers: 1,
    difficulty: "Advanced",
    answer: "Structured approach to learning ML:\n\n**Foundation (2-3 months)**:\n1. Linear Algebra basics\n2. Statistics & Probability\n3. Python (NumPy, Pandas)\n4. Calculus fundamentals\n\n**Core Algorithms**:\n1. Supervised: Linear/Logistic Regression, Decision Trees, SVM\n2. Unsupervised: K-Means, PCA, DBSCAN\n3. Neural Networks: Basics to Deep Learning\n\n**Learning Path**:\n- Theory: Understand math behind algorithms\n- Implementation: Code from scratch\n- Practice: Use scikit-learn, TensorFlow\n- Projects: Kaggle competitions\n\nResources:\n- Andrew Ng's ML course\n- Fast.ai\n- Kaggle Learn",
    codeExample: `# Simple Linear Regression from scratch
import numpy as np

class LinearRegression:
    def __init__(self, learning_rate=0.01, iterations=1000):
        self.lr = learning_rate
        self.iterations = iterations
        self.weights = None
        self.bias = None
    
    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0
        
        # Gradient descent
        for _ in range(self.iterations):
            y_pred = np.dot(X, self.weights) + self.bias
            
            # Compute gradients
            dw = (1/n_samples) * np.dot(X.T, (y_pred - y))
            db = (1/n_samples) * np.sum(y_pred - y)
            
            # Update parameters
            self.weights -= self.lr * dw
            self.bias -= self.lr * db
    
    def predict(self, X):
        return np.dot(X, self.weights) + self.bias

# Using scikit-learn
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)`
  },
  {
    id: "ml-2",
    title: "What is overfitting and how to prevent it?",
    body: "My model performs great on training data but poorly on test data. What's happening?",
    topic: "machine-learning",
    views: 1345,
    answers: 1,
    difficulty: "Intermediate",
    answer: "You're experiencing **overfitting** - when your model memorizes training data instead of learning patterns.\n\n**Signs of overfitting**:\n- High training accuracy, low test accuracy\n- Model too complex for data\n- Too many features\n\n**Prevention strategies**:\n1. **More data**: Best solution\n2. **Cross-validation**: K-fold validation\n3. **Regularization**: L1, L2 penalties\n4. **Simplify model**: Fewer parameters\n5. **Feature selection**: Remove irrelevant features\n6. **Early stopping**: Stop training when validation error increases\n7. **Dropout**: For neural networks\n8. **Data augmentation**: Create variations\n\n**Validation curve**: Plot training vs validation error to detect overfitting.",
    codeExample: `from sklearn.model_selection import cross_val_score, learning_curve
from sklearn.linear_model import Ridge, Lasso
import matplotlib.pyplot as plt

# 1. Cross-validation
scores = cross_val_score(model, X, y, cv=5)
print(f"CV Scores: {scores.mean()} (+/- {scores.std()})")

# 2. Regularization (L2)
ridge_model = Ridge(alpha=1.0)  # alpha controls regularization
ridge_model.fit(X_train, y_train)

# 3. Lasso (L1) - also does feature selection
lasso_model = Lasso(alpha=0.1)
lasso_model.fit(X_train, y_train)

# 4. Learning curves to detect overfitting
train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, 
    train_sizes=np.linspace(0.1, 1.0, 10)
)

plt.plot(train_sizes, train_scores.mean(axis=1), label='Training')
plt.plot(train_sizes, val_scores.mean(axis=1), label='Validation')
plt.legend()
plt.show()

# 5. Early stopping (for neural networks)
from tensorflow.keras.callbacks import EarlyStopping

early_stop = EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True
)

model.fit(X_train, y_train, 
          validation_split=0.2,
          callbacks=[early_stop])`
  },
  {
    id: "ml-3",
    title: "Neural Networks aur Deep Learning basics",
    body: "Neural networks kaise kaam karte hain? Deep learning kab use karni chahiye?",
    topic: "machine-learning",
    views: 1567,
    answers: 1,
    difficulty: "Advanced",
    answer: "Neural networks brain neurons se inspired computing systems hain.\n\nBasic components:\n- Input layer: Data receive karta hai\n- Hidden layers: Features learn karte hain\n- Output layer: Predictions deta hai\n- Weights & Biases: Learnable parameters\n- Activation functions: Non-linearity add karte hain\n\nDeep Learning:\n- Multiple hidden layers\n- Complex patterns learn\n- Large data pe best results\n- Image, text, speech ke liye ideal\n\nUse when: Large data, complex patterns, unstructured data (images, text)",
    codeExample: `import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Simple Neural Network
model = keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=(784,)),
    layers.Dropout(0.2),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train model
history = model.fit(
    X_train, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.2
)

# CNN for Image Classification
cnn_model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

# Plot training history
import matplotlib.pyplot as plt

plt.plot(history.history['accuracy'], label='Training')
plt.plot(history.history['val_accuracy'], label='Validation')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.show()`
  },
  {
    id: "ml-4",
    title: "Model Evaluation Metrics kaise samjhe?",
    body: "Accuracy, Precision, Recall, F1-Score mein kya difference hai? Kab kaunsa use kare?",
    topic: "machine-learning",
    views: 1234,
    answers: 1,
    difficulty: "Intermediate",
    answer: "Different metrics different scenarios ke liye important hain.\n\nAccuracy: Overall correct predictions / Total predictions\n- Use when: Balanced classes\n- Problem: Misleading for imbalanced data\n\nPrecision: True Positives / (True + False Positives)\n- Use when: False positives costly hain (spam detection)\n\nRecall: True Positives / (True + False Negatives)\n- Use when: False negatives costly hain (disease detection)\n\nF1-Score: Harmonic mean of Precision & Recall\n- Use when: Need balance between Precision & Recall\n\nAUC-ROC: Area under ROC curve\n- Use for: Binary classification threshold selection",
    codeExample: `from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, 
    f1_score, confusion_matrix, classification_report,
    roc_auc_score, roc_curve
)
import matplotlib.pyplot as plt
import seaborn as sns

# Predictions
y_pred = model.predict(X_test)

# All metrics at once
print(classification_report(y_test, y_pred))

# Individual metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

print(f"Accuracy: {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1-Score: {f1:.4f}")

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()

# ROC Curve (binary classification)
y_prob = model.predict_proba(X_test)[:, 1]
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
auc = roc_auc_score(y_test, y_prob)

plt.plot(fpr, tpr, label=f'ROC Curve (AUC = {auc:.2f})')
plt.plot([0, 1], [0, 1], 'k--')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend()
plt.show()`
  },
  {
    id: "ml-5",
    title: "Feature Engineering techniques for better models",
    body: "Features kaise create aur transform kare better ML models ke liye?",
    topic: "machine-learning",
    views: 1123,
    answers: 1,
    difficulty: "Advanced",
    answer: "Feature Engineering ML ka most important step hai.\n\nTechniques:\n1. Missing value handling\n2. Encoding categorical variables\n3. Scaling numerical features\n4. Feature creation (domain knowledge)\n5. Polynomial features\n6. Binning/Discretization\n7. Feature selection\n\nGood features > Complex models\nDomain knowledge is key!",
    codeExample: `import pandas as pd
import numpy as np
from sklearn.preprocessing import (
    StandardScaler, MinMaxScaler, LabelEncoder,
    OneHotEncoder, PolynomialFeatures
)
from sklearn.feature_selection import SelectKBest, f_classif

# 1. Encoding Categorical Variables
# Label Encoding (ordinal)
le = LabelEncoder()
df['category_encoded'] = le.fit_transform(df['category'])

# One-Hot Encoding (nominal)
df_encoded = pd.get_dummies(df, columns=['category'], prefix='cat')

# 2. Scaling
scaler = StandardScaler()  # Mean=0, Std=1
df['scaled_feature'] = scaler.fit_transform(df[['feature']])

minmax = MinMaxScaler()  # Range [0, 1]
df['normalized'] = minmax.fit_transform(df[['feature']])

# 3. Feature Creation
# Date features
df['date'] = pd.to_datetime(df['date'])
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek
df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)

# Interaction features
df['feature_interaction'] = df['feature1'] * df['feature2']

# Binning
df['age_group'] = pd.cut(df['age'], bins=[0, 18, 35, 50, 100],
                         labels=['Child', 'Young', 'Middle', 'Senior'])

# 4. Polynomial Features
poly = PolynomialFeatures(degree=2, include_bias=False)
poly_features = poly.fit_transform(X)

# 5. Feature Selection
selector = SelectKBest(f_classif, k=10)
X_selected = selector.fit_transform(X, y)
selected_features = X.columns[selector.get_support()]`
  },

  // DevOps Basics
  {
    id: "devops-1",
    title: "What is Git and how do I start using it?",
    body: "I'm new to version control. Can you explain Git basics and essential commands?",
    topic: "devops-basics",
    views: 987,
    answers: 1,
    difficulty: "Beginner",
    answer: "Git ek distributed version control system hai jo code changes track karta hai.\n\nBasic Git concepts:\n1. Repository (repo) - Project folder jisme .git folder hota hai\n2. Commit - Code changes ka snapshot\n3. Branch - Separate development line\n4. Remote - GitHub/GitLab par online repo\n\nEssential commands:\n- git init - Naya repo banaye\n- git add - Files staging area mein add kare\n- git commit - Changes save kare\n- git push - Remote repo par upload kare\n- git pull - Remote se latest changes download kare",
    codeExample: `# Git setup
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Initialize repository
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Daily workflow
git pull origin main
git add file.txt
git commit -m "Update file"
git push origin main`
  },
  {
    id: "devops-2",
    title: "How to create and use Docker containers?",
    body: "What is Docker and how can I containerize my application?",
    topic: "devops-basics",
    views: 1156,
    answers: 1,
    difficulty: "Intermediate",
    answer: "Docker lightweight containers banata hai jo applications ko isolated environment mein run karte hain.\n\nKey components:\n1. Dockerfile - Container build karne ki recipe\n2. Image - Application ka template\n3. Container - Running instance of image\n4. Docker Hub - Public image registry\n\nBenefits:\n- Consistent environment across systems\n- Easy deployment\n- Resource efficient\n- Scalable architecture",
    codeExample: `# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# Build and run
docker build -t myapp .
docker run -p 3000:3000 myapp

# Docker Compose (docker-compose.yml)
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret`
  },
  {
    id: "devops-3",
    title: "What is CI/CD and how to set it up?",
    body: "Can you explain Continuous Integration and Continuous Deployment with an example?",
    topic: "devops-basics",
    views: 834,
    answers: 1,
    difficulty: "Intermediate",
    answer: "CI/CD automated pipeline hai jo code testing aur deployment automatically karta hai.\n\nCI (Continuous Integration):\n- Code changes automatically test hote hain\n- Bugs jaldi detect ho jate hain\n- Team collaboration improve hoti hai\n\nCD (Continuous Deployment):\n- Tested code automatically production par deploy hota hai\n- Faster releases\n- Reduced manual errors\n\nPopular tools: GitHub Actions, GitLab CI, Jenkins, CircleCI",
    codeExample: `# .github/workflows/deploy.yml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: |
          echo "Deploying to production..."
          # Your deployment script here`
  }
];

export const getQuestionsByTopic = (topic: string): QuestionData[] => {
  return sampleQuestions.filter(q => q.topic === topic);
};

export const getQuestionById = (id: string): QuestionData | undefined => {
  return sampleQuestions.find(q => q.id === id);
};

export const getAllTopics = () => {
  const topics = [...new Set(sampleQuestions.map(q => q.topic))];
  return topics;
};
