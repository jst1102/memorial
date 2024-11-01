import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart } from 'lucide-react';

interface Memory {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  likes: number;
}

const MemoryWall: React.FC = () => {
  // Replace with Firebase data
  const memories: Memory[] = [
    {
      id: '1',
      text: "You were always there with a smile and kind word. Your wisdom and grace touched so many lives. We miss you dearly.",
      author: "Sarah Johnson",
      timestamp: new Date('2024-02-15'),
      likes: 12
    }
  ];

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-serif text-center">Shared Memories</h2>
      
      <div className="grid gap-6">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
          >
            <p className="text-lg mb-4">{memory.text}</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div>
                <span className="font-medium text-white">{memory.author}</span>
                <span className="mx-2">•</span>
                <span>{formatDistanceToNow(memory.timestamp)} ago</span>
              </div>
              <button className="flex items-center space-x-1 text-pink-500 hover:text-pink-400 transition">
                <Heart className="w-4 h-4" />
                <span>{memory.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemoryWall;