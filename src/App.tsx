import { FileMenu } from './components/FileMenu/FileMenu';
import { MenuItemType } from './components/FileMenu/types';

const menuItems: MenuItemType[] = [
  {
    id: '1',
    label: 'Lesson 1: The basics',
    icon: '📄',
    children: [
      {
        id: '1.1',
        label: 'Introduction',
        icon: '📝',
      },
      {
        id: '1.2',
        label: 'Getting Started',
        icon: '📝'
      }
    ]
  },
  {
    id: '2',
    label: 'Lesson 2: Web tools',
    icon: '🌐',
    children: []
  },
  
];

function App() {
  return (
    <div className="App">
      <FileMenu items={menuItems} />
    </div>
  );
}

export default App
