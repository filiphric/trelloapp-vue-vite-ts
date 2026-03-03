import { render } from '@testing-library/react';
import Dropzone from '@/components/Dropzone';

it('shows Dropzone', () => {
  render(<Dropzone card={{ id: 1 } as any} />);
});
