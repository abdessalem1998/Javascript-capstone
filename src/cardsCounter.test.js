/**
 * @jest-environment jsdom
 */

test('Test item counter', () => {
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
  title.innerHTML = `<h1>You can find ${data.length} characters on this page!</h1>`;

  // Testing the output
  expect(title.innerHTML).toBe('<h1>You can find 3 characters on this page!</h1>');
});
