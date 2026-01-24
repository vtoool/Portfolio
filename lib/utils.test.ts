import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('combines class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const condition = true;
    expect(cn('class1', condition && 'class2')).toBe('class1 class2');
    expect(cn('class1', condition && 'class2', condition && 'class3')).toBe('class1 class2 class3');
  });

  it('filters out falsy values', () => {
    expect(cn('class1', false && 'class2', undefined, 'class3')).toBe('class1 class3');
  });
});