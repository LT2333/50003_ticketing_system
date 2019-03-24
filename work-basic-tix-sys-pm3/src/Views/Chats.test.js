test("render correctly Chats component", () => {
  const chat = renderer.create(<Chats />).toJSON();
  expect(chat).toMatchSnapshot();
});
