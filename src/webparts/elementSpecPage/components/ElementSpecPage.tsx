import * as React from 'react';
import { IElementSpecPageProps } from './IElementSpecPageProps';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import {Home} from './Home';
import {History} from './History';
import { Formula} from './Formula';
import {Workflow} from './Workflow';
import SharePointService from '../../../services/SharePoint/SharePointService';


export default class ElementSpecPage extends React.Component<IElementSpecPageProps, {}> {

  

  public render(): React.ReactElement<IElementSpecPageProps> {
    return (
      <div>
        <Pivot aria-label="Idea pivot page">
        <PivotItem
          headerText="General info"
          headerButtonProps={{
            'data-order': 1,
            'data-title': 'General info',
          }}
        >
          <Home ></Home>
          
        </PivotItem>

        <PivotItem headerText="Approval">
          <Workflow></Workflow>
        </PivotItem>
        
        <PivotItem headerText="Formula">
          <Formula></Formula>
        </PivotItem>

        <PivotItem headerText="History">
          <History></History>
        </PivotItem>
      </Pivot>  
      </div>
    );
  }
}
