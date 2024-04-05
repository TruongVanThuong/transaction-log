import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const endpoint = "http://localhost:8001/api/admin";

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [productIdToDelete, setProductIdToDelete] = useState(null); 
    
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await axios.get(`${endpoint}/product/show`);
        setProducts(response.data);
        const responseCate = await axios.get(`${endpoint}/category`);
        setCategories(responseCate.data);
    };

    const handleDeleteButtonClick = (productId) => {
        setShowModal(true); 
        console.log('hello');
        setProductIdToDelete(productId);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${endpoint}/products/${productIdToDelete}`);
            getAllProducts();
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setProductIdToDelete(null);
    };

    const renderImage = (product) => {
        return <img src={`http://localhost:8001/images/products/${product.image}`} alt={product.image} 
        className="w-1rem shadow-2 border-round" style={{width:'100px'}} />;
    };
    const renderActions = (product) => {
        return (
            
            <>
                <Link to={`edit/${product.id}`} className="col-start-1">
                    <span className="btn btn-primary">Edit</span>
                </Link>
                <button onClick={() => handleDeleteButtonClick(product.id)} className="btn btn-danger">
                    Delete
                </button>
            </>
        );
    };
    const renderCate = (product) => {
        return (
            <>
            {Categories.map((cate) => (
                cate.id === product.category_id ? cate.name_cate : null
            ))}
            </>
        )
    }

    return (
        <div>
            <h1 className="py-4 text-xl font-semibold text-center">Products</h1>
            <div className="d-grid gap-2">
                <Link to="add" className="relative p-2 btn btn-dark w-25">
                    <span >Add product</span>
                </Link>
            </div>
            <br/>
            <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                <Column field="id" header="ID" style={{ width: '5%' }}></Column>
                <Column field="name_pd" header="Name products" style={{ width: '15%' }}></Column>
                <Column field="seller_id" header="Seller ID" style={{ width: '7%' }}></Column>
                <Column body={renderImage} header="Image" style={{ width: '10%' }}></Column>
                <Column body={renderCate} header="Category" style={{ width: '8%' }}></Column>
                <Column field="qly" header="Quantity" style={{ width: '5%' }}></Column>
                <Column field="desc" header="Description" style={{ width: '20%' }}></Column>
                <Column field="price" header="Price" style={{ width: '10%' }}></Column>
                <Column field="status" header="Status" style={{ width: '5%' }}></Column>
                <Column header="Actions" body={renderActions} style={{ width: '15%' }}></Column>
            </DataTable>
            
        </div>
    );
};

export default ShowProducts;
