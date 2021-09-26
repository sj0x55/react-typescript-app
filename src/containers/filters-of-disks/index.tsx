import { get } from 'lodash';
import { useDispatch, useSelector } from 'app/hooks';
import { actions } from 'app/slice';
import { selectProductFilters } from 'app/selectors';
import { Label } from 'components/Label';
import { Pane } from 'components/Pane';
import { Div } from 'components/Div';
import { NumberInput } from 'components/inputs';

export const FiltersOfDisks = () => {
  const dispatch = useDispatch();
  const diskFilters = useSelector(selectProductFilters('disks'));
  const capacityMin = get(diskFilters, 'capacity.min');
  const capacityMax = get(diskFilters, 'capacity.max');
  const updateFilterCapacity = (key: string, value: string) => {
    dispatch(
      actions.updateProductFilter({
        type: 'disks',
        property: `capacity.${key}`,
        value: Number(value),
      }),
    );
  };

  return (
    <Pane title="Capacity">
      <Div>
        <NumberInput value={`${capacityMin || ''}`} onChange={(e) => updateFilterCapacity('min', e.target.value)} />
        <Label> min</Label>
      </Div>
      <Div>
        <NumberInput value={`${capacityMax || ''}`} onChange={(e) => updateFilterCapacity('max', e.target.value)} />
        <Label> max</Label>
      </Div>
    </Pane>
  );
};
