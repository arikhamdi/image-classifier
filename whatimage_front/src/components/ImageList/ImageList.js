import axios from 'axios';
import React, { Component } from 'react';
import Image from './Image';
import { Button, Spinner } from 'react-bootstrap';

class ImageList extends Component {
    state = {
        images: [],
        visible: 8,
        isLoading: true,
        newLoaded: false,
    }

    componentDidMount() {
        setTimeout(this.getImages, 1500)
    }

    getImages = () => {
        axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        })
            .then(resp => {
                this.setState({ images: resp.data })
                console.log(resp)
            })
        this.setState({ isLoading: false })
    }
    handleVisible = () => {
        const visible = this.state.visible
        const new_visible = visible + 4
        this.setState({ newLoaded: true })
        setTimeout(() => {
            this.setState({
                visible: new_visible,
                newLoaded: false,
            })
        }, 300)

    }

    render() {
        const images = this.state.images.slice(0, this.state.visible).map(img => {
            return <Image key={img.id} pic={img.picture} name={img.classified} />
        })
        return (
            <section className="container">
                <h1>Image List Here</h1>

                {this.state.isLoading ?
                    <Spinner animation="border" role="status"></Spinner>
                    :
                    <React.Fragment>
                        {this.state.images.length === 0 ?
                            <h3>No images classified</h3>
                            :
                            <>
                                <div className="container-image">
                                    {images}
                                </div>

                                {this.state.newLoaded ?
                                    <Spinner animation="border" role="status"></Spinner>
                                    :
                                    <>
                                        {this.state.images.length > this.state.visible ?
                                            < Button variant='primary' size='lg' onClick={this.handleVisible}>Load more</Button>
                                            :
                                            <p>No more images to load</p>
                                        }
                                    </>
                                }
                            </>
                        }
                    </React.Fragment>
                }


                <br /><br /><br /><br />
            </section>
        );
    }
}

export default ImageList;