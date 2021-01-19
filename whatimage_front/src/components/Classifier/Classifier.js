import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css'
import { Alert, Button, Image, Spinner } from 'react-bootstrap'
// https://www.npmjs.com/package/axios
import axios from 'axios'
import ImageList from '../ImageList/ImageList';

class Classifier extends Component {
    state = {
        files: [],
        isLoading: false,
        recentImage: null,
    }

    onDrop = (files) => {
        this.setState({
            files: [],
            isLoading: true,
            recentImage: null,
        })
        this.loadImage(files)
    }

    loadImage = (files) => {
        setTimeout(() => {
            this.setState({
                files,
                isLoading: false,
            }, () => {
                console.log(this.state.files)
            })
        }, 1000)
    }

    activateSpinner = () => {
        this.setState({
            files: [],
            isLoading: true
        })
    }

    deactivateSpinner = () => {
        this.setState({ isLoading: false })
    }

    sendImage = () => {
        this.activateSpinner()
        let formData = new FormData()
        formData.append('picture', this.state.files[0], this.state.files[0].name)
        axios.post('http://127.0.0.1:8000/api/images/', formData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        })
            .then(resp => {
                this.getImageClass(resp)
                console.log(resp.data.id)
            })
            .catch(err => {
                console.log('Error message :' + err)
            })
    }

    getImageClass = (obj) => {
        axios.get(`http://127.0.0.1:8000/api/images/${obj.data.id}/`, {
            headers: {
                'accept': 'application/json',
            }
        })
            .then(resp => {
                this.setState({ recentImage: resp })
                console.log(resp)
            })
            .catch(err => {
                console.log('Error message :' + err)
            })
        this.deactivateSpinner()


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
                            <small>Accept only .jpeg and .png</small>
                        </div>
                        <aside>
                            <ul>{files}</ul>
                        </aside>

                        {this.state.files.length > 0 &&
                            <Button variant='info' size='lg' className='mt-3' onClick={this.sendImage}>Selet Image</Button>
                        }

                        {this.state.isLoading &&
                            <Spinner animation="border" role="status"></Spinner>
                        }
                        {this.state.recentImage &&
                            <React.Fragment>
                                <Alert variant='primary'>
                                    {this.state.recentImage.data.classified}
                                </Alert>
                                <Image className="mb-5" src={this.state.recentImage.data.picture} width='100%' rounded />
                            </React.Fragment>
                        }
                    </section>
                )}
            </Dropzone>
        );
    }
}

export default Classifier;