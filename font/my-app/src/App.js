import React, { Component } from 'react';
import axios from 'axios';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData:"",
      listData:[]
    }
   }
  render() {
    const { listData } = this.state;
    return (
      <div className="App">
        <header>
          <div className="searchead">
            <input type="text" placeholder="Enter an activity..." value={this.state.inputData} onChange={(ev)=>this.handelChange(ev)} />
            <span onClick={()=>this.addData()}>+</span>
          </div>
        </header>
        <nav className="searchList">
          <ul>
            {listData.map((item,index)=>{
              return (
                <li key={index}>
                  <span className="opaText">{item.content}</span>
                  <span className="opaList">
                    <i onClick={()=>this.delectData(item.id)}>删除</i>
                  </span>
                </li>
              )
            })}
            
          </ul>
        </nav>
      </div>
    );
  }

  componentDidMount(){
    this.listApi() 
  }

  listApi(){
    let _that = this;
    axios.get('http://localhost:8888/search/selectData')
    .then(function(res){
      _that.setState({
        listData:res.data
      })
      console.log(res);
    })
    .catch(function(err){
      console.log(err);
    });
  }

  addData(){
    let _that = this;
    if(this.state.inputData==""){
      alert("请输入内容");
      return false;
    }
    axios.post('http://localhost:8888/search/addData',{
      inputData:this.state.inputData
    })
    .then(function(res){
      console.log(res.status);
      if(res.status==200){
        _that.setState({
          inputData:""
        },()=>_that.listApi());
        alert(res.data.msg);
      }else{
        alert(res.data.msg);
      }
    })
    .catch(function(err){
      console.log(err);
    });
  }

  delectData(idx){
    let _that = this;

    axios.post('http://localhost:8888/search/delectData',{
      d_id:idx
    })
    .then(function(res){
      console.log(res.status);
      if(res.status==200){
        _that.listApi();
        alert(res.data.msg);
      }else{
        alert("删除数据失败");
      }
    })
    .catch(function(err){
      console.log(err);
    });
  }

  handelChange(event){
    this.setState({
      inputData:event.target.value
    })
  }
}

export default App;
