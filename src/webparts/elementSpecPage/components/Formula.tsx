import * as React from 'react';
import MathJax from 'react-mathjax-preview'
import {IFormulaState} from './IFormulaState';
import SharePointService from '../../../services/SharePoint/SharePointService';


export  class Formula extends React.Component<{}, IFormulaState> {

  constructor(props: any){
    super(props);


    //set initial state:
    this.state = {
      formula: ''
    };

    SharePointService.getListItem(SharePointService.elSpeclistID, SharePointService.elSpecItemID).then(item =>{
      this.setState({
        formula: '$$' + item.Formula + '$$'
      });
      });
    }

  public render(): React.ReactElement<{}> {
    return (
      <div>
        {/*<a href="https://www.codecogs.com/eqnedit.php?latex=\int_{a}^{3}\iint_{4}^{2}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\int_{a}^{3}\iint_{4}^{2}" title="\int_{a}^{3}\iint_{4}^{2}" /></a>*/}
      
      <p style={{borderColor:'gray', borderWidth:'thick'}}><MathJax math={this.state.formula}/> </p>
       
      </div>
    );
  }
}

