import React from 'react';
import ReactDOM from 'react-dom';

function mod(n, m) {
    return (n+m)%m;
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.delai = 70;
        let arr =[];
        for(let i=0 ; i<3500 ; i++) arr.push(Math.round(Math.random()));
        this.state={data:arr};
        this.generation = 0;
        this.runtime();
    }
    updateboard(arg1,arg2){
        let arr = this.state.data;
        arr[arg1-1] = arg2;
        this.setState({data : arr});
    }
    run(){
        let arr=[];
        for(let i=0 ; i<3500 ; i++) arr.push(0);
        for(let i=0 ; i<70 ; i++)
            for(let j=0 ; j<50 ; j++)
            {
                if(this.state.data[i+70*j] && ((this.state.data[mod(i-1,70)+mod(j-1,50)*70]+this.state.data[mod(i-1,70)+mod(j,50)*70]+this.state.data[mod(i-1,70)+mod(j+1,50)*70]+this.state.data[mod(i,70)+mod(j-1,50)*70]+this.state.data[mod(i,70)+mod(j+1,50)*70]+this.state.data[mod(i+1,70)+mod(j-1,50)*70]+this.state.data[mod(i+1,70)+mod(j,50)*70]+this.state.data[mod(i+1,70)+mod(j+1,50)*70]==2) || (this.state.data[mod(i-1,70)+mod(j-1,50)*70]+this.state.data[mod(i-1,70)+mod(j,50)*70]+this.state.data[mod(i-1,70)+mod(j+1,50)*70]+this.state.data[mod(i,70)+mod(j-1,50)*70]+this.state.data[mod(i,70)+mod(j+1,50)*70]+this.state.data[mod(i+1,70)+mod(j-1,50)*70]+this.state.data[mod(i+1,70)+mod(j,50)*70]+this.state.data[mod(i+1,70)+mod(j+1,50)*70]==3)))
                    arr[i+70*j] = 1;
                else if(!this.state.data[i+70*j] && (this.state.data[mod(i-1,70)+mod(j-1,50)*70]+this.state.data[mod(i-1,70)+mod(j,50)*70]+this.state.data[mod(i-1,70)+mod(j+1,50)*70]+this.state.data[mod(i,70)+mod(j-1,50)*70]+this.state.data[mod(i,70)+mod(j+1,50)*70]+this.state.data[mod(i+1,70)+mod(j-1,50)*70]+this.state.data[mod(i+1,70)+mod(j,50)*70]+this.state.data[mod(i+1,70)+mod(j+1,50)*70]==3))
                    arr[i+70*j] = 1;
            }
        this.setState({data:arr});
        this.generation++;
    }
    runtime(){
        this.run(this);
        this.timeout = setTimeout(this.runtime.bind(this) , this.delai);
    }
    stoptime(){
        window.clearTimeout(this.timeout);
    }
    clearall(){
        this.generation = 0;
        window.clearTimeout(this.timeout);
        let arr =[];
        for(let i=0 ; i<3500 ; i++) arr.push(0);
        this.setState({data : arr});
    }
    render()
    {
        let i=0;
        const board = this.state.data.map((item)=>{
            if(item) return <div className="alive" key={i++} onClick={this.updateboard.bind(this,i,0)}></div>;
            return <div className="dead" key={i++} onClick={this.updateboard.bind(this,i,1)}></div>;
        });
        return (
            <div className="container">
                <div id="title" ><a id="lien" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Game Of Life</a></div>
                <div id="top">
                    <div> Generation: {this.generation} </div>
                    <div>
                        <button onClick={this.runtime.bind(this)}>Run</button>
                        <button onClick={this.clearall.bind(this)}>Clear</button>
                        <button onClick={this.stoptime.bind(this)}>Pause</button>
                    </div>
                </div>
                <div id="all">
                    {board}
                </div>
                <div id="bottom">
                    <span>Sim Speed : </span>&nbsp;
                    <button onClick={()=>{this.delai=200}}>Slow</button>
                    <button onClick={()=>{this.delai=70}}>Medium</button>
                    <button onClick={()=>{this.delai=25}}>Fast</button>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<App/>,document.getElementById('app'));