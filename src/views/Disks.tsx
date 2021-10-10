import { Filters } from 'containers/filters';
import { MainContent } from 'containers/main-content';
import { ListOfDisks } from 'containers/list-of-disks';
import { RootLayoutBlock } from 'components/layouts/root';
import { FiltersOfDisks } from 'containers/filters-of-disks';
import { FetchNewData } from 'containers/fetch-new-data';
import { Main } from 'components/dom/Main';
import { Aside } from 'components/dom/Aside';

export const Disks = () => {
  return (
    <>
      <RootLayoutBlock tagType={Aside}>
        <FetchNewData type="disks" />
        <Filters />
        <FiltersOfDisks />
      </RootLayoutBlock>
      <RootLayoutBlock tagType={Main}>
        <MainContent type="disks" component={ListOfDisks} />
      </RootLayoutBlock>
    </>
  );
};
