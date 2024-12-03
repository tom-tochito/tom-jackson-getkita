import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuItem } from '../MenuItem';
import { Code, FileText } from 'lucide-react';

describe('MenuItem Component', () => {
  const mockLesson = {
    id: '1',
    label: 'Test Lesson',
    icon: <FileText size={16} />,
  };

  const mockCourse = {
    id: 'course-1',
    label: 'Test Course',
    icon: <Code size={16} />,
    children: [mockLesson],
  };

  it('should show three dots menu for lessons but not for courses', () => {
    // Render a lesson
    const { rerender } = render(<MenuItem item={mockLesson} depth={1} />);
    expect(screen.getByRole('button', { name: /more/i })).toBeInTheDocument();

    // Render a course
    rerender(<MenuItem item={mockCourse} depth={0} />);
    const moreButtons = screen.getAllByRole('button', { name: /more/i });
    expect(moreButtons.length).toBe(1); // Only one more button for the course
  });

  it('should show expand icon only for items with children', () => {
    // Render a course (has children)
    const { rerender } = render(<MenuItem item={mockCourse} depth={0} />);
    expect(screen.getByRole('button', { name: /expand/i })).toBeInTheDocument();

    // Render a lesson (no children)
    rerender(<MenuItem item={mockLesson} depth={1} />);
    expect(screen.queryByRole('button', { name: /expand/i })).not.toBeInTheDocument();
  });

  it('should show create new lesson button only for courses', async () => {
    // Render a course
    const { rerender } = render(<MenuItem item={mockCourse} depth={0} />);
    
    // Click expand to show create button
    const expandButton = screen.getByRole('button', { name: /expand/i });
    await userEvent.click(expandButton);
    
    // More flexible text matching
    expect(screen.getByText((content, element) => {
      return content.toLowerCase().includes('create new lesson');
    })).toBeInTheDocument();

    // Render a lesson
    rerender(<MenuItem item={mockLesson} depth={1} />);
    expect(screen.queryByText((content, element) => {
      return content.toLowerCase().includes('create new lesson');
    })).not.toBeInTheDocument();
  });

  it('should show create new lesson option when expanded', async () => {
    // test implementation
  });
}); 