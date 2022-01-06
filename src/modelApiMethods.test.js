import { commentCounter } from './modelApiMethods';

describe('Testing commentCounter method', () => {
  test('case of empty array response', () => {
    // Arrange
    const arr = [];

    // Act
    const result = commentCounter(arr);

    // Assert
    expect(result).toBe(0);
  });

  test('case of non-empty array response', () => {
    // Arrange
    const arr = [
      {
        likes: 5,
        item_id: 'item1',
      },
      {
        likes: 3,
        item_id: 'item2',
      },
    ];

    // Act
    const result = commentCounter(arr);

    // Assert
    expect(result).toBe(2);
  });
});
