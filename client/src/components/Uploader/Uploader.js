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
