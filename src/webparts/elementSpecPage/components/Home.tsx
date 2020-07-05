import * as React from 'react';
import SharePointService from '../../../services/SharePoint/SharePointService';
import {IHomeState} from './IHomeState';
import {IHomeProps} from './IHomeProps';
import styles from './Home.module.scss';

import { TeachingBubble,ITeachingBubbleStyles  } from 'office-ui-fabric-react/lib/TeachingBubble';
import {  DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';


import {
  MessageBarButton,
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react';



export  class Home extends React.Component<IHomeProps, IHomeState> {

  public examplePrimaryButtonProps: IButtonProps = {
    text: 'Go to idea',
    onClick: this.goToIdea.bind(this)
  };

  public exampleSecondaryButtonProps: IButtonProps = {
    text: 'Close',
    onClick: this.makeTeachingButtonUnisible.bind(this)
  };
  
  public teachingBubbleStyles: Partial<ITeachingBubbleStyles> = { root: {  
    position:'relative',
    left: '50%',
    top: '300px' } };
  
    constructor(props: IHomeProps){
        super(props);
    
        //bind
        this.getItem = this.getItem.bind(this);
        this.changePicture = this.changePicture.bind(this);
        this.makeTeachingButtonVisible = this.makeTeachingButtonVisible.bind(this);
        this.makeTeachingButtonUnisible = this.makeTeachingButtonUnisible.bind(this);
        this.downgradeStatus = this.downgradeStatus.bind(this);
        this.upgradeStatus = this.upgradeStatus.bind(this);
        this.checkColors = this.checkColors.bind(this);
    
        //set initial state:
        this.state = {
          item: {Id:SharePointService.elSpecItemID, Title:''},
          images: [],
          currentImg: '',
          color1: '#d3d0cf',
          color2: '#d3d0cf',
          color3: '#d3d0cf',
          color4: '#d3d0cf',
          color5: '#d3d0cf',

          authorName: '',
          teachingBubbleVisible: false,
          status: 0,
          isSoftwareDev: false,
          changed: false
        };
        let imgs : any[] = [];
        //console.log(SharePointService.elSpeclistID);
        //console.log(SharePointService.elSpecItemID);
        SharePointService.getListItem(SharePointService.elSpeclistID, SharePointService.elSpecItemID).then(item =>{
          //console.log(item);
          this.setState({
            item: item,
            authorName: item.Author.Title
          })
          //console.log(this.state.authorName);
          if (item.Attachments){ 
            item.AttachmentFiles.map (img => {
              imgs.push(`https://jvspdev.sharepoint.com${img.ServerRelativeUrl}`);

            });
            this.checkColors();
          
            
          }

          

          this.setState({
            images: imgs,
                      
          });

          //console.log(imgs);
          //console.log(this.state.item);

          let a =  this.state.images[0];

          this.setState({
            currentImg : a
          })

         //console.log(this.state.currentImg);
        });

        let author = this.state;
        //console.log(author);
        
        SharePointService.getGroupsOfCurrentUser().then(rs => {
          //console.log(rs);
          this.setState({
            isSoftwareDev: this.checkGroup(rs.value)});
        });
      }

  public render(): React.ReactElement<{}> {

    let createdOn = new Date(this.state.item.Created);
    let formatedDate = `${createdOn.toLocaleString("default", { month: "long" })} ${createdOn.getDate()}, ${createdOn.getFullYear()} at ${createdOn.toLocaleTimeString()}`;
          

    return (
      <div >

        {this.state.changed ? 
        <MessageBar
        actions={
          <div>
            <MessageBarButton>Close</MessageBarButton>
          </div>
        }
        messageBarType={MessageBarType.success}
        isMultiline={false}
      >
        Status of element specification changed successfully
        
      </MessageBar>
      :
      ""}
        
        
        <div className="ms-Grid" dir="ltr">

        <div className="ms-Grid-row">
          <ul className={styles.progressbar}>
            

            <li className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ms-xl2" style={{maxHeight:'350px', marginBottom:'30px', padding: '0px'}}>
                <span className={styles.tooltip}><i style={{fontSize:'x-large', textShadow: '1px 1px black', color:this.state.color1}} className="ms-Icon ms-lg10 ms-Icon--Edit" aria-hidden="true"></i>
                  <span className={styles.tooltiptext} > Draft phase</span>
                </span>
                <hr style={{backgroundColor:this.state.color1}} className={styles.statusLine}></hr>
            </li>

            <li className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ms-xl2" style={{maxHeight:'350px', marginBottom:'30px', padding: '0px'}}>
            <span className={styles.tooltip}><i style={{fontSize:'x-large', textShadow: '1px 1px black', color:this.state.color2}} className="ms-Icon ms-lg10 ms-Icon--DeveloperTools" aria-hidden="true"></i>
              <span className={styles.tooltiptext} > Under development phase</span>
            </span>
              <hr style={{backgroundColor:this.state.color2}} className={styles.statusLine}></hr>
            </li>

            <li className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ms-xl2" style={{maxHeight:'350px', marginBottom:'30px', padding: '0px'}}>
            <span className={styles.tooltip}><i style={{fontSize:'x-large', textShadow: '1px 1px black', color:this.state.color3}} className="ms-Icon ms-lg10 ms-Icon--Code" aria-hidden="true"></i>
              <span className={styles.tooltiptext} > Implementation phase</span>
            </span>
              <hr style={{backgroundColor:this.state.color3,}} className={styles.statusLine}></hr>
            </li>

            <li className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ms-xl2" style={{maxHeight:'350px', marginBottom:'30px', padding: '0px'}}>
            <span className={styles.tooltip}><i style={{fontSize:'x-large', textShadow: '1px 1px black', color:this.state.color4}} className="ms-Icon ms-lg10 ms-Icon--TestCase" aria-hidden="true"></i>
              <span className={styles.tooltiptext} > Testing phase</span>
            </span>
              <hr style={{backgroundColor:this.state.color4}} className={styles.statusLine}></hr>
            </li>
                
            <li className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ms-xl2" style={{maxHeight:'350px', marginBottom:'30px', padding: '0px'}}>
            <span className={styles.tooltip}><i style={{fontSize:'x-large', textShadow: '1px 1px black', color:this.state.color5}} className="ms-Icon ms-lg10 ms-Icon--CheckList" aria-hidden="true"></i>
              <span className={styles.tooltiptext} > Release phase</span>
            </span> 
              <hr style={{backgroundColor:this.state.color5}} className={styles.statusLine}></hr>
            </li>

          </ul>
        </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6" style={{maxHeight:'350px', marginBottom:'30px'}}>
              <img src={this.state.currentImg} style={{width:'100%', height:'100%', maxHeight:'250px'}} className={styles.thumbnail} />
            </div>

            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10 ms-xl10" style={{maxHeight:'150px'}}>
                  <sub style={{color: '#0078d4', fontSize:'xx-small'}}>{this.state.item.IdeaStatus}</sub>
                  <h2 style={{margin:'0px'}}>{this.state.item.Title}</h2>
                </div>
                <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ms-xl2" >
                <span><i onClick={this.makeTeachingButtonVisible} style={{fontSize:'xxx-large', textShadow: '2px 1.5px black', color:'#0078d4'}} className="ms-Icon ms-lg10 ms-Icon--Lightbulb" aria-hidden="true"></i></span>
    
                </div>
              </div>
              <p>
              {this.state.item.Description}
              </p>
              
              <p style={{color: '#0078d4'}}>Created by {this.state.authorName} on  {formatedDate}</p>
            </div>

            

          </div>
          {this.state.isSoftwareDev ? 
          <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <ul className={styles.progressbar}>
                    <li onClick={this.downgradeStatus} className="ms-Grid-col ms-sm2 ms-md4 ms-lg4 ms-xl4" style={{maxHeight:'350px', marginBottom:'30px', padding: '0px'}}>
                        <span className={styles.tooltip}><i style={{fontSize:'x-large', textShadow: '1px 1px black', color:this.state.color1}} className="ms-Icon ms-lg10 ms-Icon--PageLeft" aria-hidden="true"></i>
                          <span className={styles.tooltiptext} > Downgrade Status</span>
                        </span>
                        <hr style={{backgroundColor:this.state.color1}} className={styles.statusLine}></hr>
                    </li>
                    
                    <div className="ms-Grid-col ms-sm8 ms-md4 ms-lg4 ms-xl4" style={{textAlign: 'center'}}>
                      <Label>Current: {this.state.item.ElSpecStatus}</Label>
                    </div>
                    <li onClick={this.upgradeStatus} className="ms-Grid-col ms-sm2 ms-md4 ms-lg4 ms-xl4" style={{maxHeight:'350px', marginBottom:'30px', padding: '0px'}}>
                        <span className={styles.tooltip}><i style={{fontSize:'x-large', textShadow: '1px 1px black', color:this.state.color1}} className="ms-Icon ms-lg10 ms-Icon--PageRight" aria-hidden="true"></i>
                          <span className={styles.tooltiptext} > Upgrade Status</span>
                        </span>
                        <hr style={{backgroundColor:this.state.color1}} className={styles.statusLine}></hr>
                    </li>
                  </ul>

              </div>
              </div>
              : 
              <div>
                <p>You are not able to change status of the item! Please ask software developer to change the status</p>
              </div>
              }
          <div>
            {this.state.teachingBubbleVisible &&
              <TeachingBubble
              styles = {this.teachingBubbleStyles}
              primaryButtonProps={this.examplePrimaryButtonProps}
              secondaryButtonProps={this.exampleSecondaryButtonProps}
              headline={this.state.item.LinkToIdea.Title}
             
              >
              {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni
              harum non? 
              */}
            </TeachingBubble>
              }

          </div>
          
          <div className="ms-Grid-row">
            {this.state.images.length > 1?  this.state.images.map(img => {
              return(<div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ms-xl2" onClick={() => this.changePicture(img)}><img src={img} style={{width:'100%', maxHeight:'100px'}} alt='My Home'/></div>);
            }) : ''}

          </div>

        </div>
        
        

      </div>
      
    );
  }


  public getItem(itemID: number): void {
    SharePointService.getListItem(SharePointService.elSpeclistID, itemID)
      .then(item => {
        this.setState({
          item: item
        });
      });
  }

  public changePicture(img: string) {
    //console.log('promenio!');
    this.setState({
      currentImg: img
    });

  }

  public makeTeachingButtonVisible() {
    this.setState({
      teachingBubbleVisible: true
    });
  }

  public makeTeachingButtonUnisible() {
    this.setState({
      teachingBubbleVisible: false
    })
    //console.log('zatvori prozor');
  }

  public goToIdea() {
    window.location.href = `${SharePointService.context.pageContext.web.absoluteUrl}/SitePages/idea${this.state.item.LinkToIdeaId}.aspx`;
  }

  public checkGroup(arrayOfGroups): boolean {
    //console.log(arrayOfGroups);
    for(let i = 0; i < arrayOfGroups.length; i++) {
      if(arrayOfGroups[i].Title == "SoftwareDeveloper") {
        //console.log('jeste soft. dev');
        return true;
      }
    }
    return false;
  }

  public downgradeStatus() {
    let statuses = ['DRAFT','UNDER DEVELOPMENT','IMPLEMENTATION','TESTING','RELEASE']
    switch (this.state.item.ElSpecStatus){
      case 'DRAFT':
        //console.log('ne mozes da vratis status jer je trenutno aktuelan pocetni status');
        break;
      case 'UNDER DEVELOPMENT':
        this.changeStatus('DRAFT');
        //console.log('menjam u draft');
        break;
      case 'IMPLEMENTATION':
        this.changeStatus('UNDER DEVELOPMENT');
        //console.log('menjam u UNDER DEVELOPMENT');
        break;
      case 'TESTING':
        this.changeStatus('IMPLEMENTATION');
        //console.log('menjam u IMPLEMENTATION');
        break;
      case 'RELEASE':
        this.changeStatus('TESTING');
        //console.log('menjam u IMPLEMENTATION');
        break;
    }

  }

  public upgradeStatus() {
    //console.log(this.state.item.ElSpecStatus);

    let statuses = ['DRAFT','UNDER DEVELOPMENT','IMPLEMENTATION','TESTING','RELEASE']
    
    switch (this.state.item.ElSpecStatus){
      case 'DRAFT':
        this.changeStatus('UNDER DEVELOPMENT');
        //console.log('menjam u under development');
        break;
      case 'UNDER DEVELOPMENT':
        this.changeStatus('IMPLEMENTATION');
        //console.log('menjam u implementation');
        break;
      case 'IMPLEMENTATION':
        this.changeStatus('TESTING');
        //console.log('menjam u testing');
        break;
      case 'TESTING':
        this.changeStatus('RELEASE');
        //console.log('menjam u release');
        
        break;
      case 'RELEASE':
        //console.log('finalni status. Nije moguce da upgradeujes status');
        break;
    }
  }

  public changeStatus(newStatus: string){
    let url = `/_api/lists/getbyid('${SharePointService.elSpeclistID}')/items(${SharePointService.elSpecItemID})`;
    
    SharePointService.changeStatus(url, newStatus).then(rs => {
      //console.log(rs);
      SharePointService.getListItem(SharePointService.elSpeclistID, SharePointService.elSpecItemID).then(item =>{
        //console.log(item);
        this.setState({
          item: item,
          //changed : true
        });
        this.checkColors();
        
      });
      
    });
  }

  public checkColors(){
    if(this.state.item.ElSpecStatus == 'DRAFT') {
      this.setState({
        color1:'#0078d4',
        color2: '#d3d0cf',
        color3: '#d3d0cf',
        color4: '#d3d0cf',
        color5: '#d3d0cf',
      })
    }
    else if(this.state.item.ElSpecStatus == 'UNDER DEVELOPMENT'){
      this.setState({
        color1:'#0078d4',
        color2:'#0078d4',
        color3: '#d3d0cf',
        color4: '#d3d0cf',
        color5: '#d3d0cf',
      });
    }
    else if(this.state.item.ElSpecStatus == 'IMPLEMENTATION'){
      this.setState({
        color1:'#0078d4',
        color2:'#0078d4',
        color3:'#0078d4',
        color4:'#d3d0cf',
        color5:'#d3d0cf',
      });
    }
    else if(this.state.item.ElSpecStatus == 'TESTING'){
      this.setState({
        color1:'#0078d4',
        color2:'#0078d4',
        color3:'#0078d4',
        color4:'#0078d4',
        color5:'#d3d0cf',
      });
    }
    else if(this.state.item.ElSpecStatus == 'RELEASE'){
      this.setState({
        color1:'#0078d4',
        color2:'#0078d4',
        color3:'#0078d4',
        color4:'#0078d4',
        color5:'#0078d4',

      });
    }
  }
}



