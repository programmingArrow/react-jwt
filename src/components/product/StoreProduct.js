import React, { Component } from 'react';
import { Form } from "semantic-ui-react";
import axios from 'axios';
import CenteredGridLayout from '../commons/layouts/CenteredGridLayout';
import ProductName from './fields/ProductName';
import ProductPrice from './fields/ProductPrice';
import CategoryList from '../category/CategoryList';
import { getAuthToken } from '../../helpers/getAuthToken';

export default class StoreProduct extends Component {
    state = {
        isFormloading: false,
        name: '',
        price: '',
        category: '1'
    }

    handleSubmit = () => {
        this.setState({ isFormloading: true });
        const auth_token = getAuthToken();
        const { name, price, category } = this.state;

        axios.post(`http://127.0.0.1:8000/api/products`, {
            headers: {
                'Authorization': `Bearer ${auth_token}`
            },
            name,
            price,
            category
        })
            .then((response) => { console.log(response); this.setState({ isFormloading: false }); })
            .catch((error) => { console.log(error); this.setState({ isFormloading: false }); });
    }

    handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(this.state.category);
    } 

    render() {
        return (
            <CenteredGridLayout title="Add Product">
                <Form loading={this.state.isFormloading} onSubmit={this.handleSubmit}>
                    <ProductName name="name" value={this.state.name} onChange={this.handleChange} />
                    <ProductPrice name="price" value={this.state.price} onChange={this.handleChange} />
                    <CategoryList name="category" value={this.state.category} onChange={this.handleChange} />
                    <Form.Button>Submit</Form.Button>
                </Form>
            </CenteredGridLayout>
        );
    }
}
