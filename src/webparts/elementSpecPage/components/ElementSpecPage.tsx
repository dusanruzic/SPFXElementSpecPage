import * as React from 'react';
import { IElementSpecPageProps } from './IElementSpecPageProps';
import {IElementSpecPageState} from './IElementSpecPageState'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import {Home} from './Home';
import {History} from './History';
import { Formula} from './Formula';
import {Workflow} from './Workflow';
import SharePointService from '../../../services/SharePoint/SharePointService';
import {CreateElemSpec} from './CreateElemSpec';


export default class ElementSpecPage extends React.Component<IElementSpecPageProps, IElementSpecPageState> {

  constructor(props: IElementSpecPageProps){
    super(props);
    this.state = {
      isCreator : false,
      item: {} 
    };
    SharePointService.getListItem(SharePointService.elSpeclistID, SharePointService.elSpecItemID).then(rs => {
      //console.log(rs);
      if(rs.Author.EMail == SharePointService.context.pageContext.user.email) {
        this.setState({
          isCreator: true
        });
      }

    })
  }

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

        {this.state.isCreator ? 
        <PivotItem headerText="Update idea">
          <CreateElemSpec description={SharePointService.elSpecItemID}></CreateElemSpec>
        </PivotItem>
        : 
        ""
        }
      </Pivot>  
      </div>
    );
  }
}
