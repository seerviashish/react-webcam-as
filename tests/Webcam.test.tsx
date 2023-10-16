import renderer from 'react-test-renderer';
import { expect, it, vi } from 'vitest';
import { Webcam } from '../src';

it('render webcam correctly', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnChange = vi.fn().mockImplementation((data) => 0);
  const tree = renderer
    .create(
      <Webcam
        accept="image/*"
        label="Camera"
        onChange={handleOnChange}
        style={{ button: { textTransform: 'none' } }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
