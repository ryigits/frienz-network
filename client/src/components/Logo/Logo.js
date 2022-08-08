import { Component } from "react";

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <div className="object-cover">
                    <img src="./frienz.png"></img>
                </div>
            </>
        );
    }
}

export default Logo;
