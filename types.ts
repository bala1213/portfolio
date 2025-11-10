import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
}

export interface Skill {
  name: string;
  // FIX: JSX.Element type requires React to be in scope.
  icon: JSX.Element;
}
