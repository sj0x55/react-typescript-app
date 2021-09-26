import { useCallback } from 'react';
import { useSelector, useDispatch } from 'app/hooks';
import { isLoading } from 'app/selectors';
import { fetchDataAsync } from 'app/slice';
import { Pane } from 'components/Pane';
import { Button } from 'components/Button';

export const FetchNewData = ({ type }: FetchNewDataProps) => {
  const dispatch = useDispatch();
  const isLoadingFlag = useSelector(isLoading);
  const onClickButton = useCallback(() => {
    if (!isLoadingFlag) {
      dispatch(fetchDataAsync(['PUT', type]));
    }
  }, [dispatch, type, isLoadingFlag]);

  return (
    <Pane border={false} padding={false} background={false}>
      <Button onClick={onClickButton} disabled={isLoadingFlag} stretch={true}>
        Fetch new data
      </Button>
    </Pane>
  );
};
