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
