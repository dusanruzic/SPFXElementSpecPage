import * as React from 'react';
import SharePointService from '../../../services/SharePoint/SharePointService';

import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
  itemId: number;
  
}

export interface IDocument {
  key: string;
  Title: string;
  modifiedBy: string;
  dateModified: string;
  ElSpecStatus: string;
  VersionLabel: string;
  Modified: string;
  Editor: any;
}
export  class Workflow extends React.Component<{}, IDetailsListDocumentsExampleState> {
  private _selection: Selection;
  

  constructor(props: {}) {
    super(props);
   
    
    this._getSelectionDetails = this._getSelectionDetails.bind(this);

    const columns: IColumn[] = [
      {
        key: 'column1',
        name: 'Status',
        fieldName: 'ElSpecStatus',
        minWidth: 170,
        maxWidth: 170,
        
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        
      },
      {
        key: 'column2',
        name: 'Date of change',
        fieldName: 'Modified',
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: false,
        onRender: (item: IDocument) => {
          let createdOn = new Date(item.Modified);
          let formatedDate = `${createdOn.toLocaleString("default", { month: "long" })} ${createdOn.getDate()}, ${createdOn.getFullYear()} at ${createdOn.toLocaleTimeString()}`;

          return <span>{formatedDate}</span>;
        },
      },
      
      {
        key: 'column3',
        name: 'Changed by',
        fieldName: 'Editor.LookupValue',
        minWidth: 100,
        maxWidth: 140,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'string',
        onRender: (item: IDocument) => {
          return <span>{item.Editor.LookupValue}</span>;
        },
        isPadded: true,
      },

    ];

    this.state = {
      items: [],
      columns: columns,
      isModalSelection: false,
      isCompactMode: false,
      announcedMessage: undefined,
      itemId: SharePointService.elSpecItemID,
    };

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
        });
      },
    });

    SharePointService.getListItemVersions(SharePointService.elSpeclistID, this.state.itemId).then(itemVersions =>{
      let approvals = itemVersions.value;
      let uniqueChanges = [];
      for(let i=0 ; i< approvals.length; i++){
        if(i==0){
          uniqueChanges.push(approvals[i]);
          continue;
        }
        if (i>0){
          if(approvals[i].ElSpecStatus != approvals[i-1].ElSpecStatus){
            uniqueChanges.push(approvals[i]);
            continue;
          }
        }
      }

      this.setState({items: uniqueChanges,
     });
     //console.log(this.state.items);
    });
    
  }

  public render(): React.ReactElement<{}> {
    return (
      <div >
        <h1>Appoval proccess for this element specification</h1>
        <hr></hr>
        <DetailsList
              items={this.state.items}
              compact={this.state.isCompactMode}
              columns={this.state.columns}
              selectionMode={SelectionMode.multiple}
              getKey={this._getKey}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              enterModalSelectionOnTouch={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="Row checkbox"
            />
      </div>
    );
  }

  public componentDidUpdate(previousProps: any, previousState: IDetailsListDocumentsExampleState) {
    if (previousState.isModalSelection !== this.state.isModalSelection && !this.state.isModalSelection) {
      this._selection.setAllSelected(false);
    }
  }

  private _getKey(item: any, index?: number): string {
    return item.key;
  }


  

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDocument).Title;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? 'descending' : 'ascending'
          }`,
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  }
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}




