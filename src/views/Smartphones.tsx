import { Filters } from 'containers/filters';
import { MainContent } from 'containers/main-content';
import { ListOfSmartphones } from 'containers/list-of-smartphones';
import { RootLayoutBlock } from 'components/layouts/root';
import { FetchNewData } from 'containers/fetch-new-data';

export const Smartphones = () => {
  return (
    <>
      <RootLayoutBlock>
        <FetchNewData type="smartphones" />
        <Filters />
      </RootLayoutBlock>
      <RootLayoutBlock>
        <MainContent type="smartphones" component={ListOfSmartphones} />
      </RootLayoutBlock>
    </>
  );
};
