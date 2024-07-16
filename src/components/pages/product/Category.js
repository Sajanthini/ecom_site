import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {
    Box,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [categoryData, setCategoryData] = useState({
        id: '',
        name: '',
        description: '',
        image: null,
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        error_list: {}
    });
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get(`/api/view-category`)
            .then(res => {
                if (res.data.status === 200) {
                    console.log('Fetched categories:', res.data.categories); // Log the fetched categories
                    setCategories(res.data.categories || []);
                } else {
                    console.error("Failed to fetch categories:", res.data.message);
                }
            })
            .catch(err => {
                console.error("Error fetching categories:", err);
                setCategories([]);
            });
    };

    const handleInput = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setCategoryData((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const submitCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', categoryData.name);
        formData.append('description', categoryData.description);
        formData.append('metaTitle', categoryData.metaTitle);
        formData.append('metaDescription', categoryData.metaDescription);
        formData.append('metaKeywords', categoryData.metaKeywords);
        if (categoryData.image && categoryData.image instanceof File) {
            formData.append('image', categoryData.image);
        }

        axios.post(`/api/store-category`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                fetchCategories();
                handleClose();
            } else if (res.data.status === 400) {
                setCategoryData({ ...categoryData, error_list: res.data.errors });
            }
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                setCategoryData({ ...categoryData, error_list: error.response.data.errors });
            }
        });
    };

    const handleUpdateCategory = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', categoryData.name);
        formData.append('description', categoryData.description);
        formData.append('metaTitle', categoryData.metaTitle);
        formData.append('metaDescription', categoryData.metaDescription);
        formData.append('metaKeywords', categoryData.metaKeywords);
    
        if (categoryData.image && categoryData.image instanceof File) {
            formData.append('image', categoryData.image);
        }
    
        axios.post(`/api/update-category/${categoryData.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log('Update response:', res.data); // Log response data
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
    
                setCategories(prevCategories => {
                    return prevCategories.map(category =>
                        category.id === categoryData.id ? res.data.category : category
                    );
                });
    
                handleClose();
            } else if (res.data.status === 400) {
                setCategoryData({ ...categoryData, error_list: res.data.errors });
            }
        })
        .catch(error => {
            console.error('Error updating category:', error);
            if (error.response && error.response.status === 422) {
                setCategoryData({ ...categoryData, error_list: error.response.data.errors });
            }
            swal("Error", "Failed to update category. Please try again later.", "error");
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleEditCategory = (index) => {
        if (index < 0 || index >= categories.length) {
            console.error('Invalid category index:', index);
            return;
        }

        const categoryId = categories[index]._id || categories[index].id;
        if (!categoryId) {
            console.error('Missing ID field in category:', categories[index]);
            return;
        }

        setCategoryData({
            id: categoryId,
            name: categories[index].name,
            description: categories[index].description,
            image: categories[index].image ? `http://127.0.0.1:8000${categories[index].image}` : null,
            metaTitle: categories[index].metaTitle,
            metaDescription: categories[index].metaDescription,
            metaKeywords: categories[index].metaKeywords,
            error_list: {}
        });

        setEditMode(true);
        setEditIndex(index);
        setOpen(true);
    };

    const handleDeleteCategory = (index) => {
        const categoryId = categories[index]._id || categories[index].id;
        axios.delete(`/api/delete-category/${categoryId}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                fetchCategories();
            }
        }).catch(error => {
            console.error('Error deleting category:', error);
        });
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setEditIndex(-1);
        setCategoryData({
            id: '',
            name: '',
            description: '',
            image: null,
            metaTitle: '',
            metaDescription: '',
            metaKeywords: '',
            error_list: {}
        });
    };

    return (
        <div className='category-content'>
            <Box sx={{ width: '100%', mt: 4, p: 2 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', fontFamily: 'sans-serif', mb: 2 }}>
                    Categories
                </Typography>
                <div style={{ display: 'flex', gap: '25px' }}>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Add Category
                    </Button>
                </div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{editMode ? "Edit Category" : "Add New Category"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill in the details for the {editMode ? "category" : "new category"}.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Category Name"
                            fullWidth
                            name="name"
                            value={categoryData.name}
                            onChange={handleInput}
                            error={!!categoryData.error_list.name}
                            helperText={categoryData.error_list.name && categoryData.error_list.name[0]}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            name="description"
                            value={categoryData.description || ''}
                            onChange={handleInput}
                            error={!!categoryData.error_list.description}
                            helperText={categoryData.error_list.description && categoryData.error_list.description[0]}
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span">
                                Upload Image
                            </Button>
                        </label>
                        {categoryData.image && (
                            typeof categoryData.image === 'object' ? (
                                <img
                                    src={URL.createObjectURL(categoryData.image)}
                                    alt="Category"
                                    style={{ width: '100%', height: '200px', marginTop: '10px', borderRadius: '8px', objectFit: 'cover' }}
                                />
                            ) : (
                                <img
                                    src={categoryData.image}
                                    alt="Category"
                                    style={{ width: '100%', height: '200px', marginTop: '10px', borderRadius: '8px', objectFit: 'cover' }}
                                />
                            )
                        )}
                        <TextField
                            margin="dense"
                            label="Meta Title"
                            fullWidth
                            name="metaTitle"
                            value={categoryData.metaTitle}
                            onChange={handleInput}
                            error={!!categoryData.error_list.metaTitle}
                            helperText={categoryData.error_list.metaTitle && categoryData.error_list.metaTitle[0]}
                        />
                        <TextField
                            margin="dense"
                            label="Meta Description"
                            fullWidth
                            name="metaDescription"
                            value={categoryData.metaDescription || ''}
                            onChange={handleInput}
                            error={!!categoryData.error_list.metaDescription}
                            helperText={categoryData.error_list.metaDescription && categoryData.error_list.metaDescription[0]}
                        />
                        <TextField
                            margin="dense"
                            label="Meta Keywords"
                            fullWidth
                            name="metaKeywords"
                            value={categoryData.metaKeywords || ''}
                            onChange={handleInput}
                            error={!!categoryData.error_list.metaKeywords}
                            helperText={categoryData.error_list.metaKeywords && categoryData.error_list.metaKeywords[0]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={editMode ? handleUpdateCategory : submitCategory} color="primary">
                            {editMode ? "Update" : "Add"}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%',width:'80%', backgroundColor: '#f5f5f5' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`http://127.0.0.1:8000${category.image}`}
                                        alt={category.name}
                                        sx={{ width: '60%', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                    <CardContent sx={{ flex: '1 1 auto', width: '100%' }}>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'cursive' }}
                                        >
                                            {category.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            paragraph
                                            sx={{ fontWeight: 'bold', fontSize: '1rem', lineHeight: 1.5, fontFamily: 'cursive' }}
                                        >
                                            <strong>Description:</strong> {category.description}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ fontWeight: 'bold', fontSize: '1rem', fontFamily: 'cursive' }}
                                        >
                                            <strong>Meta Title:</strong> {category.metaTitle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ fontWeight: 'bold', fontSize: '1rem', fontFamily: 'cursive' }}
                                        >
                                            <strong>Meta Description:</strong> {category.metaDescription}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ fontWeight: 'bold', fontSize: '1rem', fontFamily: 'cursive' }}
                                        >
                                            <strong>Meta Keywords:</strong> {category.metaKeywords}
                                        </Typography>
                                        <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() => handleEditCategory(index)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDeleteCategory(index)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            No categories available.
                        </Typography>
                    )}
                </Grid>
            </Box>
        </div>
    );
};

export default Category;
