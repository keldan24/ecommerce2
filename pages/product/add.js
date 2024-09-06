import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AccountMenu from '../../components/account-menu';
import Link from 'next/link';

function AddProduct() {
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        description: '',
        price: '',
        category: '',
        color: [],
        size: [],
        inStock: true
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [images, setImages] = useState([]);
    const { data: session, status } = useSession();
    const router = useRouter();

    const categories = ['Electronics', 'Fashion', 'Furnitures', 'Medicines', 'Cosmetics'];

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (status === "loading") {
            return <div>Loading...</div>;
        }
    });
    useEffect(() => {
        if (!session) {
            return null;
        }
    });

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'color' || name === 'size') {
            const colors = value.split(',').map(color => color.trim());
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: colors
            }));
        } else {
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            setError('Please select at least one image for the product.');
            return;
        }

        try {
            const formData = new FormData();
            Object.keys(product).forEach(key => {
                if (key === 'color' || key === 'size') {
                    formData.append(key, JSON.stringify(product[key]));
                } else {
                    formData.append(key, product[key]);
                }
            });

            images.forEach((image, index) => {
                formData.append(`image${index}`, image);
            });

            const response = await fetch('/api/addProducts', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccess('Product added successfully!');
                setProduct({
                    name: '',
                    brand: '',
                    description: '',
                    price: '',
                    category: '',
                    color: [],
                    size: [],
                    inStock: true,
                });
                setImages([]);
            } else {
                setError('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding the product');
        }
    };

    return (
        <div>
            <div className="bg-secondary">
                <div className="container">
                    <div className="row py-4 px-2">
                        <nav aria-label="breadcrumb col-12">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item">
                                    <Link href="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link href="/account/profile">Account</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Add Product
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <div className="row g-3">
                    <div className="col-lg-3">
                        <AccountMenu current="add-product" />
                    </div>
                    <div className="col-lg-9">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h4 className="card-title fw-semibold mt-2 mb-3 text-center">Add New Product</h4>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Product Name</label>
                                        <input placeholder='Blue Diamond Almonds Lightly Salted' type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Brand</label>
                                        <input placeholder='Quakers' type="text" className="form-control" id="brand" name="brand" value={product.brand} onChange={handleChange} />
                                        <small style={{ fontSize: '12px', fontWeight: '500' }} className="form-text text-muted">not required</small>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea placeholder='short note here...' style={{ height: '100px' }} className="form-control" id="description" name="description" value={product.description} onChange={handleChange} required></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price$</label>
                                        <input placeholder='100' type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select className="form-select" id="category" name="category" value={product.category} onChange={handleChange} required>
                                            <option value="">Select a category</option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="color" className="form-label">Colors</label>
                                        <input placeholder='black, blue, green' type="text" className="form-control" id="color" name="color" value={product.color.join(', ')} onChange={handleChange} />
                                        <small style={{ fontSize: '12px', fontWeight: '500' }} className="form-text text-muted">not required</small>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="size" className="form-label">Sizes</label>
                                        <input placeholder='S, M, L, XL or 32, 34, 36' type="text" className="form-control" id="size" name="size" value={product.size.join(', ')} onChange={handleChange} />
                                        <small style={{ fontSize: '12px', fontWeight: '500' }} className="form-text text-muted">not required</small>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="images" className="form-label">Product Images</label>
                                        <input type="file" className="form-control" id="images" name="images" onChange={handleImageChange} multiple accept="image/*" required/>
                                        <small style={{ fontSize: '12px', fontWeight: '500' }} className="form-text text-muted">You can select multiple images.</small>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="inStock" name="inStock" checked={product.inStock} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="inStock">In Stock</label>
                                    </div>
                                    <Button style={{ background: '#4b62be', color: '#fff' }} type="submit" className="w-100 py-2">
                                        <FontAwesomeIcon icon={["fas", "plus"]} />&nbsp;Add Product
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;