import { get } from 'lodash';
import { useDispatch, useSelector } from 'app/hooks';
import { actions } from 'app/slice';
import { selectProductFilters } from 'app/selectors';
import { Label } from 'components/Label';
import { Pane } from 'components/Pane';
import { Div } from 'components/Div';
import { NumberInput } from 'components/inputs';
import styled from 'styled-components';

const DivWrapper = styled(Div)`
  margin-bottom: 5px;
`;

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
      <DivWrapper>
        <NumberInput
          value={`${capacityMin || ''}`}
          placeholder="min"
          onChange={(e) => updateFilterCapacity('min', e.target.value)}
        />
        <Label> min</Label>
      </DivWrapper>
      <DivWrapper>
        <NumberInput
          value={`${capacityMax || ''}`}
          placeholder="max"
          onChange={(e) => updateFilterCapacity('max', e.target.value)}
        />
        <Label> max</Label>
      </DivWrapper>
    </Pane>
  );
};
