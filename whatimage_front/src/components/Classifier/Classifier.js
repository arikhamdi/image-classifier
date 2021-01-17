import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css'
import { Spinner } from 'react-bootstrap'

class Classifier extends Component {
    state = {
        files: [],
        isLoading: false
    }

    onDrop = (files) => {
        this.setState({
            isLoading: true,
        })
        this.loadImage(files)
    }

    loadImage = (files) => {
        setTimeout(() => {
            this.setState({
                files,
                isLoading: false,
            })
        }, 1000)

    }
    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));
        return (
            <Dropzone onDrop={this.onDrop} accept='image/png, image/jpeg'>
                {({ isDragActive, getRootProps, getInputProps }) => (
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone back' })}>
                            <input {...getInputProps()} />
                            <p><i className="far fa-image mb-2 text-muted" style={{ fontSize: 75 }}></i></p>
                            <p>{isDragActive ? 'Drop some images' : 'Drag \'n\' drop some files here, or click to select files'}</p>
                            <small>Accept only .jpg and .png</small>
                        </div>
                        <aside>

                            <h4>Files</h4>
                            <ul>{files}</ul>
                        </aside>
                        {this.state.isLoading &&
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }
                    </section>
                )}
            </Dropzone>
        );
    }
}

export default Classifier;