import { Filters } from 'containers/filters';
import { MainContent } from 'containers/main-content';
import { ListOfSomething } from 'containers/list-of-something';
import { RootLayoutBlock } from 'components/layouts/root';
import { FetchNewData } from 'containers/fetch-new-data';

export const Something = () => {
  return (
    <>
      <RootLayoutBlock>
        <FetchNewData type="something" />
        <Filters />
      </RootLayoutBlock>
      <RootLayoutBlock>
        <MainContent type="something" component={ListOfSomething} />
      </RootLayoutBlock>
    </>
  );
};
