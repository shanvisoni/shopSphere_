import express, { Router } from 'express'
import formidable from 'express-formidable';

import {isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { deleteProductController,  getProductController, getSingleProductController, productCategoryController, productController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';

const router=express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), productController);

router.get('/get-product',getProductController);
router.get('/single-product/:slug',getSingleProductController);
router.get('/product-photo/:pid',productPhotoController);
router.delete('/delete-product/:pid',deleteProductController);
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(),updateProductController);

//filter product
router.post('/product-filters',productFiltersController);

//product count
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController);

//search product
router.get('/search/:keyword',searchProductController);

//similar product
router.get('/related-product/:pid/:cid',relatedProductController);


//category wise product 
router.get('/product-category/:slug',productCategoryController)


export default router;