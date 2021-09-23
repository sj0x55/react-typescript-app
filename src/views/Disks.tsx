import { Filters } from 'containers/filters';
import { MainContent } from 'containers/main-content';
import { ListOfDisks } from 'containers/list-of-disks';
import { RootLayoutBlock } from 'components/layouts/root';
import { FiltersOfDisks } from 'containers/filters-of-disks';
import { FetchNewData } from 'containers/fetch-new-data';

export const Disks = () => {
  return (
    <>
      <RootLayoutBlock>
        <FetchNewData type="disks" />
        <Filters />
        <FiltersOfDisks />
      </RootLayoutBlock>
      <RootLayoutBlock>
        <MainContent type="disks" component={ListOfDisks} />
      </RootLayoutBlock>
    </>
  );
};
