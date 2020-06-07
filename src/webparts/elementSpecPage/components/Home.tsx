import * as React from 'react';
import SharePointService from '../../../services/SharePoint/SharePointService';
import {IHomeState} from './IHomeState';
import {IHomeProps} from './IHomeProps';
import styles from './Home.module.scss';

import { TeachingBubble,ITeachingBubbleStyles  } from 'office-ui-fabric-react/lib/TeachingBubble';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';




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
          status: 0
        };
        let imgs : any[] = [];
        SharePointService.getListItem(SharePointService.elSpeclistID, SharePointService.elSpecItemID).then(item =>{
          console.log(item);
          this.setState({
            item: item,
            authorName: item.Author.Title
          })
          console.log(this.state.authorName);
          if (item.Attachments){ 
            item.AttachmentFiles.map (img => {
              imgs.push(`https://jvspdev.sharepoint.com${img.ServerRelativeUrl}`);
            });
          
            if(item.ElSpecStatus == 'DRAFT') {
              this.setState({
                color1:'#0078d4'
              })
            }
            else if(item.ElSpecStatus == 'UNDER DEVELOPMENT'){
              this.setState({
                color1:'#0078d4',
                color2:'#0078d4',
              });
            }
            else if(item.ElSpecStatus == 'IMPLEMENTATION'){
              this.setState({
                color1:'#0078d4',
                color2:'#0078d4',
                color3:'#0078d4',
              });
            }
            else if(item.ElSpecStatus == 'TESTING'){
              this.setState({
                color1:'#0078d4',
                color2:'#0078d4',
                color3:'#0078d4',
                color4:'#0078d4',
              });
            }
            else if(item.ElSpecStatus == 'RELEASE'){
              this.setState({
                color1:'#0078d4',
                color2:'#0078d4',
                color3:'#0078d4',
                color4:'#0078d4',
                color5:'#0078d4',

              });
            }
          }

          

          this.setState({
            images: imgs,
                      
          });

          console.log(imgs);
          console.log(this.state.item);

          let a =  this.state.images[0];

          this.setState({
            currentImg : a
          })

         console.log(this.state.currentImg);
        });

        let author = this.state;
        console.log(author);
    
      }

  public render(): React.ReactElement<{}> {

    let createdOn = new Date(this.state.item.Created);
    let formatedDate = `${createdOn.toLocaleString("default", { month: "long" })} ${createdOn.getDay()}, ${createdOn.getFullYear()} at ${createdOn.getHours()}:${createdOn.getMinutes()}:${createdOn.getSeconds()}`;


    return (
      <div >
        
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
                <span><i onClick={this.makeTeachingButtonVisible} style={{fontSize:'xxx-large', textShadow: '2px 1.5px black', color:'yellow'}} className="ms-Icon ms-lg10 ms-Icon--Lightbulb" aria-hidden="true"></i></span>
    
                </div>
              </div>
              <p>
              {this.state.item.Description}
              </p>
              
              <p style={{color: '#0078d4'}}>Created by {this.state.authorName} on  {formatedDate}</p>
            </div>

          </div>
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
    SharePointService.getListItem('CF70FB14-EE3E-4D16-921A-3449856770E7', itemID)
      .then(item => {
        this.setState({
          item: item
        });
      });
  }

  public changePicture(img: string) {
    console.log('promenio!');
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
    console.log('zatvori prozor');
  }

  public goToIdea() {
    window.location.href ='http://bing.com';
    console.log('odoh na ideju');
  }
}



