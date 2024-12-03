import { FileMenu } from './components/FileMenu/FileMenu';
import { MenuItemType } from './components/FileMenu/types';
import { FileText, Globe, Code, BookOpen } from 'lucide-react';

const menuItems: MenuItemType[] = [
  {
    id: 'python',
    label: 'Python Basics',
    icon: <Code size={16} />,
    children: [
      {
        id: 'python-1',
        label: 'Lesson 1: The basics',
        icon: <FileText size={16} />,
      },
      {
        id: 'python-2',
        label: 'Lesson 2: Web tools',
        icon: <Globe size={16} />,
      },
      {
        id: 'python-3',
        label: 'Lesson 3: Morse Code',
        icon: <FileText size={16} />,
      },
      {
        id: 'python-4',
        label: 'Lesson 4: Open Source',
        icon: <FileText size={16} />,
      },
      {
        id: 'python-5',
        label: 'Lesson 5: HTML syntax',
        icon: <FileText size={16} />,
      },
      {
        id: 'python-6',
        label: 'Lesson 6: Basic structure',
        icon: <FileText size={16} />,
      },
      {
        id: 'python-7',
        label: 'Lesson 7: CodePen',
        icon: <FileText size={16} />,
      },
      {
        id: 'python-8',
        label: 'Lesson 8: Script tags',
        icon: <FileText size={16} />,
      }
    ]
  },
  {
    id: 'javascript',
    label: 'JavaScript Basics',
    icon: <Code size={16} />,
    children: [
      {
        id: 'js-1',
        label: 'Lesson 1: Introduction',
        icon: <FileText size={16} />,
      },
      {
        id: 'js-2',
        label: 'Lesson 2: Variables',
        icon: <FileText size={16} />,
      },
      {
        id: 'js-3',
        label: 'Lesson 3: Functions',
        icon: <FileText size={16} />,
      },
      {
        id: 'js-4',
        label: 'Lesson 4: Arrays',
        icon: <FileText size={16} />,
      }
    ]
  }
];

function App() {
  return (
    <div className="App">
      <FileMenu items={menuItems} />
    </div>
  );
}

export default App
