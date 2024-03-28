import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import AlgorithmSelection from './components/Game/AlgorithmSelection/AlgorithmSelection';
import DataStructureSelection from './components/Game/DataStructureSelection/DataStructureSelection';
import Game from './components/Game/Game';
import './App.css';

interface AlgorithmDataStructureMap {
  [key: string]: string[];
}

const App: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [selectedDataStructure, setSelectedDataStructure] = useState('');
  const [codeText, setCodeText] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const algorithmDataStructureMap: AlgorithmDataStructureMap = {
    'Quick Sort': ['Array', 'Linked List'],
    'Merge Sort': ['Array'],
    'Binary Search': ['Array', 'Binary Search Tree'],
    'Breath-first Seach': ['Graph', 'Binary Tree'],
    'Depth-first Search': ['Graph', 'Binary Tree'],
    'Kruskal\'s Algorithm': ['Graph'],
    'Prim\'s Algorithm': ['Graph'],
    'Dijkstra\'s Algorithm': ['Graph'],
    'Bellman-Ford Algorithm': ['Graph'],
  };

  const handleAlgorithmSelect = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
    setSelectedDataStructure('');
    setCodeText('');
  };

  const handleDataStructureSelect = (dataStructure: string) => {
    setSelectedDataStructure(dataStructure);
    // Generate the challenge code based on the selected algorithm and data structure
    const code = generatecodeText(selectedAlgorithm, dataStructure, selectedLanguage);
    setCodeText(code);
  };

  const handleTypingComplete = (speed: number) => {
    // Handle the completion of the typing challenge
    console.log(`Typing speed: ${speed} characters per second`);
    // You can display the result, store it, or perform any other desired action
  };

  const generatecodeText = (algorithm: string, dataStructure: string, selectedLanguage: string) => {
    const codeSnippets: { [key: string]: string } = {
      'Quick Sort + Array': 
`int partition(std::vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;

  for (int j = low; j < high; j++) {
      if (arr[j] <= pivot) {
          i++;
          std::swap(arr[i], arr[j]);
      }
  }

  std::swap(arr[i + 1], arr[high]);
  return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
  if (low < high) {
      int pivotIndex = partition(arr, low, high);
      quickSort(arr, low, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, high);
  }
}

void printArray(const std::vector<int>& arr) {
  for (int num : arr) {
      std::cout << num << " ";
  }
  std::cout << std::endl;
}`,
      'Merge Sort + Array': 
`void merge(std::vector<int>& arr, int left, int middle, int right) {
  int n1 = middle - left + 1;
  int n2 = right - middle;

  std::vector<int> leftArr(n1);
  std::vector<int> rightArr(n2);

  for (int i = 0; i < n1; i++) {
      leftArr[i] = arr[left + i];
  }
  for (int j = 0; j < n2; j++) {
      rightArr[j] = arr[middle + 1 + j];
  }

  int i = 0, j = 0, k = left;

  while (i < n1 && j < n2) {
      if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
      } else {
          arr[k] = rightArr[j];
          j++;
      }
      k++;
  }

  while (i < n1) {
      arr[k] = leftArr[i];
      i++;
      k++;
  }

  while (j < n2) {
      arr[k] = rightArr[j];
      j++;
      k++;
  }
}

void mergeSort(std::vector<int>& arr, int left, int right) {
  if (left < right) {
      int middle = left + (right - left) / 2;
      mergeSort(arr, left, middle);
      mergeSort(arr, middle + 1, right);
      merge(arr, left, middle, right);
  }
}`,
      'Binary Search + Array': 
`int binarySearch(const std::vector<int>& arr, int target) {
  int left = 0;
  int right = arr.size() - 1;

  while (left <= right) {
      int mid = left + (right - left) / 2;

      if (arr[mid] == target) {
          return mid;
      } else if (arr[mid] < target) {
          left = mid + 1;
      } else {
          right = mid - 1;
      }
  }

  return -1;
}`,
      'Binary Search + Binary Search Tree': 
`struct Node {
  int data;
  Node* left;
  Node* right;

  Node(int value) : data(value), left(nullptr), right(nullptr) {}
};

bool binarySearch(Node* root, int target) {
  if (root == nullptr) {
      return false;
  }

  if (root->data == target) {
      return true;
  } else if (target < root->data) {
      return binarySearch(root->left, target);
  } else {
      return binarySearch(root->right, target);
  }
}`,
      'Breath-first Seach + Graph':
`void bfs(std::vector<std::vector<int>>& graph, int start) {
  std::vector<bool> visited(graph.size(), false);
  std::queue<int> q;
  q.push(start);
  visited[start] = true;

  while (!q.empty()) {
      int node = q.front();
      q.pop();
      std::cout << node << " ";

      for (int neighbor : graph[node]) {
          if (!visited[neighbor]) {
              q.push(neighbor);
              visited[neighbor] = true;
          }
      }
  }
}`,
      'Breath-first Seach + Binary Tree':
`struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
};

void bfs(TreeNode* root) {
  if (root == nullptr) {
      return;
  }

  std::queue<TreeNode*> q;
  q.push(root);

  while (!q.empty()) {
      TreeNode* node = q.front();
      q.pop();
      std::cout << node->val << " ";

      if (node->left != nullptr) {
          q.push(node->left);
      }
      if (node->right != nullptr) {
          q.push(node->right);
      }
  }
}`,
      'Depth-first Search + Graph': 
`class Graph {
  private:
      int numVertices;
      std::vector<std::vector<int>> adjList;
      std::vector<bool> visited;
  
  public:
      Graph(int vertices) {
          numVertices = vertices;
          adjList.resize(vertices);
          visited.resize(vertices, false);
      }
  
      void addEdge(int src, int dest) {
          adjList[src].push_back(dest);
          adjList[dest].push_back(src);
      }
  
      void DFS(int startVertex) {
          std::stack<int> stack;
          stack.push(startVertex);
          visited[startVertex] = true;
  
          while (!stack.empty()) {
              int currentVertex = stack.top();
              stack.pop();
              std::cout << "Visited vertex: " << currentVertex << std::endl;
  
              for (int neighbor : adjList[currentVertex]) {
                  if (!visited[neighbor]) {
                      stack.push(neighbor);
                      visited[neighbor] = true;
                  }
              }
          }
      }
  };`,
      'Depth-first Search + Binary Tree': 
`struct Node {
  int data;
  Node* left;
  Node* right;

  Node(int value) : data(value), left(nullptr), right(nullptr) {}
};

void DFS(Node* root) {
  if (root == nullptr)
      return;

  std::stack<Node*> stack;
  stack.push(root);

  while (!stack.empty()) {
      Node* current = stack.top();
      stack.pop();

      std::cout << "Visited node: " << current->data << std::endl;

      if (current->right)
          stack.push(current->right);
      if (current->left)
          stack.push(current->left);
  }
}`,
      'Kruskal\'s Algorithm + Graph':``,
    };
    const key = `${algorithm} + ${dataStructure}`;
    return codeSnippets[key] || '';
  };

  const getCompatibleDataStructures = (algorithm: string) => {
    return algorithmDataStructureMap[algorithm] || [];
  };

  return (
    <div className="app">
      <Navbar selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      <AlgorithmSelection
        algorithms={Object.keys(algorithmDataStructureMap)}
        onSelect={handleAlgorithmSelect}
      />
      {selectedAlgorithm && (
        <DataStructureSelection
          dataStructures={getCompatibleDataStructures(selectedAlgorithm)}
          onSelect={handleDataStructureSelect}
        />
      )}
      {codeText && (
        <Game code={codeText} onComplete={handleTypingComplete} />
      )}
    </div>
  );
};

export default App;