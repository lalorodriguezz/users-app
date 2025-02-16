import config from './postcss.config';

describe('PostCSS Configuration', () => {
  it('should have the correct plugins', () => {
    expect(config).toEqual({
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    });
  });
});