import { Component } from "react";
import Logo from "../Logo/Logo";
import ProfilePic from "../ProfilePic/ProfilePic";
import Uploader from "../Uploader/Uploader";
// import "../App/App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploaderOpen: false,
            first: "",
            last: "",
            pic: "",
        };
        this.showUploader = this.showUploader.bind(this);
    }

    componentDidMount() {
        fetch("/profile")
            .then((data) => data.json())
            .then((userData) => {
                this.setState({
                    first:userData.first,
                    last:userData.last,
                    pic: userData.pic,
                });
            });
    }


    showUploader() {
        this.setState({ isUploaderOpen: !this.state.isUploaderOpen });
    }

    changeProfilePic(){

    }

    render() {
        return (
            <>
                <Logo />
                <ProfilePic
                    first={"Yigit"}
                    last={"Sezginer"}
                    pic={this.state.pic}
                    showUploader={this.showUploader}
                />
                {this.state.isUploaderOpen && <Uploader />}
            </>
        );
    }
}

export default App;
