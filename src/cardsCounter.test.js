/**
 * @jest-environment jsdom
 */

test('Test item counter', async () => {
  // Create a new element on the page
  const title = document.createElement('div');

  // Mock of getting the information from the API
  const data = [
    {
      name: 'Olu Mel',
    },
    {
      name: '.GIFfany',
    },
    {
      name: '642',
    },
  ];

  // Adding the data into the title
  title.innerHTML = `This page contains ${data.length} characters`;

  // Testing the output
  expect(title.innerHTML).toBe('This page contains 3 characters');
});
