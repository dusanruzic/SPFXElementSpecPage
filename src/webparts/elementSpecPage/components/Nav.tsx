import * as React from 'react';

import {Link} from 'react-router-dom';
import { Button, ButtonType } from 'office-ui-fabric-react';
import styles from './Nav.module.scss';


export  class Nav extends React.Component<{}, {}> {
  public render(): React.ReactElement<{}> {
    return (
      <div >

        <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4 ms-xl4">
                    <Link to="/sites/AtlasCorpoProject/_layouts/15/workbench.aspx/">
                        <Button  buttonType={ ButtonType.default } className={styles.btnNav} style={{width:'85%'}} title='General info' ariaLabel='General info' >
                            <span>Details</span>
                        </Button>
                    </Link>
                </div>

                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4 ms-xl4"> 
                    <Link to="/history">
                        <Button  buttonType={ ButtonType.default } className={styles.btnNav} style={{width:'85%'}} title='History' ariaLabel='History' >
                            <span>History</span>
                        </Button>
                    </Link>
                </div>

                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4 ms-xl4"> 
                    <Link to="/formula">
                        <Button  buttonType={ ButtonType.default } className={styles.btnNav} style={{width:'85%'}} title='Approval' ariaLabel='Approval' >
                            <span>Approval</span>
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
        
        
      </div>
    );
  }
}

