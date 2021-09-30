import { render, create, screen } from 'utils/tests';
import { Checkbox } from '.';

const getCheckboxElement = () => {
  return <Checkbox />;
};

it('should render a checkbox', () => {
  render(getCheckboxElement());
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
});

it('should match a snapshot', () => {
  const tree = create(getCheckboxElement());

  expect(tree.toJSON()).toMatchSnapshot();
});
