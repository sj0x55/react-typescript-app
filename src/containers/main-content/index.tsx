import { ElementType, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'app/hooks';
import { Loading } from 'components/Loading';
import { ContentLayoutGrid } from 'components/layouts/content';
import { Text } from 'components/Text';
import { filterData } from './mainContent.operations';
import { fetchDataAsync } from './mainContent.slice';
import { isLoading, selectData, selectIsNew, selectIsUsed } from './mainContent.selectors';
import { actions } from './mainContent.slice';
import { Pane } from 'components/Pane';
import { Timer } from 'components/Timer';
import { Spinner } from 'components/Spinner';

type MainContentProps = {
  type: string;
  component: ElementType;
};

export const MainContent = ({ type, component }: MainContentProps) => {
  const TimerDuration = 30;
  const ContentComponent = component;
  const dispatch = useDispatch();
  const isLoadingFlag = useSelector(isLoading);
  const data = useSelector(selectData).filter(
    filterData({
      isNew: useSelector(selectIsNew),
      isUsed: useSelector(selectIsUsed),
    }),
  );
  const dispatchWrapper = useCallback(() => {
    console.log('Use dispatchWrapper()');
    dispatch(fetchDataAsync(['GET', type]));
  }, [dispatch, type]);

  useEffect(() => {
    dispatch(actions.cleanData());
    dispatchWrapper();
  }, [dispatchWrapper, dispatch]);

  return (
    <>
      <Pane align="right">
        {isLoadingFlag && <Spinner />}
        <Text size="s">
          <Text bold={true}>Next refresh in: </Text> <Timer duration={TimerDuration} cb={dispatchWrapper} />
          s.
        </Text>
      </Pane>

      {isLoadingFlag && !data.length ? (
        <Loading />
      ) : data.length > 0 ? (
        <ContentLayoutGrid>
          <ContentComponent data={data} />
        </ContentLayoutGrid>
      ) : (
        <Text>No data!</Text>
      )}
    </>
  );
};