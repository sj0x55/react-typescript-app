import type { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'app/hooks';
import { Label } from 'components/Label';
import { Pane } from 'components/Pane';
import { Checkbox } from 'components/Checkbox';
import { actions } from 'app/slice';
import { selectIsNew, selectIsUsed } from 'app/selectors';
import { Div } from 'components/Div';

export const Filters = () => {
  const dispatch = useDispatch();
  const isNew = useSelector(selectIsNew);
  const isUsed = useSelector(selectIsUsed);
  const handleToggleNew = (event: ChangeEvent<HTMLInputElement>) => dispatch(actions.toggleIsNew(event.target.checked));
  const handleToggleUsed = (event: ChangeEvent<HTMLInputElement>) => dispatch(actions.toggleIsUsed(event.target.checked));

  return (
    <Pane title="Condition">
      <Div>
        <Checkbox checked={isNew} onChange={handleToggleNew} /> <Label> New</Label>
      </Div>
      <Div>
        <Checkbox checked={isUsed} onChange={handleToggleUsed} /> <Label> Used</Label>
      </Div>
    </Pane>
  );
};
