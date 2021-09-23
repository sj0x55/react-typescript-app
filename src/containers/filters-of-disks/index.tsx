import { useDispatch, useSelector } from 'app/hooks';
import { Label } from 'components/Label';
import { Pane } from 'components/Pane';
import { Div } from 'components/Div';
import { NumberInput } from 'components/inputs';
import { actions } from 'containers/list-of-disks/listOfDisks.slice';
import { selectCapacityMin, selectCapacityMax } from 'containers/list-of-disks/listOfDisks.selectors';

export const FiltersOfDisks = () => {
  const dispatch = useDispatch();
  const capacityMin = useSelector(selectCapacityMin);
  const capacityMax = useSelector(selectCapacityMax);

  return (
    <Pane title="Capacity">
      <Div>
        <NumberInput
          value={`${capacityMin || ''}`}
          onChange={(e) => dispatch(actions.updateCapacityMin(Number(e.target.value)))}
        />
        <Label> min</Label>
      </Div>
      <Div>
        <NumberInput
          value={`${capacityMax || ''}`}
          onChange={(e) => dispatch(actions.updateCapacityMax(Number(e.target.value)))}
        />
        <Label> max</Label>
      </Div>
    </Pane>
  );
};

/*  */
