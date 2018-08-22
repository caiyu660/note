export default class HomePage extends Page{
    config = {
        navigationBarTitleText: '问题'
    }
    constructor(){
        this.state = {
            name: "zhangsan",
            age: 10,
            list: [{id: 1}, {id: 2}]
        }
    }
    componentWillMount(){}
    componentDidMount(){}
    componentWillUnmount(){}
    componentDidShow(){}
    componentDidHide(){}

    setName(){
       this.setState({
           name: 'newName'
       })
    }

    render(){
        return (
            <view age={this.state.age}>
                {this.state.age > 10 ? <text>haha</text> : <text>hihi</text>}
                <text>this is mini grama</text>
                <text onClick={this.setName}>{this.state.name}</text>
                {
                    this.state.list.map((item, index) => {
                        return <text key={index}>{item}</text>
                    })
                }
            </view>
        )
    }
}