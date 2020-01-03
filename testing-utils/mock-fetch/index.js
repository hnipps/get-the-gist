const setupMockFetch = mockReturnValue =>
  global.fetch.mockResolvedValue(mockReturnValue);

const mockFetch = global.fetch;

module.exports = {
  setupMockFetch,
  mockFetch
};
