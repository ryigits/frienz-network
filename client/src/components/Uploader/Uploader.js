import { Component } from "react";

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "modal",
        };
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({ display: "modal" });
    }

    componentDidMount() {
        this.setState({ display: "modalOpen" });
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const fileInput = form.querySelector("input[type=file]");
        if (fileInput.files.length < 1) return alert("you must add a file");

        const formData = new FormData(form);

        fetch("/image", {
            method: "POST",
            body: formData,
        })
            .then((result) => result.json())
            .then(() => {
                this.setState({ display: "modal" });
            });
    }

    render() {
        return (
            <>
                <div id="myModal" className={this.state.display}>
                    <div className="modal-content">
                        <span className="close" onClick={this.closeModal}>
                            &times;
                        </span>
                        <form
                            encType="multipart/form-data"
                            onSubmit={this.handleSubmit}
                        >
                            <input type="file" accept="image/*" name="photo" />
                            <input type="submit" name="button" value="submit" />
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Uploader;


                <nav>
                    <div>
                        <div className="flex py-3 justify-between items-center h-40 w-full">
                            <Link to="/">
                                <div className="w-40">
                                    <Logo />
                                </div>
                            </Link>
                            <div className="flex grow place-self-end w-full">
                                {/* <Link to="/users">FindPeople</Link> */}
                            </div>

                            <div className="mr-14 object-center mt-10">
                                <div className="" onClick={showUploader}>
                                    <Avatar
                                        img={userProfilePic}
                                        rounded={true}
                                        size="lg"
                                    />
                                </div>

                                <div className="">
                                    {isUploaderOpen && }
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>;