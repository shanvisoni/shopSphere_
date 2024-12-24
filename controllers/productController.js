import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from 'slugify';
import categoryModel from "../models/categoryModel.js";

export const productController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo should be less than 1MB" });
           
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully',
            products
        });
    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error
        });
    }
};


export const getProductController=async(req,res)=>{
try {
    const products=await productModel
    .find({})
    .select("-photo")
    .populate('category')
    .limit(12)
    .sort({createdAt:-1}); 
    res.status(200).send({
        success:true,
        message:"AllProducts",
        products,
        total:products.length,
    });
} catch (error) {
   
    res.status(500).send({
        success: false,
        message: 'Error in creating product',
        error
    });
}
}
export const getSingleProductController=async(req,res)=>{
    try {
    const product=await productModel.findOne({slug:req.params.slug})  
    .select("-photo")
    .populate("category");
    res.status(200).send({
        success:true,
        message:"Single product fetched",
        product,
    
    });
    } catch (error) {
         res.status(500).send({
            success: false,
            message: 'Error ',
            error
        });
      
    }
    
}



export const productPhotoController=async(req,res)=>{
    try {
    const product=await productModel.findById(req.params.pid).select("photo")
   if(product.photo.data){
    res.set('Content-type',product.photo.contentType);
    return res.status(200).send(
       product.photo.data)}

    } catch (error) {
         res.status(500).send({
            success: false,
            message: 'Error ',
            error
        });
      
    }
    
}

export const deleteProductController=async(req,res)=>{
    try {
await productModel.findByIdAndDelete(req.params.pid).select("-photo")
res.status(200).send({
    success:true,
    message:" product deleted succeffuly",
  

});
    } catch (error) {
         res.status(500).send({
            success: false,
            message: 'Error ',
            error
        });
       
    }
    
}
export const updateProductController=async(req,res)=>{
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo should be less than 1MB" });
           
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,{ ...req.fields, slug: slugify(name) },{new:true})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product updated Successfully',
            products
        });
    } catch (error) {
         res.status(500).send({
            success: false,
            message: 'Error ',
            error
        });
       
    }
    
}


export const productFiltersController=async(req,res)=>{
    try {
        const {checked,radio}=req.body
        let args={}
        if(checked.length>0) args.category =checked
        if(radio.length) args.price={$gte: radio[0], $lte:radio[1]}
        const products=await productModel.find(args)
        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
        
        res.status(400).send({
            success:false,
            message:'Error While Filtering Products'
        })
    }
}



export const productCountController=async(req,res)=>{
    try {
        const total =await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total,
        })
    } catch (error) {
     
        res.status(400).send({
            success:false,
            message:'Error in Product count',
            error,
        })
    }
}


export const productListController=async(req,res)=>{
    try {
        const perPage =6
        const page=req.params.page? req.params.page:1
        const products=await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createAt:-1})

        res.status(200).send({
            success:true,
            products,
        })
        
    } catch (error) {
     
        res.status(400).send({
            success:false,
            message:'Error in page cart',
            error,
        })
    }
}


export const searchProductController=async(req,res)=>{
    try {
        const {keyword} =req.params
        const results=await productModel.find({
            $or:[
                {name:{$regex:keyword, $options:"i"}},
                {description:{$regex: keyword, $options:"i"}}
            ]
        }).select("-photo")
        res.json(results)
        
    } catch (error) {
   
        res.status(400).send({
            success:false,
            message:'Error in Search Product API',
            error,
        })
    }
}


// export const relatedProductController=async(req,res)=>{
//     try {
//        const{pid,cid}=req.params;
//        console.log('pid',pid);
//        console.log('cid',cid);
//        const products =await productModel.find({
//         category:cid,
//         _id:{$ne:pid}
//        }).select("-photo").limit(3).populate("category")
//        res.status(200).send({
//         success:true,
//         products,
//        });
//        console.log("Related Products:", products);

//     } catch (error) {
//         console.log(error)
//         res.status(400).send({
//             success:false,
//             message:'Error while getting related product',
//             error,
//         })
//     }
// }








export const relatedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      console.log("PID:", pid);
      console.log("CID:", cid);
  
      if (!pid || !cid) {
        return res.status(400).send({
          success: false,
          message: "Product ID or Category ID is missing",
        });
      }
  
      const products = await productModel
        .find({
          category: cid,
          _id: { $ne: pid },
        })
        .select("-photo")
        .limit(3)
        .populate("category");
  
    //   console.log("Related Products Query Result:", products);
  
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
    //   console.error("Error in relatedProductController:", error);
      res.status(400).send({
        success: false,
        message: "Error while getting related products",
        error,
      });
    }
  };


  //get product by category
export const productCategoryController = async (req, res) => {
    try {
     const category =await categoryModel.findOne({slug:req.params.slug})
     const products=await productModel.find({category}).populate('category')
     res.status(200).send({
        success:true,
        category,
        products,
     });
    } catch (error) {
    //   console.error("Error in relatedProductController:", error);
      res.status(400).send({
        success: false,
        message: "Error while getting products",
        error,
      });
    }
  };
  


  