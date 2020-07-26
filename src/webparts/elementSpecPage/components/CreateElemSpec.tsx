import * as React from 'react';
//import styles from './CreateIdea.module.scss';
import { ICreateElemSpecProps } from './ICreateElemSpecProps';
import { ICreateElemSpecState } from './ICreateElemSpecState';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {  PrimaryButton } from 'office-ui-fabric-react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

//import SharePointService from '../../../services/SharePoint/SharePointService';



//  import Latex from 'react-latex-next';
//import 'katex/dist/katex.min.css';
//import {MathJax} from 'react-mathjax';

import MathJax from 'react-mathjax-preview'
import styles from './CreateIdea.module.scss';
import SharePointService from '../../../services/SharePoint/SharePointService';



/*const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`;

    //const MathJax = require('react-mathjax');

*/

const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'Missing Fields',
  subText: 'Some required field is not filled. Please provide content to all required fields. ',
};


export class CreateElemSpec extends React.Component<ICreateElemSpecProps, ICreateElemSpecState> {

  constructor (props: ICreateElemSpecProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.promenaGlavnog = this.promenaGlavnog.bind(this);
    this.toggleHideDialog = this.toggleHideDialog.bind(this);
    this.proveraEnterSpace = this.proveraEnterSpace.bind(this);

    this.space = this.space.bind(this);
    this.newline = this.newline.bind(this);

    this.superscript = this.superscript.bind(this); 
    this.subscript = this.subscript.bind(this);
    this.superscriptSubscript = this.superscriptSubscript.bind(this);
    this.sum = this.sum.bind(this);
    this.doubleSum = this.doubleSum.bind(this);
    this.fraction = this.fraction.bind(this);
    this.definiteIntegral = this.definiteIntegral.bind(this);
    this.contourIntegral = this.contourIntegral.bind(this);
    this.doubleIntegral = this.doubleIntegral.bind(this);
    this.partialDifferential = this.partialDifferential.bind(this);
    this.firstAccent = this.firstAccent.bind(this);
    this.secondAccent = this.secondAccent.bind(this);
    this.thirdAccent = this.thirdAccent.bind(this);
    this.radical = this.radical.bind(this);
    this.vector = this.vector.bind(this);
    this.matrix = this.matrix.bind(this);

    this.alfa = this.alfa.bind(this);
    this.beta = this.beta.bind(this);
    this.gamma = this.gamma.bind(this);
    this.delta = this.delta.bind(this);
    this.epsilon = this.epsilon.bind(this);
    this.theta = this.theta.bind(this);
    this.lambda = this.lambda.bind(this);
    this.mu = this.mu.bind(this);
    this.pi = this.pi.bind(this);
    this.sigma = this.sigma.bind(this);
    this.omega = this.omega.bind(this);

    this.geq = this.geq.bind(this);
    this.leq = this.leq.bind(this);
    this.approx = this.approx.bind(this);
    this.Rightarrow = this.Rightarrow.bind(this);
    this.rightarrow = this.rightarrow.bind(this);
    this.pm = this.pm.bind(this);
    this.neq = this.neq.bind(this);
    this.equiv = this.equiv.bind(this);
    this.partial = this.partial.bind(this);
    this.in = this.in.bind(this);

    this.sqr_sqrt = this.sqr_sqrt.bind(this);

    this.sinx = this.sinx.bind(this);
    this.cosx = this.cosx.bind(this);
    this.tgx = this.tgx.bind(this);

    this.UpdateElemSpec = this.UpdateElemSpec.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeDesc = this.changeDesc.bind(this);

    

    this.state = {
      prefix: '$$',
      value: '',
      formula: '',
      formulaMathjax: '',
      name: '',
      desc: '',
      newPageName: "",
      optionSelected: 'A',
      item: {},
      has_error: false,
      is_updated: false
    }

    SharePointService.getListItem(SharePointService.elSpeclistID, SharePointService.elSpecItemID).then(rs => {
      //console.log(rs);
      this.setState({
        item: rs,
        name: rs.Title,
        desc: rs.Description,
        formula: rs.Formula,
        formulaMathjax: '$$' + rs.Formula + '$$',
      });
      //console.log("item from state: " + this.state.item);
    })
  }
  public render(): React.ReactElement<ICreateElemSpecProps> {
    //const LaTeX = '{\bf IR}.{\sc 3s}-love   & P & him & }';


    return (
      
      <div>

      <Label htmlFor='name' required>Element specification name</Label>
      <TextField id='name' value={this.state.name} onChange={evt => this.changeName(evt)}/>

      <Label htmlFor='desc' required>Element specification description</Label>
      <TextField id='desc' value={this.state.desc} multiline onChange={evt => this.changeDesc(evt)}/>

      {/*<Label htmlFor='txtAttachements' required>Upload pictures</Label>

      <input id='txtAttachements' type= "file" multiple/>
    */}

        <div style={{marginTop:'5px'}}>
        <div style={{width:'30%', float:'left'}}>
        <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Commands</button>
          <div className={styles.panel}>
            <button onClick={this.space}>Space</button>
            <button onClick={this.newline}>Newline</button>
          </div> 
          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Subscript & Superscript</button>
          <div className={styles.panel}>
            <button onClick={this.superscript}>a<sup>x</sup></button>
            <button onClick={this.subscript}>a<sub>i</sub></button>
            <button onClick={this.superscriptSubscript}>a<sub>i</sub><sup>x</sup></button>
          </div>  
          
          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Sum</button>
          <div className={styles.panel}>
            <button onClick={this.sum}>&sum;</button>
            <button onClick={this.doubleSum}>&sum;&sum;</button>
          </div> 
          

          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Fraction</button>
          <div className={styles.panel}>
            <button onClick={this.fraction}>Fraction</button>
          </div> 

          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Integral</button>
          <div className={styles.panel}>
            <button onClick={this.definiteIntegral}>&int;</button>
            <button onClick={this.contourIntegral}>&#8750;</button>
            <button onClick={this.doubleIntegral}>&int;&int;</button>
          </div> 

          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Differential</button>
          <div className={styles.panel}>
            <button onClick={this.partialDifferential}>Partial differential</button>
          </div> 

          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Accent</button>
          <div className={styles.panel}>
            <button onClick={this.firstAccent}><sup>&sdot;</sup></button>
            <button onClick={this.secondAccent}><sup>&sdot;&sdot;</sup></button>
            <button onClick={this.thirdAccent}><sup>&sdot;&sdot;&sdot;</sup></button>
          </div>

          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Radical</button>
          <div className={styles.panel}>
            <button onClick={this.radical}>&radic;</button>
            <button onClick={this.sqr_sqrt}><sup>n</sup>&radic;<sup>m</sup></button>
          </div> 

          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Vector & Matrix</button>
          <div className={styles.panel}>
            <button onClick={this.vector}>(&#x22EE;)</button>
            <button onClick={this.matrix}>[&#x22EF;]</button>
          </div> 

          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Special letters</button>
          <div className={styles.panel}>
            <button onClick={this.alfa}>&alpha;</button>
            <button onClick={this.beta}>&beta;</button>
            <button onClick={this.gamma}>&gamma;</button>
            <button onClick={this.delta}>&Delta;</button>
            <button onClick={this.epsilon}>&epsilon;</button>
            <button onClick={this.theta}>&theta;</button>
            <button onClick={this.lambda}>&lambda;</button>
            <button onClick={this.mu}>&mu;</button>
            <button onClick={this.pi}>&pi;</button>
            <button onClick={this.sigma}>&sigma;</button>
            <button onClick={this.omega}>&omega;</button>
          </div>
          
          
          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Special symbols</button>
          <div className={styles.panel}>
            <button onClick={this.geq}>&ge;</button>
            <button onClick={this.leq}>&le;</button>
            <button onClick={this.approx}>&asymp;</button>
            <button onClick={this.Rightarrow}>&rArr;</button>
            <button onClick={this.rightarrow}>&rarr;</button>
            <button onClick={this.pm}>&#x2213;</button>
            <button onClick={this.neq}>&ne;</button>
            <button onClick={this.equiv}>&equiv;</button>
            <button onClick={this.partial}>&part;</button>
            <button onClick={this.in}>&isin;</button>
          </div> 
          

          <button className={styles.accordion} onClick={evt =>this.chg(evt)}>Trigonometric</button>
          <div className={styles.panel}>
            <button onClick={this.sinx}>sinx</button>
            <button onClick={this.cosx}>cosx</button>
            <button onClick={this.tgx}>tanx</button>
          </div>

        </div>
        <div style= {{width:'70%', float:'left'}}>

        <h3 style={{textAlign: 'center' }}>
            Textual formula:
          </h3>
          
        {/*
        <input
          type="text"
          style={{width:'100%'}}
          value={this.state.formula}
          placeholder="Enter formula here directly or use left helpbar with predefined elements"
          onChange={this.promenaGlavnog}
          //placeholder='Here you put whole formula'
        />
        */}

        <TextField id='name' multiline value={this.state.formula}
          placeholder="Enter formula here directly or use left helpbar with predefined elements"
          onChange={this.promenaGlavnog} onKeyDown={this.proveraEnterSpace} />



          <h3 style={{textAlign: 'center' }}>
            Graphical formula:
          </h3>
          <MathJax  math={this.state.formulaMathjax}/>

        </div>

        <div style={{textAlign:'center'}}>
        <PrimaryButton text="Update element specification" onClick={this.UpdateElemSpec} />

        </div>

        <Dialog
          hidden={!this.state.has_error}
          onDismiss={this.toggleHideDialog}
          dialogContentProps= {dialogContentProps}
          
          />
        
        

        </div>

        
      
      </div>
    );
  }

  public space() {
    let val = '\\ ';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
  }

  public newline() {
    let val = '\\\\';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
  }

  public superscript() {
    //console.log(this.state.formula);
    let base = prompt("Please enter base number", "");
    var exp = prompt("Please enter exponent number", "");
    let val = '{' + base + '}^{' + exp + '}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public subscript() {
    //console.log(this.state.formula);
    let base = prompt("Please enter base number", "");
    var index = prompt("Please enter index number", "");

    let val = '{' + base + '}_{' + index + '}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public superscriptSubscript() {
    //console.log(this.state.formula);
    let base = prompt("Please enter base number", "");
    var index = prompt("Please enter index number", "");
    var exp = prompt("Please enter exponent number", "");


    let val = '{' + base + '}_{' + index + '}^{' + exp + '}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });
  }

  public sum() {
    //console.log(this.state.formula);
    let base = prompt("Please enter starting value for i", "");
    var exp = prompt("Please enter end value for i", "");
    var stat = prompt("Please enter statement within sum", "");
    let val = '\\sum_{i=' + base + '}^{' + exp + '}({' + stat + ')}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });
  }

  public doubleSum() {
    //console.log(this.state.formula);
    let base1 = prompt("Please enter starting value for i", "");
    var exp1 = prompt("Please enter end value for i", "");
    let base2 = prompt("Please enter starting value for j", "");
    var exp2 = prompt("Please enter end value for j", "");
    var stat = prompt("Please enter statement within sum", "");
    let val = '\\sum_{i=' + base1 + '}^{' + exp1 + '}' + '\\sum_{j=' + base2 + '}^{' + exp2 + '}{(' + stat + ')}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });
  }

  public fraction() {
    //console.log(this.state.formula);
    let numerator = prompt("Please enter numerator", "");
    var denominator = prompt("Please enter denominator", "");

    let val = '\\frac{' + numerator + '}{' + denominator + '}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public definiteIntegral() {
    //console.log(this.state.formula);
    let lower = prompt("Please enter lower limit of the integral", "");
    var upper = prompt("Please enter upper limit of the integral", "");
    var func = prompt("Please enter value within the integral", "");

    let val = '\\int_{' + lower + '}^{' + upper + '}{(' + func + ')}dx';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public contourIntegral() {
    //console.log(this.state.formula);
    var func = prompt("Please enter value within the integral", "");

    let val = '\\oint(' +func + ')dx';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public doubleIntegral() {
    //console.log(this.state.formula);
    let lower = prompt("Please enter lower limit of the inner integral", "");
    var upper = prompt("Please enter upper limit of the inner integral", "");
    var func = prompt("Please enter value within the inner integral", "");

    let val = '\\iint_{' + lower + '}^{' + upper + '}{(' + func + ')}dx';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public partialDifferential() {
    //console.log(this.state.formula);
    let numerator = prompt("Please enter differential's numerator", "");
    var denominator = prompt("Please enter differential's denominator", "");

    let val = '\\frac{\\partial ' + numerator + '}{\\partial ' + denominator + '}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public firstAccent() {
    //console.log(this.state.formula);
    let base = prompt("Please enter function value within the accent", "");

    let val = '\\dot{(' + base + ')}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public secondAccent() {
    //console.log(this.state.formula);
    let base = prompt("Please enter function value within the accent", "");

    let val = '\\ddot{(' + base + ')}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public thirdAccent() {
    //console.log(this.state.formula);
    let base = prompt("Please enter function value within the accent", "");

    let val = '\\dddot{(' + base + ')}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }

  public radical() {
    //console.log(this.state.formula);
    let base = prompt("Please choose type of radical", "");
    let func = prompt("Please type value which will be under the radical", "");

    let val = '\\sqrt[' + func + ']{(' + base + ')}';
    let form = this.state.formula + val;
    let mathjax = '$$'+ form + '$$';

    this.setState({
      value: val,
      formula: form,
      formulaMathjax: mathjax
      
    });

  }
  
  public vector() {
    //(this.state.formula);
    let num= prompt("Please enter number of elements for vector", "")!;

    let numOfElements = parseInt(num);
    let arr:any = [];
    if (numOfElements != NaN){
      
      for (let i = 0; i< numOfElements; i++){
        let a = prompt(`Please enter ${i+1}. element for vector`, ``)!;
        arr.push(a);
      }

      //console.log(arr);
      let finalStr = '';
      for (let j = 0; j<arr.length; j++ ){
        finalStr = finalStr + arr[j] + '\\\\';
      }

      //console.log(finalStr);

      let val = '\\begin{pmatrix}' + finalStr + '\\end{pmatrix}';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';

      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
      
    });
    }
  }

    
  public matrix() {
    //console.log(this.state.formula);
    let columns= parseInt(prompt("Please choose number of matrix's columns", "")!);
    let rows= parseInt(prompt("Please choose number of matrix's rows", "")!);

    let finalStr = '';

    if (columns != NaN && rows != NaN && columns > 0 && rows > 0){
      for (let i = 0; i< rows; i++){
        for (let j = 0; j < columns; j++){
          let a = prompt(`Please enter value for [${i}][${j}] matrix's element`)!;
          finalStr = finalStr + a;
          if (j == columns - 1){
            finalStr = finalStr + '\\\\';
          }
          else {
            finalStr = finalStr + '&&';

          }
        }
        
      }

      }

      //console.log(finalStr);

      let val = '\\begin{bmatrix}' + finalStr + '\\end{bmatrix}';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';

      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
      
    });
    }

    public alfa() {
      
      let val = '\\alpha';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public beta() {
      
      let val = '\\beta';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public gamma() {
      
      let val = '\\gamma';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public delta() {
      
      let val = '\\Delta';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public epsilon() {
      
      let val = '\\epsilon';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public theta() {
      
      let val = '\\theta';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public lambda() {
      
      let val = '\\lambda';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public mu() {
      
      let val = '\\mu';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public pi() {
      
      let val = '\\pi';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public sigma() {
      
      let val = '\\sigma';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public omega() {
      
      let val = '\\omega';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public geq() {
      
      let val = '\\geq';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public leq() {
      
      let val = '\\leq';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public approx() {
      
      let val = '\\approx';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public Rightarrow() {
      
      let val = '\\Rightarrow';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public rightarrow () {
      
      let val = '\\rightarrow ';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public pm() {
      
      let val = '\\pm';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public neq() {
      
      let val = '\\neq';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public equiv() {
      
      let val = '\\equiv';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public partial() {
      
      let val = '\\partial';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public in() {
      
      let val = '\\in';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public sqr_sqrt() {
      //console.log(this.state.formula);
      let func = prompt('Please enter the function', "");
      let numerator = prompt("Please enter number for sqr", "");
      var denominator = prompt("Please enter number for sqrt", "");
  
      let val = '({' + func + '})^\\frac{' + numerator + '}{' + denominator + '}';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public sinx() {
      //console.log(this.state.formula);
      let base = prompt("Please enter function value within the sin", "");
  
      let val = '\\sin{(' + base + ')}';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public cosx() {
      //console.log(this.state.formula);
      let base = prompt("Please enter function value within the cos", "");
  
      let val = '\\cos{(' + base + ')}';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }

    public tgx() {
      //console.log(this.state.formula);
      let base = prompt("Please enter function value within the tan", "");
  
      let val = '\\tan{(' + base + ')}';
      let form = this.state.formula + val;
      let mathjax = '$$'+ form + '$$';
  
      this.setState({
        value: val,
        formula: form,
        formulaMathjax: mathjax
        
      });
  
    }




  public handleChange(event) {
    this.setState({formula: event.target.value});
    //console.log('promenio se');

    let mathjax = '$$'+ this.state.formula + '$$';

    this.setState({
      formulaMathjax: mathjax
    });

  }

  public promenaGlavnog(event) {
    let form = event.target.value;
    let formMathjax = '$$' + form + '$$';

    this.setState({
      formula: form,
      formulaMathjax: formMathjax
    });

  }

  public proveraEnterSpace(event) {
    //console.log('lele');
    //console.log(event);
    if(event.keyCode === 13){
      //pritisnut enter
      let form = event.target.value;
      let val = '\\\\';
      let formval = form + val;
      let formMathjax = '$$' + formval + '$$';

      this.setState({
        formula: formval,
        formulaMathjax: formMathjax
      });
    }
    else if(event.keyCode === 32){
      let form = event.target.value;
      let val = '\\ ';
      let formval = form + val;
      let formMathjax = '$$' + formval + '$$';

      this.setState({
        formula: formval,
        formulaMathjax: formMathjax
      });
    }
  }

  public chg(evt) {
    //console.log('kliknuo prvi!')
    //console.log(evt.target);
    var panel = evt.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    
  }

  public UpdateElemSpec() {
    
    //console.log(this.state.name);
    //console.log(this.state.desc);
    if(this.state.name == '' || this.state.desc == ''){
      //console.log('dopuni');


      dialogContentProps.title = 'Element specification was not updated';
      dialogContentProps.subText = 'Please fill all required fields for updating element specification'
      this.setState({
        has_error: true
      })
    }
    else {
      //console.log('prihvatio');
      //console.log('Name:' + this.state.name);
      //console.log('Desc:' + this.state.desc);
      
      SharePointService.updateElemSpec(this.state.name, this.state.desc, this.state.formula, this.state.item.IdeaStatus).then (result => {
        //console.log(result);
        if (result == '204'){
          dialogContentProps.title = 'Element specification updated successfully';
          dialogContentProps.subText = 'You have updated successfully this element specifiation'
          this.setState({
            has_error: true
          })
        }
                
      });
      

      //window.location.href = "https://jvspdev.sharepoint.com/sites/AtlasCorpoProject/SitePages/All-element-specs.aspx";


    }
  }

  public changeName(evt) {
    this.setState({
      name: evt.target.value
    });
  }

  public changeDesc(evt) {
    this.setState({
      desc: evt.target.value
    }); 
  }

  public toggleHideDialog() {
    let has_err = !this.state.has_error;
    this.setState({
      has_error: has_err,
    })
  }


}
