import { Filters } from 'containers/filters';
import { MainContent } from 'containers/main-content';
import { RootLayoutBlock } from 'components/layouts/root';
import { FetchNewData } from 'containers/fetch-new-data';
import { DynamicList } from 'containers/dynamic-list'; // Work in progress.

export const Dynamic = () => {
  return (
    <>
      <RootLayoutBlock>
        <FetchNewData type="disks" />
        <Filters />
      </RootLayoutBlock>
      <RootLayoutBlock>
        <MainContent type="disks" component={DynamicList} />
      </RootLayoutBlock>
    </>
  );
};
