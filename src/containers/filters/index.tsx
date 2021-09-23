import { useDispatch, useSelector } from 'app/hooks';
import { Label } from 'components/Label';
import { Pane } from 'components/Pane';
import { Checkbox } from 'components/Checkbox';
import { actions } from 'containers/main-content/mainContent.slice';
import { selectIsNew, selectIsUsed } from 'containers/main-content/mainContent.selectors';
import { Div } from 'components/Div';

export const Filters = () => {
  const dispatch = useDispatch();
  const isNew = useSelector(selectIsNew);
  const isUsed = useSelector(selectIsUsed);

  return (
    <Pane title="Condition">
      <Div>
        <Checkbox checked={isNew} onChange={(e) => dispatch(actions.toggleIsNew(e.target.checked))} />{' '}
        <Label> New</Label>
      </Div>
      <Div>
        <Checkbox checked={isUsed} onChange={(e) => dispatch(actions.toggleIsUsed(e.target.checked))} />{' '}
        <Label> Used</Label>
      </Div>
    </Pane>
  );
};
